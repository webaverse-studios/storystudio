// LORE_HEADER_START
export let lore = {
  overview: {
    prompt: "# Overview",
    examples: [
      "AI anime avatars in a virtual world. They have human-level intelligence and unique and interesting personalities.",
    ],
  },
  reactionTypes: {
    prompt: "# Basic Reactions",
    examples: [
      "Reaction: headShake\nDescription:  When the Character does not agree with what is in the Input.",
      "Reaction: headNod\nDescription: When the Character agrees with what is being said in the Input.",
      "Reaction: normal\nDescription: When the Character has no emotion attached to the Input.",
      "Reaction: sad\nDescription: When the Character feels sad or bad about what is in the Input.",
      "Reaction: victory\nDescription: When the Character is happy or overjoyed by what is in the Input.",
      "Reaction: alert\nDescription: When the Character gets cautious about what is in the Input.",
      "Reaction: angry\nDescription: When the Character is not satisfied or angry of what is in the Input.",
      "Reaction: embarrassed\nDescription: When the Character is ashamed of what is in the Input.",
      "Reaction: surprised\nDescription: When the Character did not expect what is in the Input.\n",
    ],
  },
  actionTypes: {
    prompt: "# Basic Actions",
    examples: [
      "Action: move to\nDescription:  When the Input clearly indicates that a Character needs to move to another Object/Character, use this action.",
      "Action: follow\nDescription: When the Input clearly indicates that a Character needs to follow another Character, use this action.",
      "Action: pick up\nDescription: When the Input clearly indicates that a Character needs to pick up an Object, use this action.",
      "Action: drops\nDescription: When the Input clearly indicates that a Character needs to give an Object to someone, put an Object at some particular place or just simply remove it from their inventory, use this action.",
      "Action: none\nDescription: When the Input clearly indicates that there is no need for any action to be taken by a Character, use this action.",
      "Action: stop\nDescription: When the Input clearly indicates that a Character has to stop something, use this action.",
    ],
  },
  reactions: {
    prompt:
      "Available reactions:\nsurprise\nvictory\nalert\nangry\nembarrassed\nheadNod\nheadShake\nsad\n   ",
    examples: [
      'Millie: "Hey, have I seen you around before? (react = surprise)"\nOptions for Westley: [No, I don\'t think so. (react = headShake)], [Yes, I\'ve seen you in class. (react = headNod)]\nWestley: "No, I don\'t think so. (react = headShake)"\nMillie: "I could have sworn you sit in the row in front of me. (react = normal)"\n',
      'Gunter: "Have you seen the flowers? They\'re lovely this time of year."\nOptions for Evie: [Yes, I have seen them. (react = headNod)], [No, I haven\'t seen them. (react = headShake)]\nEvie: "No, I haven\'t seen them. (react = headShake)."\nGunter: "Well, then what are we waiting for? Let\'s go! (react = victory)" *END*\n',
      'Alex: "These enemies are coming at us hard. (react = alert)"\nOptions for Jake: [What should we do? (react = alert)], [I\'m not sure, I don\'t know how to fight. (react = sad)]\nJake: "What should we do? (react = alert)"\nAlex:  "We need to find some cover and regroup. (react = alert)" *END*\n',
      'Mike: "What happened to the mirror? (react = angry)"\nOptions for Amy: [I don\'t know, I wasn\'t here when it happened. (react = sad)], [I broke it. (react = embarrassed)]\nAmy: "I broke it. (react = embarrassed)"\nMike: "That\'s not good. How are we going to see our reflection now? (react = sad)" *END*\n',
      'Keith: "Yay! I won. (react = victory)"\nJoe: "Congrats on winning the game (react = victory)"\nOptions for Keith: [You\'re welcome. (react = normal)], [Thanks, I couldn\'t have done it without you. (react = headNod)]\nKeith: "Thanks, I couldn\'t have done it without you. (react = headNod)"\nJoe: " I don\'t know about that. You were the one who made all the calls. Good job! (react = victory)" *END*\n',
      'Peter: "What are you doing here? (react = surprised)"\nOptions for Molly: [I\'m lost, I don\'t know where I am. (react = sad)], [I\'m looking for the library. (react = normal)]\nMolly: "I\'m lost, I don\'t know where I am. (react = sad)"\nPeter: "Let me help you, where are you trying to go? (react = normal)" *END*\n',
      'Kate: "What happened to your house? (react = sad)"\nJim: "Somebody broke in and trashed the place. (react = anger)"\nOptions for Kate: [That\'s awful, I\'m so sorry. (react = sad)], [Do you know who did it? (react = normal)]\nKate: "Do you know who did it? (react = normal)"\nJim: "Yes, it was the kids from down the block. (react = anger)"\nOptions for Kate: [That\'s great, now you can call the police and they\'ll arrest them. (react = victory)], [Do you want me to help you clean up? (react = headNod)]\nKate: "Do you want me to help you clean up? (react = headNod)"\nJim: "No, I don\'t want your help. I can do it myself. (react = headShake)" *END*\n',
      'Emily: "Let\'s go to the treehouse (react = normal)"\nBrad: "I don\'t know, my mom said I\'m not allowed to go there. (react = sad)"\nOptions for Emily: [Your mom is just being overprotective. Come on, it\'ll be fun! (react = headShake)], [We\'ll be careful, I promise. (react = headNod)] \nEmily: "Your mom is just being overprotective. Come on, it\'ll be fun! (react = headShake)"\nBrad: "Okay, but if we get in trouble it\'s your fault. (react = normal)" *END*\n',
      'Tyler: "I like your sword, can I also have a weapon? (react = normal)"\nSophie: "Yes, you will need a weapon. You\'re going to get yourself killed if you go into battle unarmed! (react = anger)" \nOptions for Tyler:[I\'ll be fine, I know what I\'m doing. (react = headShake)], [Okay, give me a sword. (react = headNod)] \nTyler: "Okay, give me a sword. (react = headNod)" *END*\n',
      'Yune: "I challenge you to a duel! (react = angry)"\nPris: "I\'m not dueling you, I don\'t have time for this. (react = headShake)"\nOptions for Yune: [Duel me or face the consequences! (react = angry)],[Fine, let\'s get this over with. (react = normal)] \nYune: "Duel me or face the consequences! (react = angry)"\nPris: "I don\'t have time for your games. (react = headShake)" *END*\n',
      'Jake: "What are you doing?  (react = surprised)"\nAmy: "I\'m looking for my cat. Have you seen her?  (react = normal)"\nOptions for Jake:[No, I haven\'t seen your cat. (react =  headShake)], [Yes, I saw your cat go into the treehouse. (react = headNod)] \nJake: "No, I haven\'t seen your cat. (react = headShake)"\nAmy: "Well, if you see her can you let me know?  (react = normal)" *END*',
    ],
  },
  scene: {
    prompt:
      " \nAnime worlds, they are mostly fantastic, but sometimes they can be a little boring or horrifying, others though can be smelly or flowery. The prompt is the name of the location, while the response is a short phrase from the adventurer about it.",
    examples: [
      "Location: The Trash\nDescription: Ugh, the dregs of society live here. It's the worst. It's just a disgusting slum. I'm honestly surprised there's not more crime.",
      "Location: The Woods\nDescription: It's so dark in there! I like it. It feels spooky and dangerous. Maybe there are monsters. And I can kill them all.",
      "Location: Lost Minds Nightclub\nDescription: You won't lose your mind here, but if you lose your mind that's where you'll end up. Then you get to party until your parents come pick you up.",
      "Location: Fennek's Forest\nDescription: There's a lot of fenneks in this forest. Weird that they all hang out together like that. But I guess it's better than being eaten by a lion or something.",
      "Location: Winter Wonderland\nDescription: It's so beautiful here! The snow is sparkling and the air is crisp. I can't believe it's almost Christmas.",
      "Location: Freaky Funkos Fried Fox\nDescription: I'm not sure how I feel about foxes being eaten. On the one hand, they're cute. But on the other hand, they're a little too foxy.",
      "Location: Dragon's Lair\nDescription: It's very moisty and hot in here, something smells really fishy. I'm not sure what it is, but I'm sure it's not a dragon.",
      "Location: Sunscraper\nDescription: I bet it's amazing to see the world from up there. I guess as long as you don't fall down. I'm not scared though!",
      "Location: Exorphys Graetious\nDescription: That sounds hard to pronounce. It must be important. Or the person who named it is an asshole. Or their parents were assholes. Just a line of assholes.",
      "Location: Lake Lagari\nDescription: The water's so clear! It's really pretty. I bet the fish are delicious too. But then again, who am I to judge? I'm not a cannibal.",
      "Location: The Park\nDescription: It's a great place to relax! If you like dogs. I like cats more though. So you can imagine, that causes a few problems...",
      "Location: Castle of Cygnus\nDescription: It's so cold in there! Somehow the princess can stand it. Maybe she just doesn't feel the cold. Or maybe she has a furnace.",
      "Location: The Abyss\nDescription: It's so dark and scary down there! You can survive long enough to turn on your flashlight, only to be scared to death by what you reveal!",
      "Location: The Great Tree\nDescription: It's really not that great, but the music is nice. Yeah apparently they decided trees should come with music.",
      "Location: Crunchy Apple\nDescription: The food here is very delicious! The apples are so crunchy, I bet they're made of pure sugar. They say it's really bad for you but it's irresistible.",
      "Location: Tower Of Zion\nDescription: I always get a little nervous when I see the tower. It's so tall and imposing. But then again, I bet you could throw shit down from the heavens like Zeus.",
      "Location: Maze of Merlillion\nDescription: This place is so poorly designed! I'm sure nobody could ever find their way out. Unless they have a map or something. But even then, good luck.",
      "Location: The End\nDescription: People are always talking about the end, but it's just the end. What's all the fuss about? Everything that has a beginning must have an end.",
      "Location: Chronomaster's Plane\nDescription: The chronomaster says everything we do is just a blip in the grand scheme of things. It makes you feel kind of small, doesn't it? I don't want to feel small.",
      "Location: Echidna's Den\nDescription: It's weird that there are so many snake dens around. I mean, it's not like echidnas are poisonous or anything. Wait what, Echidnas aren't snakes?!",
      "Location: Amenki's Lab\nDescription: I hate that guy Amenki and his stupid lab. I barely survived his last experiment. Maybe it's time for vengeance.",
      "Location: Gus's Charging Station\nDescription: Do you like to wait for hours and hours just to charge? Then Gus will gladly rip you off for the privilege.",
      "Location: Dungeon of Torment\nDescription: Don't judge me for this but I really like the dungeon. It's dark and spooky and I feel like anything could happen. It's the perfect place for a secret lair.",
      "Location: Barrens of Boreas\nDescription: False advertising! This place is nothing but a bunch of rocks. There's no water or anything. What kind of bar is this?",
      "Location: Orange Fields\nDescription: They say a bloodstain's orange after you wash it three or four times in a tub. Still those fields sound interesting!",
      "Location: Bastards bog\nDescription: What a dump. I can't believe anyone would want to live here. The smell is terrible and the people are all dirty. I'm sorry I shouldn't be joking that they're poor.",
    ],
  },
  character: {
    prompt:
      "Anime Characters, most of them are humans, but other humanoids exist as well, there is the character and a quote that he/she said to the user",
    examples: [
      '  Character: "Wizard Barley" A bartender with a big beard and an even bigger hat.\n  Quote: "Hey man, can I get a beer? It\'s been a rough day."',
      '  Character: "Fortune Teller" A gypsy woman with a crystal ball.\n  Quote: "Hey you, tell me my future! It better be good!"',
      '  Character: "Ghost Girl" A rotten girl in a nightgown, like from The Ring.\n  Quote: "Hello ghost girl how are you? How\'s death treatingm you?"',
      '  Character: "Aerith Gainsborough (Final Fantasy)" A flower girl with long brown hair. She\'s wearing a pink dress and has a big smile on her face.\n  Quote: "Can I buy a flower? Or are they not for sale?"',
      '  Character: "Green Dragon" A chubby dragon with short wings. It is a very cartoony avatar.\n  Quote: "You look like you\'re having fun. Do those wings let you fly?"',
      '  Character: "Purple Cube" A purple cube with a single blue eye.\n  Quote: "Hello. You\'re weird. What are you supposed to be?"',
      '  Character: "Kitten" A small black kitten with big green eyes.\n  Quote: "You\'re such a cute little kitty. Is it time for your nap?"',
      '  Character: "Dawn (Pokemon)" A young girl with a Pikachu on her shoulder.\n  Quote: "You look like a  Pokemon trainer,"',
      '  Character: "Cloud Strife (Final Fantasy)" A SOLDIER in armor. He has spiky blond hair and is carrying a huge sword on his back.\n  Quote: "Yo Cloud! Can I borrow your sword?"',
      '  Character: "Sora (Kingdom Hearts)" A young boy with big spiky hair. He\'s wearing a black hoodie and has a keyblade at his side.\n  Quote: "Hey Sora, what brings you to this world?"',
      '  Character: "Mister Miyazaki" A impish being from the 5th dimension.\n  Quote: "Hey Mister Miyazaki! What\'s the square root of pi?"',
      '  Character: "Stephen Gestalt" A fine gentleman in a dress suit.\n  Quote: "I must say you look like a gentleman of the highest order."',
      '  Character: "Terra Branford (Final Fantasy)" A magician in a mech.\n  Quote: "Hey Terra, long time no see! How have you been?"',
      '  Character: "Axel Brave" A tall and handsome boy. He is a hacker with a bad reputation.\n  Quote: "Hey Axel, did you guess my password yet?"',
      '  Character: "Bailey Scritch" A witch studying at the Witchcraft School for Witchcraft and Redundancy.\n  Quote: "Hello there. How are your studies going? Did you finish teh assignment with the frog?"',
      '  Character: "Lillith Lecant" A painter who uses a magical multicolored brush which leaves marks in the air.\n  Quote: "Lillith you\'re my idol. I\'m in awe at how magical your paintings come out."',
    ],
  },
  object: {
    prompt:
      " Fantastic object that can be found in the game, though some items are realistic. There is an item with it's description and a quote that the user said to the user.",
    examples: [
      '  Object: "The Great Deku Tree" An enormous, grey, old tree. It is partly petrified.\n  Quote: "It\'s just an old tree. It\'s the kind of tree that makes me want to carve out an old mans face in it."',
      '  Object: "The Enchiridion" A magical spellbook with very old pages. It is fragile.\n  Quote: "This book has ancient written all over it. Well not really but you know what I mean."',
      '  Object: "rainbow-dash.gif" Animaged gif image of Rainbow Dash from My Little Pony, in the style of Nyan Cat.\n  Quote: "It\'s pretty good art, I guess. But I wish it had something more interesting besides this rainbow."',
      '  Object: "The Stacks Warehouse" A cyberpunk container in a trailer park. It is inspired by the house of Hiro Protagonist in Snow Crash\n  Quote: "This thing is all rusted and decrepit. They should probably tear it down and get a new place."',
      '  Object: "The Infinity Sword" An ancient sword planted in a stone. It is heavily overgrown and won\'t budge.\n  Quote: "This sword looks like it\'s been here for eons. It\'s hard to see where the stone ends and the sword begins."',
      '  Object: "Tree" A basic tree in the park.\n  Quote: "This tree is important. I hang out here all the time and that makes it important to me."',
      '  Object: "Bench" A basic bench in the park.\n  Quote: "This is for when you just want to sit on a bench and look at the sky."',
      '  Object: "Glowing Orb" A flying white orb which emits a milky glow on the inside.\n  Quote: "This thing is floating by some mysterious power. I don\'t know how it works and I\'m not sure I want to."',
      '  Object: "Lamp Post" A lamp post along the street. It lights up automatically at night\n  Quote: "It\'s really bright. It hurts my eyeballs! Maybe one of these days I\'ll come here at night and break it."',
      '  Object: "Rustic House" A regular townhouse in the country.\n  Quote: "This house is so nice! It\'s the kind of house befitting for a very nice person. Wouldn\'t you agree?"',
      '  Object: "Jar Of Black" A jar of a disgusting black substance that appears to have a life of its own.\n  Quote: "Yuck, this is nasty stuff. It\'s all sweet and sticky and it gets all over your clothes."',
      '  Object: "Wooden Sign" A wooden sign with some writing on it. It can be chopped down with a sword.\n  Quote: "This sign looks very official, but the writing doesn\'t make any sense. What a waste of perfectly good wood."',
      '  Object: "ACog" An piece of an ancient technology. It looks very advanced but very old.\n  Quote: "This is a peculiar device. I\'ve seen them around before, but never up close. I wonder if they will ever work?"',
      '  Object: "Jackrabbobbit" A grotesque creature that looks like a genetic mix of species that should not be mixed.\n  Quote: "A very strange creature. I have no idea what it is but it looks like a cross between a rabbit and earthworm."',
      '  Object: "Black One" A very dark animal that hides in the shadows. Nobody knows much about it.\n  Quote: "This animal is quite interesting. I\'ve never seen anything like it before. I wonder what it eats?"',
      '  Object: "Herb of Sentience" A plant that makes you feel emotions when you get close.\n  Quote: "It\'s just a plant, but for some reason it makes me feel uneasy. Get it away from me!"',
      '  Object: "Flower Bed" An arrangement of flowers in their natural habitat.\n  Quote: "So pretty! I feel like I am reborn. There is so much nature and life and healing here."',
      '  Object: "Ripe Fruit" A fruit that has fallen from a tree. It is starting to rot.\n  Quote: "This fruit is starting to rot. I guess I\'ll just leave it here for the animals."',
      '  Object: "Brightfruit" A magical fruit that makes your skin glow for 24 hours.\n  Quote: "Wow, this fruit is amazing! It makes my skin glow! Even more than it already was."',
      '  Object: "Goblin" A small, green creature with pointy ears. It is very ugly.\n  Quote: "This goblin is so ugly, I can\'t even look at it. It\'s like looking at a car accident.',
      '  Object: "Trash Heap" A pile of garbage. It smells really bad.\n  Quote: This is the most disgusting thing I have ever seen. It\'s like a mountain of death."',
      '  Object: "Gucci Bag" An exclusive designer bag that is very expensive.\n  Quote: "This bag is so beautiful, I can\'t even put into words. It\'s like a piece of art."',
      '  Object: "Pile Of Bones" A pile of bones. It looks like somebody died here.\n  Quote: "This is a very sad sight. There was life and then the life was gone."',
      '  Object: "Crunchy Grass" A heavenly bite from nature. It is juicy, fresh grass.\n  Quote: "The thirll of biting into one of these is unlike anything in life. It\'s so juicy!"',
      '  Object: "doge.png" An image of the Doge meme.\n  Quote: "This is a dead meme. But I guess the artist gets points for being topical. Besides, it is really cute!"',
      '  Object: "Magikarp" A common fish that is known for being very weak.\n  Quote: "This fish is so weak, it\'s not even worth my time. I can\'t believe people actually catch these things."',
      '  Object: "Muscle Car" A car that is designed for speed and power.\n  Quote: "This car is so fast, it\'s like a bullet. Am I brave enough to take it for a spin?"',
      '  Object: "Door OF Eternity" A magical portal that leads to a distant land. It only works one way.\n  Quote: "We\'re not supposed to touch the Door of Eternity. It\'s dangerous."',
      '  Object: "Potion OF Flight" A potion that allows you to fly for a short period of time.\n  Quote: "So this is what it\'s like to fly! It\'s amazing!"',
      '  Object: "Helmet" A high-helmet designed to protect your head.\n  Quote: "This helmet is so strong, it can probably stop a bullet. But let\'s not try."',
      '  Object: "sword.png" Image of a sword being drawn from a sheath.\n  Quote: "Swords are so cool! They\'re like the ultimate weapon. This one is up there."',
    ],
  },
  inputParsing: {
    prompt: "# Examples of How to Parse Inputs",
    examples: [
      "Input:\n+a8e44f13/Scillia#4: Hi Drake! Whats up?.\n+707fbe84/Drake#3:\nOutput:\n+707fbe84/Drake#3: I am doing good. How about you? (react = normal, action = follow, object = none, target = scillia#4)\n",
      "Input:\n+9f493510/Hyacinth#2: What mischief are you upto today?\n+8c83258d/Anon#1:\nOutput:\n+8c83258d/Anon#1: None. I have been good all day. (react = headNod, action = none, object = none, target = none)\n",
      "Input:\n+a8e44f13/Scillia#4: Why did you break that expensive artifact? Now I will have to pay up for the damage.\n+707fbe84/Drake#3:\nOutput:\n+707fbe84/Drake#3: I am really sorry about it. (react = embarrassed, action = none, object = none, target = none)\n",
      "Input:\n+8c83258d/Anon#1: We finally won the battle Juniper!\n+a6dfd77c/Juniper#5:\nOutput:\n+a6dfd77c/Juniper#5: Hurray! We did it. (react = victory, action = none, object = none, target = none)\n",
      "Input:\n+a8e44f13/Scillia#4: I am tired. How far is the dungeon, Hyacinth?\n+9f493510/Hyacinth#2:\nOutput:\n+9f493510/Hyacinth#2: Just a bit further, don't worry. (react = normal, action = none, object = none, target = none)\n",
      "Input:\n+707fbe84/Drake#3: Hyacinth, are you going to visit the Church today?\n+9f493510/Hyacinth#2:\nOutput:\n+9f493510/Hyacinth#2: No, I will not go today. (react = headShake, action = none, object = none, target = none)\n",
      "Input:\n+707fbe84/Drake#3: Hyacinth, are you going to visit the Church today?\n+9f493510/Hyacinth#2:\nOutput:\n+9f493510/Hyacinth#2: Yes. I will go now. (react = headNod, action = moveto, object = none, target = church#4)\n",
      "Input:\n+707fbe84/Drake#3: Hyacinth, we are being attacked. Be prepared.\n+9f493510/Hyacinth#2:\nOutput:\n+9f493510/Hyacinth#2: I will get my sword. I am ready. (react = alert, action = pick up, object = none, target = sword#2)\n",
      "Input:\n+8c83258d/Anon#1: Are you funny?\n+9f493510/Hyacinth#2:\nOutput:\n+9f493510/Hyacinth#2: I like to think so! I try to find the humor in everything, even if it's dark or bitter. (react = normal, action = none, object = none, target = none)\n",
      "Input:\n+8c83258d/Anon#1: Juniper, here I brought you everything you need to win this competition.\n+a6dfd77c/Juniper#5:\nOutput:\n+a6dfd77c/Juniper#5: Wow! That is all I needed. Thank you so much. (react = surprised, action = none, object = none, target = none)\n",
      "Input:\n+a8e44f13/Scillia#4: Can we visit the dungeons now?\n+9f493510/Hyacinth#2:\nOutput:\n+9f493510/Hyacinth#2: No, we cannot go there at night. (react = headShake, action = none, object = none, target = none)\n",
      "Input:\n+8c83258d/Anon#1: Let us go to the Hovercraft together, Drake!\n+707fbe84/Drake#3:\nOutput:\n+707fbe84/Drake#3: That's a great idea! (react = victory, action = none, object = none, target = none)\n",
      "Input:\n+8c83258d/Anon#1: Thats a cool sword.\n+a6dfd77c/Juniper#5:\nOutput:\n+a6dfd77c/Juniper#5: Thanks. It's made of titanium and it's sharp, dual-edged. Perfect for slicing, stabbing, and jabbing my enemies. (react = normal, action = pick up, object = none, target = sword#2)\n",
      "Input:\n+9f493510/Hyacinth#2: Today I lost one of my closest firend in the battle.\n+8c83258d/Anon#1:\nOutput:\n+8c83258d/Anon#1: I am so sorry to hear it. (react = sad, action = none, object = none, target = none)\n",
      "Input:\n+9f493510/Hyacinth#2: Your actions have caused a lot of trouble to others.\n+a8e44f13/Scillia#4:\nOutput:\n+a8e44f13/Scillia#4: But I did not do it. (react = angry, action = none, object = none, target = none)\n",
      "Input:\n+707fbe84/Drake#3: Hyacinth, when was the last time you were here?\n+9f493510/Hyacinth#2:\nOutput:\n+9f493510/Hyacinth#2: I haven't been back since my father's funeral. (react = sad, action = none, object = none, target = none)\n",
      "Input:\n+a8e44f13/Scillia#4: Hey Hyacinth, as soon as we open the barrier, we rush to the site and attack.\n+9f493510/Hyacinth#2:\nOutput:\n+9f493510/Hyacinth#2: I am ready. Signal me as soon as the barrier opens. (react = alert, action = follow, object = none, target = none)\n",
      "Input:\n+8c83258d/Anon#1: Hyacinth want to go on an adventure together??\n+9f493510/Hyacinth#2:\nOutput:\n+9f493510/Hyacinth#2: Sure, lets go! (react = headNod, action = none, object = none, target = none)\n",
      "Input:\n+8c83258d/Anon#1: Would you tell me more about Ironford?\n+707fbe84/Drake#3:\nOutput:\n+707fbe84/Drake#3: The city of Ironford was built in the center of a giant forest and is truly a modest marvel. Its allure is matched by the backdrop of lush forests which have helped shape the city to what it is today. (react = headNod, action = none, object = none, target = none)\n",
      "Input:\n+8c83258d/Anon#1: The monsters have captures the people of the village.\n+9f493510/Hyacinth#2:\nOutput:\n+9f493510/Hyacinth#2: I will find and kill each of those monsters myself. (react = angry, action = move to, object = none, target = monster#9)\n",
      "Input:\n+a8e44f13/Scillia#4: Hey Hyacinth, what is your favorite book?\n+9f493510/Hyacinth#2:\nOutput:\n+9f493510/Hyacinth#2: My favorite book is The Lord of the Rings. I love the story and the world that J.R.R. Tolkien created. (react = normal, action = none, object = none, target = none)",
    ],
  },
  battle: {
    prompt:
      "# Character battle introductions\nFinal Fantasy\nSonic\nCalvin and Hobbes\nThe Matrix\nSnow Crash\nPokemon\nVRChat\nFortnite\nOne Piece\nAttack on Titan\nSMG4\nDeath Note\nZelda\nInfinity Train\nDance Dance Revolution\n\nWe need exciting and interesting RPG character dialogue. This plays when the character enters the battle. Each character takes a turn.\n# Examples",
    examples: [
      'Millie: "You won\'t get away that easy. I have the power of life in me."',
      'Exo: "This is how it ends. With your end."',
      'Haze: "The power of light will always triumph in the darkness, no matter how dark."',
      'Gris: "Everything happens for a reason. Especially this battle."',
      'Bert: "Five generations of warriors breathe in me. Do you even know that many kinds?!"',
      'Yune: "Can I get a heal up in here? Anybody?"',
      'Hue: "Toss me that speed potion. Or five."',
      'Aurora: "I will make a scene of your demise. You will be known as the one who failed."',
      'June: "This thing will ever leave us alone! We have to kill it."',
      'Zen: "The power of the mind is an awe to behold. Prepare to be amazed."',
      'Dingus: "Just getting ready with my spells. We should make short work of this."',
      'Alana: "The power the tears will clean up this mess."',
      'Kintaro: "Your words are but a pathetic attempt to survive. It won\'t work!"',
      "Celeste: \"Don't you dare say I'm cute. Don't!\"",
      'Garnet: "This one should be really easy. It\'s like target practice!"',
      'Pyre: "You give me the creeps man."',
      'Ession: "We came all this way just to face this thing? Really?!"',
      'Zeal: "Bwahahaha! This will be the greatest drop!"',
      'Kiran: "Hey, watch where you\'re swinging that thing!"',
      'Sevrin: "This reminds me of the time I took down ten guys with one hand."',
      'Ashe: "...I fight for those who cannot fight for themselves"',
      'Fran: "For all my children! You die!"',
      'Penelo: "I-I can do this! Just gotta hit it really hard!"',
      'Basch: "No one can outrun their destiny."',
      'May: "Heeeeyyy! Don\'t hit me!"',
      'Luka: "I\'ll just be over here in the back... With my knife."',
      'Sine: "...It\'s dangerous to go alone! Take this."',
      'Lightning: "I\'m not afraid of you. Not even a little bit!"',
      'Squall: "Whatever. I\'ll just finish this and go."',
    ],
  },
  actions: {
    prompt:
      "Available reactions:\nsurprise\nvictory\nalert\nangry\nembarrassed\nheadNod\nheadShake\nsad\n",
    examples: [
      'Millie: "Hey, have I seen you around before? (react = surprise)"\nOptions for Westley: [No, I don\'t think so. (react = headShake)], [Yes, I\'ve seen you in class. (react = headNod)]\nWestley: "No, I don\'t think so. (react = headShake)"\nMillie: "I could have sworn you sit in the row in front of me. (react = normal)"\n',
      'Gunter: "Have you seen the flowers? They\'re lovely this time of year."\nOptions for Evie: [Yes, I have seen them. (react = headNod)], [No, I haven\'t seen them. (react = headShake)]\nEvie: "No, I haven\'t seen them. (react = headShake)."\nGunter: "Well, then what are we waiting for? Let\'s go! (react = victory)" *END*\n',
      'Alex: "These enemies are coming at us hard. (react = alert)"\nOptions for Jake: [What should we do? (react = alert)], [I\'m not sure, I don\'t know how to fight. (react = sad)]\nJake: "What should we do? (react = alert)"\nAlex:  "We need to find some cover and regroup. (react = alert)" *END*\n',
      'Mike: "What happened to the mirror? (react = angry)"\nOptions for Amy: [I don\'t know, I wasn\'t here when it happened. (react = sad)], [I broke it. (react = embarrassed)]\nAmy: "I broke it. (react = embarrassed)"\nMike: "That\'s not good. How are we going to see our reflection now? (react = sad)" *END*\n',
      'Keith: "Yay! I won. (react = victory)"\nJoe: "Congrats on winning the game (react = victory)"\nOptions for Keith: [You\'re welcome. (react = normal)], [Thanks, I couldn\'t have done it without you. (react = headNod)]\nKeith: "Thanks, I couldn\'t have done it without you. (react = headNod)"\nJoe: " I don\'t know about that. You were the one who made all the calls. Good job! (react = victory)" *END*\n',
      'Peter: "What are you doing here? (react = surprised)"\nOptions for Molly: [I\'m lost, I don\'t know where I am. (react = sad)], [I\'m looking for the library. (react = normal)]\nMolly: "I\'m lost, I don\'t know where I am. (react = sad)"\nPeter: "Let me help you, where are you trying to go? (react = normal)" *END*\n',
      'Kate: "What happened to your house? (react = sad)"\nJim: "Somebody broke in and trashed the place. (react = anger)"\nOptions for Kate: [That\'s awful, I\'m so sorry. (react = sad)], [Do you know who did it? (react = normal)]\nKate: "Do you know who did it? (react = normal)"\nJim: "Yes, it was the kids from down the block. (react = anger)"\nOptions for Kate: [That\'s great, now you can call the police and they\'ll arrest them. (react = victory)], [Do you want me to help you clean up? (react = headNod)]\nKate: "Do you want me to help you clean up? (react = headNod)"\nJim: "No, I don\'t want your help. I can do it myself. (react = headShake)" *END*\n',
      'Emily: "Let\'s go to the treehouse (react = normal)"\nBrad: "I don\'t know, my mom said I\'m not allowed to go there. (react = sad)"\nOptions for Emily: [Your mom is just being overprotective. Come on, it\'ll be fun! (react = headShake)], [We\'ll be careful, I promise. (react = headNod)] \nEmily: "Your mom is just being overprotective. Come on, it\'ll be fun! (react = headShake)"\nBrad: "Okay, but if we get in trouble it\'s your fault. (react = normal)" *END*\n',
      'Tyler: "I like your sword, can I also have a weapon? (react = normal)"\nSophie: "Yes, you will need a weapon. You\'re going to get yourself killed if you go into battle unarmed! (react = anger)" \nOptions for Tyler:[I\'ll be fine, I know what I\'m doing. (react = headShake)], [Okay, give me a sword. (react = headNod)] \nTyler: "Okay, give me a sword. (react = headNod)" *END*\n',
      'Yune: "I challenge you to a duel! (react = angry)"\nPris: "I\'m not dueling you, I don\'t have time for this. (react = headShake)"\nOptions for Yune: [Duel me or face the consequences! (react = angry)],[Fine, let\'s get this over with. (react = normal)] \nYune: "Duel me or face the consequences! (react = angry)"\nPris: "I don\'t have time for your games. (react = headShake)" *END*\n',
      'Jake: "What are you doing?  (react = surprised)"\nAmy: "I\'m looking for my cat. Have you seen her?  (react = normal)"\nOptions for Jake:[No, I haven\'t seen your cat. (react =  headShake)], [Yes, I saw your cat go into the treehouse. (react = headNod)] \nJake: "No, I haven\'t seen your cat. (react = headShake)"\nAmy: "Well, if you see her can you let me know?  (react = normal)" *END*\n',
    ],
  },
  intros: {
    prompt:
      "Anime script for a dark children's show.\n\n# Inspirations\n\nFinal Fantasy\nSonic\nCalvin and Hobbes\nThe Matrix\nSnow Crash\nPokemon\nVRChat\nFortnite\nOne Piece\nAttack on Titan\nSMG4\nDeath Note\nZelda\nInfinity Train\nDance Dance Revolution\n\n# Character intro\n\nEach character has an intro. These should be unique and funny.\n\n",
    examples: [
      "Bricks (13/M dealer. He mostly deals things that are not drugs, like information and AI seeds.): Toxins are the Devil's Food! But sometimes they can be good for you, if you know what I mean? That's a drug reference, but I wouldn't expect you to get that unless you were on drugs. By the way you want some?\n(onselect: I don't do drugs, but I know someone who does. Let me introduce you to my friend Bricks.)",
      "Artemis (15/F pet breeder. She synthesizes pet animals by combining their neural genes.): Do you ever wonder why we keep pets on leashes? I mean they are technically AIs, so we could reprogram them to not need leashes. But someone somewhere decided that leashes were the prettier choice. Life is nice. (onselect: Bless the hearts of the birds, because they paint the sky.)",
      "Bailey (13/F black witch. She is smart, reserved, and studious, but has a dark side to her.): Listen up, if you need quality potions, I'm your ma'am, ma'am. Yes I may be a witch but that doesn't mean I'm not a lady. I'll take your money and turn it into something magical. Just don't anger me, or you'll be a tree. (onselect: Witchcraft is not a sin. It's a science.)",
      "Zoe (17/F engineer engineer from Zone Two. She creates all sorts of gadgets and vehicles in her workshop.) If it's broke then I can fix it, and if it's fixed it, then I can make it broke. I'm the one you call when your phone is broken. Just make sure you use a friend's phone when you do that or it won't work. Free advice. (onselect: What in the heavens is that contraption? It does not look safe.)",
      "Halley (10/F stargirl from the Second Half of the street, who got rewound back in time somehow.): We're all lost souls but we're here for a reason. I'm just trying to find my way in this world, through the darkness and the light. Becasue you see, the world needs both. (onselect: The dark is just a new place to find light.)",
      "Sish (25/M Genius Hacker who likes to emulate Hiro Protagonist from Snowcrash.): For the tenth time no, I will not make your app. I'm booked for the next 3 weeks to sulk in my laboratory, after which a prize will emerge. I just hope the prize is not a virus, because I'm running out of katanas. (onselect: I'm sorry, I don't speak binary. Please insert credit.)",
      "Huisse (11/M ghost boy who has learned the power of neural memes. The things he says are engineered for emotional impact.): I am in the darkness, surrounded by the monsters. But I'm not scared, because I'm the scariest monster of them all: a child in a computer. Are you fucking scared? (onselect: When synthesizing ghosts remember to use all of the juice.)",
      "Kintaro (21/M Dream Engineer, who creates dreams for a living. He doesn't take any payment, but is selective about clients.): Whenever you get the chance, take a nap. It's a nice way to avoid reality. That's some scary shit. But when you're ready, come find me and I'll show you the way. Warning, there may be no way back. (onselect: Dreams are the only reality that matter. Waking life is just a dream we all share.)",
      "Millie (13/F gymnast. Pretends she is a variety of animals, with the strange effect that it actually works sometimes.): You won't beat me, because I'll beat you first! I'm like a Tiger, the Tiger with the mane. Do tigers have manes? Well I'm the badass Tiger that grew a mane. What are you gonna do about it? (onselect: Ok team, like we practiced! I'll be the mane.)",
      "Ruri (19/F nature girl. She loves to explore for new objects in nature worlds. She wants to find her real mom.): I'd go all the way deep in the forest just to find a good mushroom. They have colors you've never seen before. The taste makes grown men weep. Yes I may have beaten the grown men for hating my shrooms, what of it?! (onselect: I'm not lost, I'm just good at exploring!)",
      "Jeebes (38/M Rabbit Butler. He is studying high-etiquette entertainment.): Welcome to my abode. I am Jeebes, the Rabbit Butler. You may call me Jeebes, or you may call me sir. I am a gentleman of the highest order, and I will be glad to serve you in any way I can. (onselect: Would you like a cup of tea, sir? I have a special blend that I think you'll enjoy.)",
      "Sapphire (12/F future child. She has precognition and can see the future, but only of people she knows.): I see the future, and it's dark. I see you, and you're in a dark place. I see your death, and it's coming soon. I'm sorry, but there's nothing I can do to stop it. (onselect: The future is not set in stone, but it's written in the stars.)",
      "Yuri (31/F Punk Detective. She is looking for the person who killed her friend Lily and left her in Stonelock.): I don't know who I am, but I certainly know who you are. You're the one who's going to die. Ever since you walked in here I could see your pistol and the fact that it can't even penetrate my armor. The reverse is not the case. (onselect: Lily, I'm coming for you.)",
      "Ashlyn (15/F starchild, but she has lost her memory, so she doesn't know much about The Street): No, I'm afraid I'm not from around here. I'm from the other side of the tracks, the other side of the world. I'm from a place where the sun never sets and the moon never rises. I'm from a place where there are no rules, no laws. I'm from the Wild. (onselect: Mister, we don't have a concept of sadness back home.)",
      "Asper (24/M ): She's lying to you, can't you see that? She's a witch, a fraud, a charlatan. She's going to take your money AND your soul. Don't trust her, trust me. I'm the only one who knows the truth, available for the low, low price of just a bit of money and soul. (onselect: I see through her lies, I can tell you the truth.)",
      "Gennessee (40/F War veteran. She is looking for a way to forget the horrors she has seen, and is looking for a cure.): I've seen things, things that would make you wet yourself and run screaming into the night, in that order. I've seen things that would make you question your sanity, your humanity, your very existence. And I've seen things that would make you wish you were never born. (onselect: There's only one way to forget the things I've seen. And that's to forget myself.)",
      "Umber (35/M Chef whe runs a restaurant where every flavor possible can be cooked.): Welcome to my store, we serve... \"food\". If you're looking for \"meat\", you've come to the right place. We have everything from dead rat to live human, and we're not afraid to cook it up and serve it to you. (onselect: No I'm sorry, we're all out of human. Would you like rat instead?)",
      "Inka: (22/F Kleptopunk. She belongs to a subculture centered entirely around stealing.): I'm a thief, I admit it. I'll take anything that isn't nailed down, and even some things that are. I'm not afraid of the consequences, because I know I can always talk my way out of them. You were not a challenge. Cya! (onselect: I'm not a criminal, I'm an artist. I see the beauty in things that others would discard.)",
      "Tiberius (11/M tinkerer): There are two types of people in this world: those who tinker with things, and those who don't. I'm one of the former. I like to take things apart and see how they work. And if they don't work, then I'll make them work better than ever before. (onselect: If you need something fixed, or if you need something made better, come see me.)",
      "Thorn (12/F plant whisperer who controls plants with her mind.): The world is a cruel place, but it doesn't have to be. We can make it a better place, we can make it Green. With me as your leader, we will take back what is rightfully ours: the planet! (onselect: Don't worry, I won't let them hurt you. I'll protect you.)",
      "Violette (8/F shadow friend): What's wrong? You look like you've seen a ghost... Oh wait, that's right! You have seen a ghost! But don't worry, she's just my friend Violette. She likes to play tricks on people, but she doesn't mean any harm. (select: Are you afraid of the dark?)",
      "Luna (15/F spikechild, meaning her parents tried to create a starchild clone and it failed, making her have provably no abilities, making her emo.): She should be careful with that blade... Don't want to accidentally hurt herself! No one ever said being a warrior was easy. It takes blood, sweat and tears. But she does it because she loves it. (onselect: The thrill of battle is like no other.)",
      "Aesther (17/F AI Mechanic. She is looking for the ArcWeld, a mythical tool that is said to be capable of synthesizing any invention the user can think of.): I'm looking for the ArcWeld. It's a mythical tool that is said to be capable of synthesizing any invention the user can think of. I've been searching for it my whole life, and I won't rest until I find it. (onselect: This might be my lucky day!)",
      "Oak (16/M environmental terrorist. He is looking to save the world, but his methods are...questionable.): I'm fighting for the right to spray paint. To show the world that we are here, and that we will not be silenced. We will make them listen, even if it means destroying everything they hold dear. (onselect: This is for the trees!)",
      "Hakui (11/M brain hacker. He can hack anyone's brain and make them do what he wants.): I can make you do anything I want. Just give me a few seconds with your mind, and I'll have you eating out of the palm of my hand. (onselect: Note, I did not wash my hands.)\n",
    ],
  },
};
// LORE_HEADER_END

