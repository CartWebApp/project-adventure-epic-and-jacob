export let player = {
    talons: 300,
    maxHP: 100,
    HP: 100,
    energy: 50,
    maxEnergy: 50,
    luck: 3,
    attack: 5,
    defense: 5,
    healCost: 20,
    defending: false,
    shardCount: 0,
}

export function updateAttack(a) {
    player.attack = a;
}

export function updateDefense(a) {
    player.defense = a;
}

export function updateHP(a) {
    player.HP = a;
}

export function updatemaxHP(a) {
    player.maxHP = a;
}

export function updateEnergy(a) {
    player.attack = a;
}