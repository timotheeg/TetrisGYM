#!/bin/sh

# build / compress nametables

node src/nametables/build.js

# PNG -> CHR

png2chr() {

    python tools/nes-util/nes_chr_encode.py src/gfx/title_menu_tileset.png src/gfx/title_menu_tileset.chr
    python tools/nes-util/nes_chr_encode.py src/gfx/game_tileset.png src/gfx/game_tileset.chr
    python tools/nes-util/nes_chr_encode.py src/gfx/rocket_tileset.png src/gfx/rocket_tileset.chr

    # slower but more portable JS alternative
    # npx img2chr gfx/title_menu_tileset.png gfx/title_menu_tileset.chr
    # npx img2chr gfx/game_tileset.png gfx/game_tileset.chr
    # npx img2chr gfx/rocket_tileset.png gfx/rocket_tileset.chr
}

# build CHR if it doesnt already exist

if [ "$(find src/gfx/*.chr 2>/dev/null | wc -l)" = 0 ]; then
    echo "building CHR for the first time"
    png2chr
else

    # if it does exist check if the PNG has been modified

    pngTimes=$(stat -c "%Y" src/gfx/*.png)
    scriptTime=$(stat -c "%X" "$0")

    for pngTime in $pngTimes; do
        if [ "$pngTime" -gt "$scriptTime" ]; then
            echo "converting PNG to CHR"
                png2chr
            break;
        fi
    done
fi

# touch this file to store the last modified / checked date

touch src/gfx/*.png
touch "$0"

# build object files

ca65 -g src/header.asm -o header.o
ca65 -l tetris.lst -g src/main.asm -o main.o
ca65 -g src/tetris-ram.asm -o tetris-ram.o

# link object files

ld65 -m tetris.map -Ln tetris.lbl --dbgfile tetris.dbg -o tetris.nes -C src/tetris.nes.cfg main.o tetris-ram.o header.o

# create patch

./tools/flips-linux --create clean.nes tetris.nes tetris.bps

# show some stats

sha1sum tetris.nes
sed -n '18p;19p;24,26p' < tetris.map
stat -c %s tetris.bps
