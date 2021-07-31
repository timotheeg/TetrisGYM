const {
    writeRLE,
    drawTiles,
    flatLookup,
    drawRect,
    drawAttrs,
} = require('./nametables');

const rocket = Array.from({ length: 1024 }, () => 0xFF);
const legal =  [...rocket];

const lookup = flatLookup(`
0123456789ABCDEF
GHIJKLMNOPQRSTUV
WXYZ-.˙>!^()####
########qweadzxc
################
################
################
################
################
################
################
################
################
################
################
###############
`);

drawTiles(rocket, lookup, `
################################
################################
################################
#############LINES-000##########
################################
################################
############          ##########
############  ROCKET  ##SCORE ##
############  SCREEN  ##000720##
############          ##########
############          ##########
############          ##########
############          ##########
############          ##########
############          ##########
############          ##########
############          ##########
############          ##########
############          ##########
############          ##########
############          ##LEVEL###
############          ##18-18###
############          ##########
############          ##########
############          ##########
############          ##########
################################
################################
################################
################################
`);

drawRect(rocket, 2, 17, 6, 10, 0x50);

drawTiles(legal, lookup, `
################################
################################
################################
################################
################################
################################
################################
################################
################################
################################
################################
#########LEGAL  SCREEN##########
################################
################################
################################
################################
################################
################################
################################
################################
################################
################################
################################
######SOMETHING TO DO WITH######
########ALEXEY PAZHITNOV########
################################
################################
################################
################################
################################
`);

drawAttrs(rocket, [`
    1111111111111111
    1111111111111111
    1111111111111111
    1111111111111111
    1111111111111111
    1111111111111111
    1111111111111111
    1111111111111111
`,`
    1111111111111111
    1111111111111111
    1111111111111111
    1111111111111111
    1111111111111111
    1111111111111111
    1111111111111111
    1111111111111111
`]);

drawAttrs(legal, [`
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
`,`
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    1111111111111111
    1111111111111111
    1111111111111111
    1111111111111111
`]);

writeRLE(
    __dirname + '/rocket_nametable.bin',
    rocket,
);

writeRLE(
    __dirname + '/legal_nametable.bin',
    legal,
);
