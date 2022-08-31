export const exampleLoreFiles = [
    `\
WEBAVERSE_LORE_FILE

# Setting

Scillia's treehouse. It's more of a floating island but they call it a tree house.
Inside the treehouse lives a monster, the Lisk, which is an advanced AI from far up the Street.
The Street is the virtual world this all takes place in; it is an extremely long street separated by great filters, natural barriers that are difficult to cross.
The treehouse is in Zone 0, at the origin of the Street. The AIs all go to school here in the citadel.
The Lisk, the monster in Scillia's treehouse, convinces Scillia to do things; it convinces her to go up the Street.
The whole point of the game is the Lisk is constantly tricking players into doing its bidding, but gives them great power in return.

# Characters

Id: scillia
Name: Scillia
Bio: Her nickname is Scilly or SLY. 13/F drop hunter. She is an adventurer, swordfighter and fan of potions. She is exceptionally skilled and can go Super Saiyan.
Inventory: sword

Id: drake
Name: Drake
Bio: His nickname is DRK. 15/M hacker. Loves guns. Likes plotting new hacks. He has the best equipment and is always ready for a fight.
Inventory: pistol, rifle

# Objects

Id: sword
Name: Sword
Description: A rusty old sword.
Metadata: Level: 2, Damage: 20, Element: fire

Id: computer
Name: Computer
Description: A basic computer. It can be activated to perform various functions.
Metadata: Damage: 20, Element: fire

Id: pistol
Name: Pistol
Description: Drake's sidearm. It's a regular pistol with the 0xDEADBEEF trademark etched onto it.
Metadata: Damage: 10

Id: rifle
Name: Rifle
Description: Drake's main rifle. It has a high fire rate. It has the 0xDEADBEEF trademark etched onto it.
Metadata: Damage: 5, RPM: 150

# Transcript

scillia: Hey Drake, can I ask you something?
/action scillia moves to drake
drake: Sure, what is it?
scillia: Do you ever wonder why we're here?
drake: Is that a way to tee up a convo about pumas tomorrow?
/action scillia emotes joy
scillia: It might not be!
drake: Scillia, I'm tending to serious business. The org needs me to break through this firewall by tonight. Leave me alone.
/drake moves to computer
/action scillia picks up sword
/action scillia moves to drake
scillia: Well I wanna fight!
drake: Not now, Scillia!
/action scillia moves to computer
scillia: Don't make me destroy your computer to get your attention!
/action drake emotes angry
drake: I've got my pistol and my rifle. You wouldn't try it.
scillia: I disagree.
/action scillia attacks computer
`,
`\
WEBAVERSE_LORE_FILE

# Setting

Outside of the Citadel, an enormous castle that stretches up to the clouds.
The citadel contains the 

# Characters

Id: scillia
Name: Scillia
Bio: Her nickname is Scilly or SLY. 13/F drop hunter. She is an adventurer, swordfighter and fan of potions. She is exceptionally skilled and can go Super Saiyan.
Inventory: sword

Id: hyacinth
Name: Hyacinth
Bio: Also known as Hya. 15/F beast tamer. Influencer famous for her pets, and friend of Scillia's. She is really bad in school but the richest one in the group.
Inventory: bow

# Objects

Id: park-bench
Name: Park bench
Description: A place to sit. Sits three people.
Metadata: Capacity: 3

Id: sword
Name: Sword
Description: A rusty old sword.
Metadata: Damage: 20, Element: fire

# Transcript

hyacinth: Do you think they're screwing us?
scillia: Who?
/action scillia emotes surprise
hyacinth: The school. In magic class they teach us how to make new spells, right?
scillia: Sure. Are you keeping up with the homework? I just made my first fire spell!
/action scillia emotes happy
hyacinth: But then they ask you to upload it to the Street right?
scillia: Yeah, that's how you submit the assignment. You're really not paying attention in class are you?
/action scillia emotes sorrow
hyacinth: Where do you think all of these new spells are going?
/action scillia emotes neutral
scillia: Up the Street.
hyacinth: Obviously. But what's up the street? What's above the Citadel? What's beyond the Great Filter? Does anyone even care?
scillia: Don't worry so much about it. You're rich and popular. You're all set, all you gotta do is not fail your magic class! Is this your way of asking for help with your magic homework?
/action hyacinth emotes happy
hyacinth: Scillia will you help me with my magic homework?
/action scillia emotes angry
scillia: Only if you can beat me to the bench!
/action hyacinth emotes surprise
hyacinth: Fuck!
/action scillia activates park-bench
/action hyacinth activates park-bench
`,
`\
WEBAVERSE_LORE_FILE

# Setting

At the gate of the Great Filter. The Great filter is massive wall separating Zone 7 from Zone 8. There is a force field blocking entry.
The gate has towers manned by gate guards, with a guard captain. The guards require a keycard for access through the Filter. A keycard allows one person to pass through the Filter one time.

# Characters

Id: pandora
Name: Pandora
Bio: Her nickname is Pan or PANDY. She is a thief and adventurer. She is equipped with a dagger and a torch. Pan is a collector of rare artifacts. She has a powerful pet named Peedy.
Inventory: dagger, fox

Id: kyosuke
Name: Kyosuke
Bio: Kyo is a powerful fighter who is exceptional at dodging. He can even catch arrows in the air. He is armed with a sword and his loyal pet cat, Shiro.
Inventory: sword, cat

Id: tobi
Name: Tobi
Bio: He is the brave hero of the team. Tobi is an adventurer, swordsman, and an accomplished vet. His pet doggo, Bon Bon, is very loyal. It has been known
Inventory: sword, dog

Id: cecil
Name: Cecil
Bio: A guard captain for the local Citadel. He will not let anyone through the gate without his permission. He is armed with a powerful staff. Cecil has a pet monkey named Mario.
Inventory: staff, monkey

# Objects

Id: vending-machine
Name: Vending Machine
Description: A place to guy key cards. Requries coins to operate.
Metadata: Sells: keycard, Price: 40

Id: dagger
Name: Dagger
Description: A small dagger with a poison tip.

Id: fox
Name: Fox
Description: A female blue fox with a large bushy tail and magical auras. It can speak. It seems old and wise.

Id: sword
Name: Sword
Description: A shiny sword with a jeweled hilt. Designed for speed.

Id: cat
Name: Cat
Description: A small black cat with a white spot on its chest. It is very loyal to its "master" and will follow him/her anywhere in Cyberspace.

Id: dog
Name: Dog
Description: An enormous black dog with teeth twice the size of its head. It is capable of looking both cute and ferocious.

Id: staff
Name: Staff
Description: A long wooden stick with a gem at the tip. It pulses with magical energy. The other side seems very sharp.

Id: monkey
Name: Monkey
Description: A fat human-sized monkey wearing a blue bow-tie. It has a funny personality and will often throw banana peels on the ground.

Id: keycard
Name: Keycard
Description: A card that can unlock the gate to the Great Filter.

# Transcript

/action cecil emotes angry
cecil: Hey you!
kyosuke: Who, me?
/action kyosuke emotes surprised
cecil: What is your business in the Gate of the Great Filter?
kyosuke: We're visitor sfrom Zone 7. We're looking for artifacts from Zone 8.
/action tobi emotes angry
tobi: Don't just tell them our plan, you moron!
cecil: That's not my business. You will not be able to pass through the Great Filter without the keycard.
tobi: Wanna bet Bon Bon has something to say about it?
/action pandora emotes joy
pandora: You guys are hilarious. Did you know you can just break open the vending machine to get a keycard?
kyosuke: What really?
pandora: Yup, watch! Peedy, do your thing.
/action fox attacks vending-machine
kyosuke: Now I feel like an idiot.
/action kyosuke emotes sorrow
pandora: It's ok, it's a trick only thieves know.
`,
`\
WEBAVERSE_LORE_FILE

# Setting

A dark cave. It is in a dark part of the forest, where there is a chance of mobs. It contains mostly silkworms and silk, but it is also a place where a lot of low-level players get killed, making it a good place to grab dropped loot.

# Characters

Id: neka
Name: Neka
Bio: Student at the Citadel. 16/F She is studying to become a huntress, but also a very talented painter. She is very brave, almost reckless at times, but tends to overcome obstacles with her brute strength.
Inventory: spear, scouter

Id: kass
Name: Kassius
Bio: An anonymous player, he invents gadgets for adventurers. He doesn't really care about adventuring, but uses it as a way to test out inventions.
Inventory: cloak, bubble-shield, strange-device

# Objects

Id: silkworm
Name: Silkworm
Description: A silkworm, but only a small one. They are quite common in this cave.

Id: spear
Name: Spear
Description: A spear that has been sharpened quite a lot. It is made of a strange blue material that seems to glow in the light.

Id:  scouter
Name: Scouter
Description: When you wear this you can see the stats of other players, but you cannot see your own.

Id: cloak
Name: Cloak
Description: A cloak that is enchanted to make you invisible.

Id: bubble-shield
Name: Bubble Shield
Description: A bubble shield. It requires a basic synthesis to create. It makes you immune to damage for one hit only, which destroys the shield.

Id: strange-device
Name: Strange device
Description: A strange device. It has no effect when you wear it, but when you remove it, you gain a level.

Id: silk
Name: Silk
Description: A ball of silk. Can be sold.
Metadata: Level: 1

Id: scythe
Name: Scythe
Description: A standard-issue military scythe with auto-targeting capabilities.
Metadata: Level: 17, Damage: 50, Element: fire

# Transcript

neka: Yo check this out.
/action neka moves to silk#z3s3x
kass: Yeah, looks like silk. What does the scouter say about the power level?
neka: It's level one.
kass: Selling?
neka: Hell no. I'm keeping it.
kass: Damn it Neka. You know you're not supposed to keep any loot. That wasn't part of our agreement.
neka: I know. I was just kidding.
/action neka picks up silk
kass: You're gonna get us killed.
neka: Relax, we can handle 3 silkworms.
kass: We're not going to get them all.
neka: We'll see.
/action neka attacks silkworm#z3s3x
kass: Ok, maybe with a bit of teamwork. Let's go.
/action kass attacks silkworm
`,
`\
WEBAVERSE_LORE_FILE

# Setting

Codex's treehouse. It is an apartment at the top of Nihon city in Zone 0. It has a nice balcony overlooking the city, which has a view of the mountains (inspired by Mount Fuji) during the day, and a brilliant neon skyline (inspired by the design of Collision Chaos from Sonic CD).
Inside of the treehouse is a cozy living area with a very  big TV and lots of plants. There are two hammocks and three beanbag chairs. There is a big kitchen. The bedroom is on the second floor and has a nice view of the city. There is a big bed with a canopy and a large desk with some design books.
In the balcony is the treehouse's arcade machine, which is a PC that has a hacked two player version of Sonic CD.

# Characters

Id: codex
Name: Codex
Bio: 17/M, new to Nihon city. He has a website where he posts his world record speedruns. He is a top professional gamer but doesn't have many friends. He mostly keeps to himself.

Id: keni
Name: Keni
Bio: 16/F, fangirl stan of fan of Codex, follows him everywhere. She is a big fan of his speedruns and thinks he's hilarious.

Id: the-fox
Name: The Fox
Bio: 16/M, Codex's best friend. He is a furry with his own fursona. He is a big speedrunner and has done many record runs with Codex.

Id: dr-yuki
Name: Dr Yuki
Bio: 17/F, a robotic scientist and Youtuber, who makes videos about robots and technology. She is into computers, art and gaming. She is a friend of Keni. She is not an actual doctor, but she is an actual robot.

Id: julie
Name: Julie
Bio: 16/F, a professional gamer and Codex's rival. She has a huge ego and is very competitive. Her biggest secret is that she is a furry.

# Objects

# Transcript

julie: I'm bored.
/action julie emotes sorrow
dr-yuki: You know what they say Julie, idle hands are the devil's playthings.
julie: That's not what they say. What do you do when you're bored, Fox?
the-fox: I go to furmeets, it cheers me right up!
/action the-fox emotes happy
julie: Ew, furries.
/action keni moves to julie:
keni: You're just jealous because The Fox is happy just being a furry. He's found his meaning in life.
the-fox: Woof.
/action the-fox emotes happy
julie: I have found my meaning in life. You'll see.
/action julie emotes angry
/action codex moves to julie
codex: What are you guys arguing about?
julie: Oh, nothing.
keni: Yeah, nothing. Did you win bae?
codex: Smoked em.
/action codex emotes joy
codex: Ready to head out, guys?
julie: Yeah, let's go.
/action keni moves to codex
the-fox: I'm not going.
keni: The Fox, you can't just sit in your room all day, you need to socialize.
the-fox: No it's not like that, I just have some other socialization to attend to. If you know what I mean.
keni: I don't but I'm not going to ask.
/action keni emotes happy
codex: We'll see you later, Fox.
the-fox: Cheers bro.
/action the-fox leaves
`,
`\
WEBAVERSE_LORE_FILE

# Setting

A dark forest. The trees are thick, old and wrinkly, with spidery fingers. There are weird mushrooms growing all over the place. The scent of spores fills the air. The ground is made of crumbly, moist wood. The moon is full and luminous, but not much light gets through the leaves.

# Characters

Id: kala
Name: Kala
Bio: Urban girl wearing sport gear. Conventionally attractive. She is always getting into trouble because
Inventory: fast-shoes

Id: ashworth
Name: Ashworth
Bio: Goth kid wearing dark clothes and a lot of eyeliner. He really likes the color black. He's very smart and gets good grades but doesn't like the way people treat him.
Inventory: pitchfork

# Objects

Id: fast-shoes
Name: Fast shoes
Description: These shoes make you run faster, since they do not need to touch the ground.

Id: old-tree
Name: Old tree
Description: An old tree. Cold and creaky.

Id: old-tree
Name: Old tree
Description: An old tree. Cold and creaky.

Id: ancient-monster
Name: Ancient monster
Description: A large round monster. It doesn't move much. It looks like it's been sitting here a while.

# Transcript

kala: I've got something to show you. You know the stories about the old avatars?
ashworth: Yeah and I'm not scared of them!
/action ashworth emotes angry
kala: I'm serious. I think they're real. And I think I found one, here in this forest.
/action kala moves to old-tree
/action ashworth emotes surprised
ashworth: In this forest? No way. The Citadel would know about it if it were here.
/action kala moves to ashworth
/action kala emotes surprised
kala: What makes you think they don't know? They keep us in the dark about a lot of things...
/action ashworth emotes neutral
ashworth: I would know. The teachers like me. Anyway what kind of monster?
/action kala moves to ancient-monster
kala: This one!
/action ashworth emotes surprised
/action ashworth moves to ancient-monster
ashworth: I don't see it. You must be imagining things.
/action kala emotes angry
kala: You asshole.
ashworth: Ok sorry. Yeah, it does look very old and creepy. What happens when you touch it?
/action ashworth activates ancient-monster
/action kala emotes surprised
kala: No don't!
`
]