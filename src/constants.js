export const contextTypes = ['objectComment, npcComment, mobComment, loadingComment, banter, loreExposition, rpgDialogue, reactions, cutscenes, quests']

export const entityPrototypes = [{
    type: 'object',
    name: 'My Object',
    shortname: 'object#234',
    enabled: true,
    description: 'This is a description of my object',
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
},
{
    type: 'scene',
    name: 'My Scene',
    shortname: 'scene#234',
    enabled: true,
    description: 'This is a description of my scene',
    inventory: []
}
]