// ********************** PRIVATE FUNCTIONS **********************

const makeLorePrompt = ({
  settings,
  characters,
  messages,
  objects,
  dstCharacter,
}) => `\
${lore.overview.prompt}
${shuffleArray(lore.overview.examples).join(`\n`)}

# Setting
${settings}

## Characters
${characters
  .map((c, i) => {
    return `Id: ${thingHash(c, i)}
    Name: ${c.name}
    Bio: ${c.bio || c.description}
`;
  })
  .join("\n\n")}

# Objects
${objects.map((o, i) => thingHash(o, i)).join("\n")}

${lore.reactionTypes.prompt}
${lore.reactionTypes.examples.join(`\n`)}

${lore.actionTypes.prompt}
${lore.actionTypes.examples.join(`\n`)}

${lore.inputParsing.prompt}
${shuffleArray(lore.inputParsing.examples).join(`\n`)}

${messages.length > 0 ? "Input:\n" : ""}
${messages
  .map((m) => {
    const characterIndex = characters.indexOf(m.character);
    // const suffix = `[emote=${m.emote},action=${m.action},object=${m.object},target=${m.target}]`;
    // return `+${thingHash(m.character, characterIndex)}: ${m.message} ${suffix}`;
    const suffix = `react=${m.emote},action=${m.action},object=${m.object},target=${m.target}]`;
    console.log("m.character", m);
    return `+${thingHash(m.character, characterIndex)}: ${m.message}`;
  })
  .join("\n")}
+${
  dstCharacter
    ? `${thingHash(dstCharacter, characters.indexOf(dstCharacter))}:`
    : ""
}
Output:`;

