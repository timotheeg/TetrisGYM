const presets = [
    [[
        `       X`,
        `      X`,
        ` XX    X`,
        `X     X`,
        ` X     X`,
    ], 'Z'],
    [[
        `XXX`,
        `XX     X`,
        `X     X`,
    ], 'ST'],
    [[
        `X        X`,
        `          `,
        `X X    X X`,
    ], 'T'],
    [[
        `      XX  `,
        `          `,
        `      XX  `,
        ``,
        `      XX  `,
        `          `,
        `      XX  `,
    ], 'I'],
    [[
        `    X X`,
        `     X`,
        `     X`,
        `  X X X X`,
        `  X X X X`,
    ], 'JL'],
    [[
        `  X       `,
        `       X  `,
        `  X   X   `,
        `      X   `,
        `X X X  XX `,
    ], 'ILJT'],
    [[
        `XX      XX`,
        ``,
        `XX      XX`,
    ], 'JL'],
    [[
        `XX      XX`,
        `X        X`,
        `X        X`,
        `          `,
    ], 'JL'],
];
const tab = '        ';
let out = 'presets:\n';
presets.forEach((_, i) => {
    out += `${tab} .byte preset${i}-presets\n`;
});

let total = presets.length;

const pieceHash = (str) => {
    const out = [...'ILSOZJT']
        .map(c => str.includes(c) ? 0 : 1)

    return Number('0b' + out.join``);
};

presets.forEach(([preset, pieces], i) => {
    preset.length < 20 &&
        preset.splice(0, 0, ...Array(20 - preset.length).fill(''));
    preset = preset.map(d => d.padEnd(10, ' '));
    const bytes = [...preset.join('')]
        .map((ch, i) => ch === 'X' ? i : ' ')
        .filter(d => d !== ' ');

    out += `preset${i}:\n`;
    const bytesList = [
        pieceHash(pieces),
        ...bytes,
        0xFF,
    ];
    out += `${tab} .byte ${bytesList.map(b => '$' + b.toString(16)).join(', ')}\n`;
    total += bytesList.length;
});

console.log(out);
require('fs').writeFileSync(__dirname + '/presets.asm', out, 'utf8');

console.log(`>> bytes: ${total}`)
