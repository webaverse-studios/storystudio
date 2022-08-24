export const contextTypes = ['objectComment', 'npcComment', 'mobComment', 'loadingComment', 'banter', 'loreExposition', 'rpgDialogue', 'reactions', 'cutscenes', 'quests']

export const entityPrototypes = [
    {
        type: 'scene',
        name: 'My Scene',
        shortname: 'scene#234',
        enabled: true,
        description: 'This is a description of my scene',
    },
    {
        type: 'character',
        name: 'My Character',
        shortname: 'character#234',
        enabled: true,
        description: 'This is a description of my character',
        inventory: []
    },
    {
        type: 'object',
        name: 'My Object',
        shortname: 'object#234',
        enabled: true,
        description: 'This is a description of my object',
    },
    {
        type: 'npc',
        name: 'My NPC',
        shortname: 'npc#234',
        enabled: true,
        description: 'This is a description of my NPC',
        inventory: []
    },
    {
        type: 'mob',
        name: 'My Mob',
        shortname: 'mob#234',
        enabled: true,
        description: 'This is a description of my mob',
        inventory: []
    }
]

export const defaultEntities = {
    scene: [{
        type: 'scene',
        name: 'My Scene',
        shortname: 'scene#234',
        enabled: true,
        description: 'This is a description of my scene',
        inventory: []
    }],
    object: [{
        type: 'object',
        name: 'My Object',
        shortname: 'object#234',
        enabled: true,
        description: 'This is a description of my object',
    },
    {
        type: 'object',
        name: 'My Object',
        shortname: 'object#234',
        enabled: true,
        description: 'This is a description of my object',
    },
    {
        type: 'object',
        name: 'My Object',
        shortname: 'object#234',
        enabled: true,
        description: 'This is a description of my object',
    }],
    character: [{
        type: 'character',
        name: 'My Character',
        shortname: 'character#234',
        enabled: true,
        description: 'This is a description of my character',
        inventory: []
    }],
    mob: [{
        type: 'mob',
        name: 'My Mob',
        shortname: 'mob#234',
        enabled: true,
        description: 'This is a description of my mob',
        inventory: []
    },
    {
        type: 'mob',
        name: 'My Mob',
        shortname: 'mob#234',
        enabled: true,
        description: 'This is a description of my mob',
        inventory: []
    },
    {
        type: 'mob',
        name: 'My Mob',
        shortname: 'mob#234',
        enabled: true,
        description: 'This is a description of my mob',
        inventory: []
    }],
    npc: [{
        type: 'npc',
        name: 'My NPC',
        shortname: 'npc#234',
        enabled: true,
        description: 'This is a description of my NPC',
        inventory: []
    },
    {
        type: 'npc',
        name: 'My NPC',
        shortname: 'npc#234',
        enabled: true,
        description: 'This is a description of my NPC',
        inventory: []
    },
    {
        type: 'npc',
        name: 'My NPC',
        shortname: 'npc#234',
        enabled: true,
        description: 'This is a description of my NPC',
        inventory: []
    },
    {
        type: 'npc',
        name: 'My NPC',
        shortname: 'npc#234',
        enabled: true,
        description: 'This is a description of my NPC',
        inventory: []
    }]
  };