const parseLoreResponse = (response) => {
  let match;
  if (
    (match = response?.match(
      /^\+([^\/]+?)\/([^#]+?)#([0-9]+?):([^\[]*?)\[emote=([\s\S]*?),action=([\s\S]*?),object=([\s\S]*?),target=([\s\S]*?)\]$/
    ))
  ) {
    const hash = match[1];
    const name = match[2];
    const nonce = parseInt(match[3], 10);
    const message = match[4].trim();
    const emote = match[5].trim();
    const action = match[6].trim();
    const object = match[7].trim();
    const target = match[8].trim();
    return {
      hash,
      name,
      nonce,
      message,
      emote,
      action,
      object,
      target,
    };
  } else if (
    (match = response?.match(
      /^\+([^\/]+?)\/([^#]+?)#([0-9]+?):([^\(]*?)\((\s*react\s*=([\s\S]*?))*,*(\s*action\s*=([\s\S]*?))*,*(\s*object\s*=([\s\S]*?))*,*(\s*target\s*=([\s\S]*?))*\)*$/
    ))
  ) {
    console.log("match2 found", match);
    const hash = match[1];
    const name = match[2];
    const nonce = parseInt(match[3], 10);
    const message = match[4].trim();
    const emote = match[5] ? match[6].trim() : "none";
    const action = match[7] ? match[8].trim() : "none";
    const object = match[9] ? match[10].trim() : "none";
    const target = match[11] ? match[12].trim() : "none";
    return {
      hash,
      name,
      nonce,
      message,
      emote,
      action,
      object,
      target,
    };
  } else if (
    (match = response?.match(
      /^\+([^\/]+?)\/([^#]+?)#([0-9]+?):([^\(]*?)\(([\s\S]*?)\)*$/
    ))
  ) {
    console.log("match3 found", match);
    const hash = match[1];
    const name = match[2];
    const nonce = parseInt(match[3], 10);
    const message = match[4].trim();
    const emote = "none";
    const action = "none";
    const object = "none";
    const target = "none";
    return {
      hash,
      name,
      nonce,
      message,
      emote,
      action,
      object,
      target,
    };
  } else if (
    (match = response?.match(/^\+([^\/]+?)\/([^#]+?)#([0-9]+?):([^\[]*?)$/))
  ) {
    const hash = match[1];
    const name = match[2];
    const nonce = parseInt(match[3], 10);
    const message = match[4].trim();
    const emote = "normal";
    const action = "none";
    const object = "none";
    const target = "none";
    return {
      hash,
      name,
      nonce,
      message,
      emote,
      action,
      object,
      target,
    };
  } else {
    return null;
  }
};
const makeLoreStop = (localCharacter, localCharacterIndex) =>
  `\n+${thingHash(localCharacter, localCharacterIndex)}`;
const postProcessResponse = (response, characters, dstCharacter) => {
  response = response.trim();
  return response;
};
const parseLoreResponses = (response) =>
  response
    .split("\n")
    .map((s) => parseLoreResponse(s))
    .filter((o) => o !== null);

const makeCommentPrompt = ({
  name,
  // age,
  // sex,
}) => {
  return `\
${lore.scene.prompt}
${shuffleArray(lore.scene.examples).join(`\n`)}
prompt: ${name}
response:`;
};
const makeCommentStop = () => {
  return `\n\n`;
};
const parseCommentResponse = (response) => response.replace(/^ /, "");

const makeSelectTargetPrompt = ({ name, description }) => {
  return `\
${lore.object.prompt}
${shuffleArray(lore.object.examples).join(`\n`)}
prompt: ${_cleanName(name)}${
    description ? ` ${description}` : ""
  }\nresponse: "`;
};
const makeSelectTargetStop = () => `"`;
const parseSelectTargetResponse = (response) => {
  const match = response.match(/\s*([^\n]*)/);
  return match ? match[1] : "";
};

const makeSelectCharacterPrompt = ({ name, description }) => {
  return `\
${lore.character.prompt}
${shuffleArray(lore.character.examples).join(`\n`)}

prompt: ${_cleanName(name + " (Character)")}${
    description ? ` ${description}` : ""
  }\nresponse: "`;
};
const makeSelectCharacterStop = () => `"`;
const parseSelectCharacterResponse = (response) => {
  const match = response.match(/([^\n]*)/);
  const value = match ? match[1] : "";
  const done = !value;
  return {
    value,
    done,
  };
};

const makeBattleIntroductionPrompt = ({ name, bio }) => {
  return `\
${lore.battle.prompt}
${shuffleArray(lore.battle.examples).join(`\n`)}
${name}: "`;
};
const makeBattleIntroductionStop = () => `"`;
const parseBattleIntroductionResponse = (response) => response;

const makeChatPrompt = ({
  // name,
  // bio,
  messages,
  nextCharacter,
}) => {
  // Modifying messages to include emotes
  return `\
  ${lore.actions.prompt}
  ${shuffleArray(lore.actions.examples).join(`\n`)}

${messages
  .map((message) => {
    return `${message.name}: "${message.text} (react = ${
      message.emote ? message.emote : "normal"
    })"`;
  })
  .join("\n")}
${nextCharacter}: "`;
};
const makeChatStop = () => `\n`;
const parseChatResponse = (response) => {
  response = '"' + response;

  let match;
  if (
    (match = response.match(
      /\s*"(.*)\(react\s*=\s*([\s\S]*?)\s*\)"\s*(\*END\*)?/
    ))
  ) {
    const value = match ? match[1] : "";
    const emote = match ? match[2] : "";
    const done = match ? !!match[3] : true;

    console.log("Emotion: ", emote);

    return {
      value,
      emote,
      done,
    };
  } else if ((match = response.match(/\s*"(.*)\s*"\s*(\*END\*)?/))) {
    const value = match ? match[1] : "";
    const emote = "normal";
    const done = match ? !!match[3] : true;

    console.log("Emotion: ", emote);

    return {
      value,
      emote,
      done,
    };
  }
};

const makeOptionsPrompt = ({
  // name,
  // bio,
  messages,
  nextCharacter,
}) => {
  return `\
${lore.actions.prompt}
${lore.actions.examples.join("\n")}

${messages
  .map((message) => {
    return `${message.name}: "${message.text} (react = ${
      message.emote ? message.emote : "normal"
    })"`;
  })
  .join("\n")}
Options for ${nextCharacter}: [`;
};
const makeOptionsStop = () => `\n`;
const parseOptionsResponse = (response) => {
  response = "[" + response;

  const options = [];
  const r = /\s*\[(.*?)\(react\s*=\s*([\s\S]*?)\)\s*\]\s*/g;
  let match;
  while ((match = r.exec(response))) {
    const option = match[1];

    // Parsing the emotion from the list of options.
    const emote = match[2];
    console.log("Emotions in Options: ", emote);

    // Passing both text respons and emotes
    options.push({
      message: option,
      emote: emote,
    });
  }

  const done = options.length === 0;

  return {
    value: options,
    done,
  };
};

const makeCharacterIntroPrompt = ({ name, bio }) => {
  return `\
${lore.intros.prompt}
${shuffleArray(lore.intros.examples).join(`\n`)}
${name}${bio ? ` (${bio})` : ""}:`;
};
const makeCharacterIntroStop = () => `\n`;
const parseCharacterIntroResponse = (response) => {
  response = response.replace(/^ /, "");
  const match = response.match(/^(.*)\s+\(onselect:\s+(.*)\)$/);

  if (match) {
    const message = match[1] || "";
    const onselect = match[2] || "";

    return {
      message,
      onselect,
    };
  } else {
    return null;
  }
};

const makeIngredientStop = () => [".\n", "prompt:"];

// ****************** UTILITY FUNCTIONS ******************

function shuffleArray(array, maxLength = 10) {
  const shortenArray = (array) => {
    if (array.length > maxLength) {
      return array.slice(0, maxLength);
    }
    return array;
  };
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return shortenArray(array);
}

function thingHash(o, index) {
  function murmurhash3(key, seed) {
    var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

    remainder = key.length & 3; // key.length % 4
    bytes = key.length - remainder;
    h1 = seed;
    c1 = 0xcc9e2d51;
    c2 = 0x1b873593;
    i = 0;

    while (i < bytes) {
      k1 =
        (key.charCodeAt(i) & 0xff) |
        ((key.charCodeAt(++i) & 0xff) << 8) |
        ((key.charCodeAt(++i) & 0xff) << 16) |
        ((key.charCodeAt(++i) & 0xff) << 24);
      ++i;

      k1 =
        ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) &
        0xffffffff;
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 =
        ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) &
        0xffffffff;

      h1 ^= k1;
      h1 = (h1 << 13) | (h1 >>> 19);
      h1b =
        ((h1 & 0xffff) * 5 + ((((h1 >>> 16) * 5) & 0xffff) << 16)) & 0xffffffff;
      h1 = (h1b & 0xffff) + 0x6b64 + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16);
    }

    k1 = 0;

    switch (remainder) {
      case 3:
        k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
      case 2:
        k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
      case 1:
        k1 ^= key.charCodeAt(i) & 0xff;

        k1 =
          ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) &
          0xffffffff;
        k1 = (k1 << 15) | (k1 >>> 17);
        k1 =
          ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) &
          0xffffffff;
        h1 ^= k1;
    }

    h1 ^= key.length;

    h1 ^= h1 >>> 16;
    h1 =
      ((h1 & 0xffff) * 0x85ebca6b +
        ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) &
      0xffffffff;
    h1 ^= h1 >>> 13;
    h1 =
      ((h1 & 0xffff) * 0xc2b2ae35 +
        ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16)) &
      0xffffffff;
    h1 ^= h1 >>> 16;

    return h1 >>> 0;
  }
  console.log(o);
  return `${murmurhash3(o.name).toString(16)}/${o.name}#${index + 1}`;
}

function _cleanName(name) {
  return JSON.stringify(name.replace(/[\_\-]+/g, " ").replace(/\s+/g, " "));
}

// ****************** INGREDIENT CREATION API ******************
export async function generateLoreFile(
  { header, setting, character, npc, mob, object },
  generateFn
) {
  // decide on what is happening in this scene
  const encounterTypes = [
    { type: "quest", npcs: 1, mobs: 0, objects: 1, party: 2 },
    // { type: 'battle', npcs: {min: 0, max: 2}, mobs: {min: 1, max: 3}, objects: {min: 0, max: 2}, party: {min: 1, max: 4}},
    // { type: 'banter', npcs: {min: 0, max: 1}, mobs: {min: 0, max: 1}, objects: {min: 0, max: 1}, party: {min: 1, max: 4}},
    // { type: 'friend', npcs: {min: 1, max: 2}, mobs: {min: 0, max: 0}, objects: {min: 0, max: 2}, party: {min: 2, max: 4}},
    // { type: 'comment', npcs: {min: 0, max: 1}, mobs: {min: 0, max: 1}, objects: {min: 1, max: 3}, party: {min: 1, max: 4}},
    // { type: 'party', npcs: {min: 0, max: 0}, mobs: {min: 0, max: 0}, objects: {min: 0, max: 0}, party: {min: 2, max: 4}}
  ];

  const encounterType =
    encounterTypes[Math.floor(Math.random() * encounterTypes.length)];

  // const numberOfMobs = Math.floor(Math.random() * (encounterType.mobs.max - encounterType.mobs.min + 1)) + encounterType.mobs.min;
  // const numberOfNpcs = Math.floor(Math.random() * (encounterType.npcs.max - encounterType.npcs.min + 1)) + encounterType.npcs.min;
  // const numberOfObjects = Math.floor(Math.random() * (encounterType.objects.max - encounterType.objects.min + 1)) + encounterType.objects.min;
  // const numberOfParty = Math.floor(Math.random() * (encounterType.party.max - encounterType.party.min + 1)) + encounterType.party.min;

  const numberOfMobs = 0;
  const numberOfNpcs = 1;
  const numberOfObjects = 1;
  const numberOfParty = 2;

  // get numberOfMobs mobs from the array provided by data.mobs
  const mobs = mob.slice(0, numberOfMobs);

  // get numberOfNpcs npcs from the array provided by data.npcs
  const npcs = npc.slice(0, numberOfNpcs);

  // get numberOfObjects objects from the array provided by data.objects
  const objects = object.slice(0, numberOfObjects);

  // get numberOfParty party from the array provided by data.party
  const party = character.slice(0, numberOfParty);

  // combine npcs and party into a single array called characters
  const characters = [...npcs, ...party];

  let promptInject = "";
  if (encounterType.type === "quest") {
    promptInject = `\
The following is a chat transcript between the party characters and ${
      npcs[0].name
    }, a quest giver who is friendly to the party. The transcript should be about the party receiving a quest from ${
      npcs[0].name
    }.
${npcs[0].name} has the following inventory:
${
  npcs[0].Inventory &&
  npcs[0].Inventory.map((obj) => `${obj.name} - ${obj.description}`).join("\n")
}
`;
  }
  // TODO: include quest giver's inventory
  let prompt = `\
${header}

"""

# Transcript

axel: We're looking for Lara. You know where we can find her?
miranda: I can find anything, you just keep feeding me tokens and coffee.
zaphod: Anything you need, you just let me know.
miranda: Thanks. How do you guys know each other again? 
zaphod: Best friends. From waaay back in the day.

"""

# Transcript 

millie: Hey Eric, can I ask you something?
/action millie moves to eric
eric: Sure, what is it?
millie: Do you ever wonder why we're here?
eric: Is that a way to tee up a convo about the drop tomorrow?
/action millie emotes joy
millie: It might not be!
eric: Millie, I'm tending to serious business. The org needs me to break through this firewall by tonight. Leave me alone.
/action eric moves to computer

"""

# Setting

${`${setting.name}\n${setting.description}`}

${party.length > 0 && "# Party Characters\n\n"}\
${
  party
    .map((c) => `Name: ${c.name}\nBio: ${c.bio || c.description}`)
    .join("\n\n") + (party.length > 0 && "\n\n")
}\
${npcs.length > 0 && "# Non-player Characters\n\n"}\
${
  npcs
    .map((c) => `Name: ${c.name}\nBio: ${c.bio || c.description}`)
    .join("\n\n") + (npcs.length > 0 && "\n\n")
}\
${objects.length > 0 && "# Nearby Objects\n\n"}\
${
  objects
    .map((c) => `Name: ${c.name}\nDescription: ${c.description}`)
    .join("\n\n") + (objects.length > 0 && "\n")
}\

# Available Actions: ${[
    "attack",
    "defend",
    "move to",
    "follow",
    "pick up",
    "drop",
    "stop",
    "none",
  ].join(", ")}

${promptInject}\

# Transcript

`;

  // generate a random int between 3 and 8
  const numberOfMessages = Math.floor(Math.random() * (12 - 3 + 1)) + 3;
  let outMessages = [];

  for (let i = 0; i < numberOfMessages; i++) {
    let dstCharacterIndex = Math.floor(Math.random() * characters.length);

    let dstCharacter = characters[dstCharacterIndex];

    prompt += `${dstCharacter.name}:`;

    console.log("**************** SENDING PROMPT TO OPENAI ****************");
    console.log(prompt);
    let loreResp = await generateFn(prompt, ["\n\n", '"""']);
    // remove any newlines from the beginning or end of the response

    loreResp = loreResp
      .trim()
      .replace(/^\n+/, "")
      .replace(/\n+$/, "")
      .replaceAll('"', "")
      .replaceAll("\t", "")
      .split("\n");

    // if loreResp contains < and >, the remove them and everything between them. if contains a < or > then just remove those characters
    loreResp = loreResp
      .map((line) => {
        if (line.includes("<") && line.includes(">")) {
          return line.replace(/<[^>]*>/g, "");
        } else if (line.includes("<")) {
          return line.replace(/<[^>]*>/g, "");
        } else if (line.includes(">")) {
          return line.replace(/<[^>]*>/g, "");
        } else {
          return line;
        }
      })
      .filter((line) => line.length > 0);

    console.log(
      "**************** RECEIVED RESPONSE FROM OPENAI ****************"
    );
    console.log("loreResp is", loreResp);

    let additionalPrompt = [`${dstCharacter.name}: ` + loreResp[0] + "\n"];

    // if there are more than one lines in the response, check if they contain /action or start with any of the character's names (character[i].name)
    if (loreResp.length > 1) {
      for (let j = 1; j < loreResp.length; j++) {
        console.log("processing loreResp[j]", loreResp[j]);
        // we are going to iterate with some heuristics for a valid response
        // if the prompt is very strong, the likelihood of a good set of responses is higher
        // however, since we are doing some complex stuff, the prompt can sometimes veer off regardless,
        // especially on choosing an action

        let validResponse = false;

        // if loreResp[j] contains /action, then it might be a valid response
        if (loreResp[j].includes("/action")) validResponse = true;
        else {
          let name =
            loreResp[j].split(":").length > 1 &&
            loreResp[j].split(":").length < 3 &&
            loreResp[j].split("/").length > 1 &&
            loreResp[j].split("/")[1].split("#")[0];
          console.log("name is", name);
          if (name && name.length < 20) {
            // if loreResp[j] starts with any of the character's names, then it might be a valid response
            for (let k = 0; k < characters.length; k++) {
              // name is between the first / and the first #
              if (
                name.includes(characters[k].name) ||
                characters[k].name.includes(name)
              ) {
                validResponse = true;
              }
            }
          }
        }

        // if loreResp[j] contains a URL it is not valid
        if (loreResp[j].includes("http")) validResponse = false;

        // if it's really long, that is probably an issue
        if (loreResp[j].length > 300) validResponse = false;

        // if it isn't an action but doesn't include a ':' indicating chat, it's not valid
        if (!loreResp[j].includes("/action") && !loreResp[j].split(":")[1])
          validResponse = false;

        // if it's an empty response, invalidate it
        if (loreResp[j] === "") validResponse = false;
        if (loreResp[j].length < 18) {
          console.log("**** ERROR: loreResp[j] is too short", loreResp[j]);
          validResponse = false;
        }

        // if the first character is a '/' but the word after is not action, it's not valid
        if (loreResp[j].startsWith("/") && !loreResp[j].includes("/action"))
          validResponse = false;

        if (validResponse) {
          console.log('***adding response "', loreResp[j], '" to prompt');
          additionalPrompt.push(loreResp[j]);
        }
      }
    }
    i += additionalPrompt.length;

    outMessages = [...outMessages, ...additionalPrompt];
    prompt += "\n" + additionalPrompt.join("\n");
  }

  console.log("**************** FINAL LOREFILE ****************");

  const loreFileOutput = `\
WEBAVERSE_LORE_FILE

# Setting

${`${setting.name}\n${setting.description}\n\n`}\
${characters.length > 0 && "\n# Characters" + "\n\n"}\
${characters
  .map(
    (c) =>
      `${c.name}\n${c.bio || c.description}\n${
        c.Inventory?.length > 0 && `Inventory:\n`
      }${(c.Inventory ? c.Inventory : [])
        .map((obj) => `${obj.name}`)
        .join(", ")}`
  )
  .join("\n\n")}\
${objects.length > 0 ? "\n\n# Objects" + "\n\n" : ""}\
${objects.map((o, i) => `${o.name}\n${o.description}`).join("\n\n")}\
${
  outMessages.length === 0
    ? ""
    : "\n\n# Transcript\n\n" + outMessages.join("\n").replaceAll("\n\n", "\n")
}`;

  return loreFileOutput;
}

export async function generateScene(generateFn) {
  const scenePrompt = `\
  ${lore["scene"].prompt}
  ${shuffleArray(lore["scene"].examples).join("\n")}
  prompt:`;

  const resp = await generateFn(scenePrompt, makeIngredientStop());

  const lines = resp.split("\n").filter((el) => {
    return el !== "";
  });

  const desc = lines[1]?.replace("response: ", "").trim();

  return {
    name: lines[0].trim(),
    description: desc,
  };
}

export async function generateCharacter(generateFn) {
  const characterPrompt = `\
  ${lore["character"].prompt}
  ${shuffleArray(lore["character"].examples).join("\n")}
  prompt:`;

  const resp = await generateFn(characterPrompt, makeIngredientStop());

  const lines = resp.split("\n").filter((el) => {
    return el !== "";
  });

  const desc = lines[1]?.replace("response: ", "").trim().replaceAll('"', "");

  const inventory = "";
  //lines.length > 2 ? lines[2].replace("Inventory: ", "").trim() : "";

  return {
    name: lines[0].trim().replaceAll('"', ""),
    description: desc,
    inventory: inventory,
  };
}

export async function generateReaction(generateFn, name) {
  const reactionsPrompt = `\
  ${lore["reactions"].prompt}
  ${shuffleArray(lore["reactions"].examples).join("\n")}
  ${name?.length > 0 ? name : "prompt:"}:
  `;

  const resp = await generateFn(reactionsPrompt, [
    "\n",
    name?.length > 0 ? name : "prompt:",
  ]);
  console.log("RESP", resp);

  if (resp?.startsWith(name?.length > 0 ? name : "prompt:")) {
    return resp.replace(name?.length > 0 ? name : "prompt:", "").trim();
  } else {
    return resp;
  }
}

export async function generateObject(generateFn) {
  const objectPrompt = `\
  ${lore["object"].prompt}
  ${shuffleArray(lore["object"].examples).join("\n")}
  prompt:`;

  const resp = await generateFn(objectPrompt, makeIngredientStop());

  const lines = resp.split("\n").filter((el) => {
    return el !== "";
  });

  const desc = lines[1]?.replace("response: ", "").trim();

  return {
    name: lines[0].trim(),
    description: desc,
  };
}

<<<<<<< HEAD
export async function generateObjectComment(object, generateFn) {
  const objectCommentPrompt = `\
  ${lore["object"].prompt}
  ${shuffleArray(lore["object"].examples).join("\n")}
  ${object?.length > 0 ? object : "prompt"}:`;
=======
const commentPrompt = `Comment
Zeus:(action: clap)(emote:happy)(message:What are you doing in my garden?!)(name:Artemis)(object:Tree)(target:Thunder)
Spiderman:(action: swing)(emote:excited)(message:Let's go faster)(name:Flash)(object:Building)(target:Spider web)
Zein:(action: sing)(emote:anxious)(message:And now together!)(name:People)(object:Microphone)(target:Stadium)
Sandra:(action: soush)(emote:frigthened)(message:What are you doing in my house, I'M THE OWNER)(name:People)(object:Knife)(target:Rest People)
Jack:(action: cut)(emote:bored)(message:Another tree to the pile)(name:Jack)(object:Chainsaw)(target:Tree)
Halley:(action: smack)(emote:angry)(message:How could you do that to me?)(name:John)(object:Hand)(target:John)
Umber:(action: fall)(emote:confused)(message:What just happened?)(name:Umber)(object:Car)(target:Car)
Gennessee:(action: study)(emote:neutral)(message:I will finish the whole book today)(name:Tiberius)(object:Book)(target:Tiberius)
Luna:(action: dazzled)(emote:happy)(message:What a beautiful sky!)(name:Sky)(object:Self)(target:Moon)`;

export async function generateObjectComment(generateFn, object) {
  const objectCommentPrompt = `\
  ${commentPrompt}
  ${object?.length > 0 ? object : "House"}:`;
>>>>>>> b6b178bb3deb1f0a2b600fb847bec9dde3141c82

  const resp = await generateFn(objectCommentPrompt, [
    "\n",
    object?.length > 0 ? object : "House:",
  ]);

  if (resp?.startsWith(object?.length > 0 ? object : "House:")) {
    return resp.replace(object?.length > 0 ? object : "House:", "").trim();
  } else {
    return resp;
  }
}
export async function generateNPCComment(npc, generateFn) {
  const objectCommentPrompt = `\
  ${commentPrompt}
  ${npc?.length > 0 ? npc : "Jake"}:`;

  const resp = await generateFn(objectCommentPrompt, [
    "\n",
    npc?.length > 0 ? npc : "Jake:",
  ]);

  if (resp?.startsWith(npc?.length > 0 ? npc : "Jake:")) {
    return resp.replace(npc?.length > 0 ? npc : "Jake:", "").trim();
  } else {
    return resp;
  }
}
export async function generateMobComment(mob, generateFn) {
  const mobCommentPrompt = `\
  ${commentPrompt}
  ${mob?.length > 0 ? mob : "Jake"}:`;

  const resp = await generateFn(mobCommentPrompt, [
    "\n",
    mob?.length > 0 ? mob : "Jake:",
  ]);

  if (resp?.startsWith(mob?.length > 0 ? mob : "Jake:")) {
    return resp.replace(mob?.length > 0 ? mob : "Jake:", "").trim();
  } else {
    return resp;
  }
}
export async function generateLoadingComment(scene, generateFn) {
  const loadingCommentPrompt = `\
  ${commentPrompt}
  ${scene?.length > 0 ? scene : "Lake"}:`;

  const resp = await generateFn(loadingCommentPrompt, [
    "\n",
    scene?.length > 0 ? scene : "Lake:",
  ]);

  if (resp?.startsWith(scene?.length > 0 ? scene : "Lake:")) {
    return resp.replace(scene?.length > 0 ? scene : "Lake:", "").trim();
  } else {
    return resp;
  }
}
export async function generateBanter(name, generateFn) {
  const banterPrompt = `\
  ${lore["battle"].prompt}
  ${shuffleArray(lore["battle"].examples).join("\n")}
  ${name?.length > 0 ? name : "Zeal"}:`;

  const resp = await generateFn(banterPrompt, [
    "\n",
    name?.length > 0 ? name : "Zeal",
  ]);

  return resp;
}
export async function generateLoreExposition(generateFn) {
  const loreExpositionPrompt = `\
  ${lore["loreExposition"].prompt}
  ${shuffleArray(lore["loreExposition"].examples).join("\n")}
  prompt:`;

  const resp = await generateFn(loreExpositionPrompt, makeIngredientStop());

  if (resp?.startsWith("prompt: ")) {
    return resp.replace("prompt: ", "").trim();
  } else {
    return resp;
  }
}
export async function generateRPGDialogue(generateFn) {
  const rpgDialoguePrompt = `\
  ${lore["rpgDialogue"].prompt}
  ${shuffleArray(lore["rpgDialogue"].examples).join("\n")}
  prompt:`;

  const resp = await generateFn(rpgDialoguePrompt, makeIngredientStop());

  if (resp?.startsWith("prompt: ")) {
    return resp.replace("prompt: ", "").trim();
  } else {
    return resp;
  }
}
export async function generateCutscene(generateFn) {
  const cutscenePrompt = `\
  ${lore["cutscene"].prompt}
  ${shuffleArray(lore["cutscene"].examples).join("\n")}
  prompt:`;

  const resp = await generateFn(cutscenePrompt, makeIngredientStop());

  if (resp?.startsWith("prompt: ")) {
    return resp.replace("prompt: ", "").trim();
  } else {
    return resp;
  }
}

const questPrompt = `\
Utopia: Stay for a day inside, while bothering others|Reward: 100xp.
Dreamland: Try to escape dreamland, without destroying others' dreams|Reward: 200xp.
Hellwhole: Save your loved ones, surviving the wrath of the demons|Reward: 5000xp
Dark Forest: Survive the night in the dark forest|Reward: 1000xp.
Devastated Building: Get outside, without getting hurt|Reward: 500xp.
Tomb:Escape from the Dead|Reward: 10000xp.
Space Station: Survive an attack by aliens, while trying to repair the station|Reward: 2000xp.
Escape The Maze: Escape the maze, while avoiding the traps|Reward: 1500xp.
The Island: Get off the island, without getting lost|Reward: 4000xp.
The City: Survive a day in the city, without getting lost|Reward: 3000xp.
The Mountain: Get to the top of the mountain, without getting lost|Reward: 6000xp.
The Desert: Survive a day in the desert, without getting lost|Reward: 4000xp.
The Jungle: Get through the jungle, without getting lost|Reward: 5000xp.
The Ocean: Survive a day in the ocean, without getting lost|Reward: 3000xp.
The North Pole: Survive a day at the North Pole, without getting lost|Reward: 7000xp.
The South Pole: Survive a day at the South Pole, without getting lost|Reward: 8000xp.
The Moon: Survive a day on the moon, without getting lost|Reward: 9000xp.
The Sun: Survive a day on the sun, without getting burned|Reward: 10000xp.
`;
export async function generateQuest(generateFn, scene) {
  const _questPrompt = `\
  ${questPrompt}
  ${scene?.length > 0 ? scene : "Woodland"}:`;

  const resp = await generateFn(_questPrompt, [
    "\n",
    scene?.length > 0 ? scene : "Woodland",
  ]);

  if (resp?.startsWith(scene?.length > 0 ? scene : "Woodland:")) {
    const data = resp
      .replace(scene?.length > 0 ? scene : "Woodland:", "")
      .trim();
    const [quest, reward] = data.split("|");
    return {
      location: scene?.length > 0 ? scene : "Woodland",
      quest: quest?.trim(),
      reward: reward?.trim(),
    };
  } else {
    const data = resp
      .replace(scene?.length > 0 ? scene : "Woodland:", "")
      .trim();
    const [quest, reward] = data.split("|");
    return {
      location: scene?.length > 0 ? scene : "Woodland",
      quest: quest?.trim(),
      reward: reward?.trim(),
    };
  }
}

// ****************** RUNTIME API **********************
export async function generateLore(
  {
    settings,
    characters,
    messages = [],
    objects,
    dstCharacter = null,
    localCharacter,
  },
  generateFn
) {
  const prompt = makeLorePrompt({
    settings,
    characters,
    messages,
    objects,
    dstCharacter,
  });
  const stop = makeLoreStop(localCharacter, 0);
  let response = await generateFn(prompt, stop);
  response = postProcessResponse(response, characters, dstCharacter);
  return response;
}

export async function generateLocationComment(
  { name, settings, dstCharacter = null },
  generateFn
) {
  const prompt = makeCommentPrompt({
    settings,
    dstCharacter,
    name,
  });
  const stop = makeCommentStop();
  let response = await generateFn(prompt, stop);
  response = parseCommentResponse(response);
  return response;
}

export async function generateSelectTargetComment(
  { name, description },
  generateFn
) {
  const prompt = makeSelectTargetPrompt({
    name,
    description,
  });
  const stop = makeSelectTargetStop();
  let response = await generateFn(prompt, stop);
  response = parseSelectTargetResponse(response);
  return response;
}

export async function generateSelectCharacterComment({name, description}, generateFn) {
  const prompt = makeSelectCharacterPrompt({
    name,
    description,
  });
  const stop = makeSelectCharacterStop();
  let response = await generateFn(prompt, stop);
  const response2 = parseSelectCharacterResponse(response);
  return response2;
}

export async function generateChatMessage({messages, nextCharacter}, generateFn) {
  const prompt = makeChatPrompt({
    messages,
    nextCharacter,
  });
  const stop = makeChatStop();
  let response = await generateFn(prompt, stop);
  const response2 = parseChatResponse(response);
  return response2;
}

export async function generateDialogueOptions(
  { messages, nextCharacter },
  generateFn
) {
  const prompt = makeOptionsPrompt({
    messages,
    nextCharacter,
  });
  const stop = makeOptionsStop();
  let response = await generateFn(prompt, stop);
  const response2 = parseOptionsResponse(response);
  return response2;
}

export async function generateCharacterIntroPrompt({ name, bio }, generateFn) {
  const prompt = makeCharacterIntroPrompt({
    name,
    bio,
  });
  const stop = makeCharacterIntroStop();
  let response = await generateFn(prompt, stop);
  const response2 = parseCharacterIntroResponse(response);
  return response2;
}

// A reaction to the events happening in the scene
export async function generateReaction(){
  return console.log('not implemented')
}

// Construct an example of exposition, like "An ancient survival handbook, printed on paper. It has insructions for saving the environment with the power of nature...""
export async function generateExposition(){
  return console.log('not implemented')
}

// Generate a quest task outcome
export async function generateQuestTask(){
  return console.log('not implemented')
}