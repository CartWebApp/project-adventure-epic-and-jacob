//story
export const story = {
    start: {
         text: 'You are a peasant, walking around the town square. You live a relatively normal life, with your main focus mainly getting by. However, little do you know, one misstep is about to change that. In the middle of your daily walk to work, you come across a vase. Tired of your boring life, you decide to kick it down. The vase shatters with a loud CLASH, breaking it into an uncountable amount of clay pieces A very furious man sees what you\'ve done and comes to you, shouting. He reveals himself to be Bill Gatesford III, the richest man in the world. He angrily informs you that the vase you had "kicked down like a peasant" was worth one million Talons. The very next day, you are confronted by some shady men. They are the debt collectors, and tell you that you have one week before you have to pay the full million you owe.',
         choice: ['Negotiate with the collectors', 'Accept your fate and head outside to make some money', 'Slay the collectors with your dimension sword'],
         choiceId: ['hard', 'oldEncounter', 'dimensionSwordEnd']
     },
     hard: {
         text: 'You plead with the collectors. You tell them, \"I can\'t bring a million to you in a week. Please, can you lower the amount - or at least extend the time?\" The Collectors do not care. They start adding intrest to your debt. You now owe 1.2 million Talons It would not be wise to plead further',
         choice: ['Accept your fate and start looking for help'],
         choiceId: ['oldEncounter'],
         memory: 'Bargained with the collectors.'
     },
     oldEncounter: {
         text: 'You come across three old men, each of which look very different vibes. \n The first man seems to be very prideful, and seems well-built. On his belt is a sword, which seems to be ready to strike at any moment. \n The second man is very sketchy, and is the first to notice you before you even have the opportunity to notice him. \n The third man seems very unruly. He is not very well-dressed, and has a passionate look in his eyes.\n The three men seemed to be talking about something so you decide to approach them. You tell these men about your predicament. They all listen to your tale and say that they can offer a solution.\n Who\'s idea should you consider?',
         choice: ['Talk to the prideful man', 'Talk to the suspicous man', 'Talk to the passionate man'],
         choiceId: ['prideyMan', 'susMan', 'drugAddict'],
         memory: 'Talked to some old guys'
     },
     prideyMan: {
         text: 'The old man gives you some advice: If you want to make some money fast, head over to the Colusseum over at Nexdor, the neighboring town. The reward? Any wish that you want granted. However risky you think it\'ll be, it may be one of your only chances to clear your debt. Should you commit to a path of glory?',
         choice: ['Commit to Glory', 'Talk to the suspicous man', 'Talk to the passionate man'],
         choiceId: ['embarkTournament', 'susMan', 'drugAddict']
     },
     embarkTournament: {
         text: 'You take the sword from the old man, grateful for his assistance. You embark on your journey, eager to fight away your debt.',
         choice: ['Next'],
         choiceId: ['pathNexdor']
     },
     pathNexdor: {
         text: 'On your path, you encounter a very shady figure. He wears a hood, and keeps his head low to avoid attention. Suddenly, the suspicous man attacks! You are taken aback, but you now have a weapon to defend yourself. You ready yourself. If you can\'t defeat this street punk, then how can you be ready to win the tournament?',
         choice: ['Fight!'],
         choiceId: ['banditNexdor'],
            memory: 'Fought a bandit on the way to Nexdor.'
     },
     banditNexdor: {
         type: 'battle',
         win: 'banditNexdorWin',
         lose: 'gameOver'
     },
     banditNexdorWin: {
         text: 'The bandit, scared for his life, flees from the scene as fast as he can. In his escape, he left some \"borrowed\" goods behind.',
         choice: ['\"Borrow\" his goods'],
         choiceId: ['banditNexdorTake'],
     },
     banditNexdorTake: {
         text: 'You take what wasn\'t yours, but it also wasn\'t his to begin with, so it balances out. You recieved 500 talons and a worn chestplate.',
         choice: ['Finsish your trip to Nexdor'],
         choiceId: ['nexdorWelcome'],
         talons: 500,
         inventory: 'wornPlate'
     },
     nexdorWelcome: {
         text: 'After a somewhat rough trip to Nexdor, you\'ve made it. The gates swing open, and you are greeted with people who are busily bustling around. You don\'t have much time to absorb the atmosphere. It\'s almost sundown, and you need to find an inn to properly rest for the tournament tommorow',
         choice: ['Look into your options'],
         choiceId: ['innList'],
         memory: 'Made it to Nexdor, the tournament town.'
     },
     innList: {
         text:"After looking around, you find 3 inns of note and varying quality. The first inn is ShodInn, an inn that is suffering from severe rodent problems. The price is dirt cheap, but it won't gurentee a good night of sleep The second inn, InnInn, seems pretty basic, but it doseen't cost a whole lot to stay there. The third inn, Luxre-Inn, is renouned for it's luxury. It'll cost you everything you have, but it would be well worth the price.",
         choice: ['Sleep at ShodInn (20 talons)', 'Sleep at InnInn (150 talons)', 'Sleep at ShodInn (500 talons)'],
         choiceId: ['shodInn', 'innInn', 'luxuryInn'],
     },
     shodInn: {
         text: "The floors of your room are moldy and rotten. The leak on the ceiling distracts you from the familily of rats scattering about. The rats seem harmless if you don't bother them, but it's still hard to sleep with them scattering about. Exterminate the rats?",
         choice: ['EXTERMINATE', 'I don\'t get paid enough for this'],
         choiceId: ['rats', 'sleepShod'],
         talons: -20,
         memory: 'Stayed at the shoddy Inn.'
     },
     rats: {
         type: 'battle',
         win: 'ratsWin',
         lose: 'gameOver'
     },
     ratsWin: {
         text: 'The rats have been exterminated. You have earned your victory nap.',
         choice: ['Claim your well-earned rest on the solid mattress'],
         choiceId: ['sleepGooderShod'],
         memory: 'Exterminated the rats.'
     },
     sleepGooderShod: {
         text: "You sleep on your solid mattress. However tired you are, you feel slightly happier about your situation. You close your eyes, and feel a sense of mental wellness from your sleep. (+15 Healh)",
         maxHP: 15,
         choice: ['Head over to the tournament'],
         choiceId: ['tournReception'],
     }, 
     sleepShod: {
         text: "You go to bed, constantly being tormented by the small squeaks and shuffles across the floor. They never physically harm you, but you feel thier presence mentally. You wake up in the most unstable mental state you've ever been in (-15 energy).",
         maxEnergy: -15,
         choice: ['Head over to the tournament'],
         choiceId: ['tournReception'],
         memory: 'Sleeped a restless night.'
     },
     innInn: {
         text: "Your room is suprisingly comftorable, with your bed being soft on your back. Before you can fall asleep, someone knocks on your door. It's the room service. They came up to check if everything was alright, and after confirming, offer you the option for breakfast in the morning. For a mere 100 talons, you can have a high-protien meal. Eating some good food before battle would definitely be a good idea. Do you buy next morning's breakfast?",
         choice: ['Yes (-100 talons)', 'No'],
         choiceId: ['innBreakfast', 'innSleep'],
         talons: -150,
         memory: 'Stayed at the basic Inn.'
     },
     innBreakfast: {
         text: 'You wake up to the sound of knocking at your door. It\'s room service, with your hearty protien rich breakfast, scrabled eggs with a side of a 30-pound steak. Suprisingly, it was one of the best things you have ever had. (+10 hp and energy). \nIt takes around 7 minutes to eat it all. Once you take your last bite, you are ready to head out.',
         choice: ['Head over to the Colosseum'],
         choiceId: ['tournReception'],
         maxEnergy: 10,
         maxHP: 10,
         memory: 'Ate a hearty breakfast.'
     },
     innSleep: {
         text: "You wake up, feeling somewhat refreshed. Although hungry, you can always just get food later. All that's left now is to just go to the colosseum where they'll hold the tourney",
         choice: ['Head over to the Colosseum'],
         choiceId: ['tournReception'],
         memory: 'Slept in a little bit more than you should have.'
     },
     luxuryInn: {
         text: "You enter your room. The edge of the floor and walls shine with golden textures. The bed is so absorbant you almost fall asleep on the spot testing it out. Even better, they serve breakfast in the mornings for free! Although you'll have to get out of bed early to get it, it's likely worth it. \nWill you prioritize sleep or health?",
         choice: ['Sleep', 'Health'],
         choiceId: ['getSleep', 'getFood'],
         talons: -500,
        memory: 'Stayed at the luxury Inn.'
     },
     getSleep: {
         text: "You decide to go to bed, hoping to get more rest before your eventual slog to the tournament. As you woke up, you dont know excactly how much time had passed. \nWhat you do know, however, was that you feel amazing! (You gained 30 health and 10 energy)",
         maxEnergy: 30,
         maxHP: 10,
         choice: ['Head over to the tournament'],
         choiceId: ['tournReception'],
        memory: 'Slept in in the luxury Inn.'
     },
     getFood: {
         text: "You wake up, feeling anguished over the parting of a couple more hours of rest. However, all is completley forgotten as you find absolute luxury: An all-you-can-eat buffet! Seeing all of this food around you makes you feel greed.\n However, remembering why you came here in the first place, you come to a greater realization: You could resell this food to peasants to make more money \nAlthough it won't clear you of your debt, it could fund your eventual need to go to a shop. This Inn did cost a pretty penny, after all.",
         choice: ['Resell food to suckers', 'Just eat the food you paid for'],
         choiceId: ['foodScalper', 'buffetTime'],
        memory: 'Prioritized food over sleep at the luxury Inn.'
     },
     foodScalper: {
         text: "You are ready to set your new plan in action. You rush over to the best-looking food you could find, and snatched it right away, right out eyeshot of any staff who may cause a conflict with your plans. The bag is starting to get full, but still has room for more food. Do you dare risk it all for some more free food?",
         choice: ["MORE FOOD!", "Flee before you get caught"],
         choiceId: ['pushyScalper', 'fleeBuffet'],
     },
     buffetTime: {
         text: "You gorge yourself on the varying qualities of food they had to offer. For all you know, this might be your last meal, so might as well enjoy yourself. By the time your feeding rampage was over, you felt refreshed beyond compare.\n(You gained 30 health and 10 energy)",
         maxHP: 30,
         maxEnergy: 10,
         choice: ['Head over to the tournament'],
         choiceId: ['tournReception'],
        memory: 'Ate a lot of food at the buffet.'
     },
     fleeBuffet: {
         text: "You flee the buffet, right before security comes by to inspect people's bags. Once you get out, you start looking around for someone to sell your goods to. Luckily, you find some starving peasants and sell off your hot food for 300 talons.",
         talons: 300,
         choice: ["Head over to the tournament"],
         choiceId: ['tournReception'],
        memory: 'Fled the buffet with some free food.'
     },
     pushyScalper: {
         text: "You gobbled up more and more food into your food hole (backpack). Unfortanately for you, the staff has caught on! The Head Chef, furious over your disrespect of the buffet culture, is ready to lunge at you!",
         choice: ["Fight the Chef!"],
         choiceId: ["fightChef"]
     },
     fightChef: {
         type: 'battle',
         win: 'headChefWin',
         lose: 'gameOver'
     },
     headChefWin: {
         text: "You have successfully beat up the \"top dawg\" of this hotel's buffet. Unfortanately, this does mean you are now banned for life. You leave the hotel, and come across some homeless-looking guys. You are successfully able to pawn off your plundered luxury food for thier entire life savings. \n(You recieved 600 talons.)",
         choice: ['Head over to the tournament'],
         choiceId: ['tournReception'],
         talons: 600,
        memory: 'Beat up the head chef and sold the food for a profit.'
     },
     tournReception: {
         text: "You head over to the collosseum. It's very large, and imposes itself at the center of the town. At the front of the entrance is a small table, with a guide sitting there helping others. You go up to the guide, who explains the rules to you: \n 1.You will face off against 4 opponents in total \n 2. You may plunder the loser's pockets for talons\n 3.After a win, you can use one of your limited heals, visit the shop, and wait for your next opponent to finish up. 4. If you lose a match, you are out! \nAre you ready for your first battle?",
         choice: ['Go fight your first opponent!', 'Make a quick stop at the shop'],
         choiceId: ['preBattle1', 'pre1Shop']
     },
     preBattle1: {
         text: "You step into the center of the collosseum. The person there is looking around, like something on the barren ground will help him win. This fight seems like an easy one to win. All you need to do is put your previous experience to use and win.",
         choice: ['Fight!'],
         choiceId: ['sucker1']
     },
     pre1Shop: {
         type: 'shop',
         inventory: 'tournament',
         leave: 'tournReception',
     },
     sucker1: {
         type: 'battle',
         win: 'preFight2',
         lose: 'tournLoss'
     },
     prefight2: {
         text: 'You beat the guy with ease. As per the Epic Collosseum Rules, you are now allowed to rob him. \n (You got 250 talons) \n There is still some time before the next match. What will you do now?',
         choice: [`Use your heals`, 'Visit the shop', 'Enter your next battle'],
         choiceId: ['restorePoint1', 'shop1', 'battle2'],
         talons: 200
     },
     restorePoint1: {
         type: 'heal',
         text: 'Hp fully restored.',
         choice: ['Visit the shop', 'Enter the next battle'],
         choiceId: ['shop1', 'battle2']
     },
     shop1: {
         type: 'shop',
         inventory: 'tournament',
         leave: 'prefight2'
     },
     battle2: {
         text: "You step into the center of the collosseum. Your next opponent seems more confident than the spineless coward who you faced in the first round. From the looks of it, the next fight will be more difficult than the first. \nAre you ready?",
         choice: ["Fight!"],
         choiceId: ["fight2"]
     },
     fight2: {
         type: "battle",
         win: 'preBattle3',
         lose: 'tournLoss'
     },
     preBattle3: {
         text: 'You have taken down your second opponent. As per the Epic Collosseum Rules, you can rob him. \n(You borrowed 500 talons.) \nThere is still some time before your next match. What will you do now?',
         choice: [`Use your heals`, 'Visit the shop', 'Enter your next battle'],
         choiceId: ['restorePoint2', 'shop2', 'battle3'],
         talons: 200
     },
     restorePoint2: {
         type: 'heal',
         text: 'Hp fully restored.',
         choice: ['Visit the shop', 'Enter the next battle'],
         choiceId: ['shop2', 'battle3']
     },
     shop2: {
         type: 'shop',
         inventory: 'tournament',
         leave: 'prefight3'
     },
     prefight3: {
         text: "You come face-to-face with the next opponent. He is very large in stature, and looks directly through your soul. \nYou feel nervous. This fight won't be an easy one.",
         choice: ['Fight!'],
         choiceId: ['fight3']
     },
     fight3: {
         type: 'battle',
         win: 'preBattleFinal',
         lose: 'tournLoss'
     },
     preBattleFinal: {
         text: "Despite your inital expectations, you have won. You quickly rob him of his goods, as per the Epic Collosseum Rules, before he wakes up. \n(You heasantantly stole 750 talons) \nYou have some time before your final battle. What will you do?",
         talons: 750,
         choice: [`Use your heals`, 'Visit the shop', 'Enter your final battle'],
         choiceId: ['restorePoint3', 'shop4', 'battle4'],
     },
     restorePoint3: {
         type: 'heal',
         text: 'Hp fully restored.',
         choice: ['Visit the shop', 'Enter the next battle'],
         choiceId: ['shop4', 'battle4']
     },
     shop4: {
         type: 'shop',
         inventory: 'tournament',
         leave: 'preBattleFinal'
     },
     battle4: {
         text: 'You step out for the last time, wondering who could have won all 3 of his battles. To your suprise, it\'s someone you recognize. \n "I\'m suprised you made it this far..." \nThe old man stands in front of you. He still looks as old as ever, but also hardened by battle. \nThis last battle will be a challenge. Are you ready?',
         choice: ['Fight!'],
         choiceId: ['battle4Tourn']
     },
     battle4Tourn: {
         type: 'battle',
         win: 'tournWin',
         lose: 'oldTournLose'
     },
     tournWin: {
         text: "The old man has been defeated. He lays on the ground for a while, very deadish, but he rises up with some sort of glee in his eyes. \n \"I am amazed at your talents. You have won this fair and square!\"\nThe organaizers of the tournament come to you, and congratulate you on your newfound victory. They have come to ask you for your reward, which is one reasonable wish of your choosing. After all the struggle you have gone through, you decide that you wish for...",
         choice: ['Your debt to be cleared', 'A spot as a tournament organizer', 'A 72-ounce steak made entirely out of gold'],
         choiceId: ['retireEnd', 'organizerEnd', 'goldSteakEnd'],
         memory: 'Beat the old man at the tournament.'
     },
     retiredEnd: {
         text: 'You explain your situation to the organizers, and all the troubles you encountered on the way here. The organizers listen carefully. \n"Don\'t worry about your debt," One of the organizers state -- " I\'m pretty sure I know who you owe, and I\'ll make sure the debt is \'paid\' in full." You return home, now a freed man. You can live in peace, and go back to your roots as a humble peasant. However, the experience of fighting for your future has helped you feel a little braver.',
         choice: ['View your journey'],
         choiceId: ['results'],
         memory: 'Cleared your debt and retired back to your normal life.'
     },
     organizerEnd: {
         text: `The organizers aren\'t entirely shocked by your request. They gather around in a short circle of discussion, and come to thier conclusion after a couple of minutes of debate.\n"You seem to have what it takes. Welcome to the team. \nYou have now become a man of power. No debt can hold you back, and you live your life organizing tournaments that you join to show who's boss.`,
         choice: ['View your journey'],
         choiceId: ['results'],
        memory: 'Became a tournament organizer.'
     },
     goldSteakEnd: {
         text: 'The organizers, although reluctant, decide to humor your idea. After an unknown period of time, a chef comes out, golden steak in hand. You take your first bite. It tastes incredible. The juicy texture followed by the knowledge that you are effectively poisining yourself by eating gold leaves you with a tingly sort of feeling. \nYou get 12 ounces in before your heart starts to solidify. Not too long after, you pass out onto the floor, dead.\nAlthough you may not have lived a long life, you lived a happy one. \nThe collectors take the gold out of your stomach and sell it for the full amount of debt you own. By all means, you have won, even if it did mean losing your life doing something stupid.',
         choice: ['View your journey'],
         choiceId: ['results'],
         memory: 'Ate a golden steak at the tournament and died happy.'
     },
     oldTournLose: {
         text: '"To be honest, I expected more out of you." The old man says to your collapsed body. You have lost, and the organizers come over to the old man to congratulate him and ask him what he wanted for his prize.\n"Oh, a prize? I don\'t need one. Just the thrill of battle was enough for me." \nHe pulls out a smoke bomb, ready to escape the arena.',
         choice: ['Challenge him to a rematch', 'Let him go'],
         choiceId: ['pursureMan', 'letGo'],
         memory: 'Lost to the old man at the tournament.'
     },
     letGo: {
         text: "You let the desire for a rematch go, and let him escape, dissapearing in a cloud of smoke.",
         choice: ['Leave the tournament'],
         choiceId: ['tournLoss'],
     },
     tournLoss: {
         text: "You have blown your one shot at clearing your debt. No big deal. As you leave the tournament, exhausted, you have to start thinking about how to get out of this sticky situation. \n However, you come across two other guys, who may have the solution to your problems. \n Who do you talk to?",
         choice: ["Talk to the suspicous guy", "Talk to the crazy man"],
         choiceId: ['susManT', 'crazyMan'],
        memory: 'Lost the tournament.'
     },
     susManT: {
         text: '"Heey there! You looking for some easy cash?" The man exclaimed, almost too excitedly. \n Clearly this guy is either out of his mind or is trying to get you into something shady. Unfortanately, you don\'t have much of a say in terms of options.',
         choice: ['Follow him and his scheme', 'Go see if the other guy is less crazy'],
         choiceId: ['embarkCrime', 'crazyMan']
     },
     crazyMan: {
         text: 'You cautiously talk to the man and ask if he knows any good ways to make money. "Why not try the casino? I go there every day, and I just know it\'s gonna work out!" He said, cleary deluding himself. \nAlthough the man himself is crazy, the casino might be a good idea if you\'re lucky enough.',
         choice: ['Let\'s go gambling!', 'Go see if the suspicous guy is more stable'],
         choiceId: ['embarkGambling', 'susManT']
     },
     pursureMan: {
         text: '"Wait!" You exlaim, shocking the old man. "Please -- give me one more chance to prove myself as the superior lifeform." \n"You\'re nothing but a peasant who lost a fight for his future." The old man remarked - but not before considering your offer a little bit, even if it was to probably humble you a little bit more.\n"You know what, fine. Meet me up on the peak of the highest mountain here in Nexdor. I\'ll be waiting to see how strong you\'ll become." \nThe old man dissapears into a cloud of smoke, and you get up, ready for your chance at redemption. There\'s no backing out now.',
         choice: ['Head to the mountain', 'Make a quick stop at the shop'],
         choiceId: ['mountainStart', 'preMshop'],
         memory: 'Pursued the old man for a rematch on top of the mountain.'
     },
     preMshop: {
         type: 'shop',
         inventory: 'mountain',
         leave: 'mountainStart'
     },
     mountainStart: {
         text: "You start your trek up the mountain, ready for the challenges that await. The further you get up, the harder it is to breathe. \nTurns out, you aren't the only one on this path. A skeleton, presumably a former adventurer, draws near!",
         choice: ['Fight!'],
         choiceId: ['mountainSkelly']
     },
     mountainSkelly: {
         type: 'battle',
         win: 'midMountain',
         lose: 'gameOver'
     },
     midMountain: {
         text: 'The skeleton crumbles into dust, and is buried beneath the snow that has begun to form. You continue your way upwards.',
         choice: ['Continue'],
         choiceId: ['midMountain2']
     },
     midMountain2: {
         text: "You dont know excactly how long it's been, but its been long enough to where the sun has begun to set. You feel cold. Up ahead is a cabin. You don't know whose it is, but it's better than being out here.",
         choice: ['Make a short rest at the cabin (Restore HP and Energy)', 'Continue upwards'],
         choiceId: ['cabinRest', 'mountainHigh']
     },
     cabinRest: {
         text: "The cabin is warm, and very dusty. It's a safe bet to assume that no one has been here for a while. You close your eyes, and rest for a small amount of time. You feel refreshed.\nHowever, you can't forget why you're here. It's time to leave.",
         choice: ['Continue upwards'],
         choiceId: ['mountainHigh']
     },
     mountainHigh: {
         text: "Suprisingly, the higher up you went, the calmer you felt. Sure, the air was thinner, but that prevented any more monsters from being this high up. After a while, you finally see it. The peak, with the familiar sillouette of an old man. You finally have the chance to redeem yourself.",
         choice: ["Go for an ambush", "Yell at him"],
         choiceId: ['ambushMan', 'yellMan']
     },
     ambushMan: {
         text: "You charge at the man, fast but silent. At first, it seems to go to plan. However, right before your blade can make contact, he jumps, swiftly avoiding your blade. \nAs he lands, he arrogantly remarks: \"Was that really the best you could do?\" \nYour ambush has failed. However, it's still not over yet.",
         choice: ['Fight!'],
         choiceId: ['mountainMan'],
        memory: 'Tried to ambush the old man'
     },
     warnMan: {
         maxEnergy: 10,
         text: '"Old Man!" You exclaim, "I have come to regain my glory!" \nThe man turns around. "So you have." \nNo more words were exchanged, for both of you knew what you came next.',
         choice: ['Fight!'],
         choiceId: ['mountainMan'],
         memory: 'Yelled at the old man.'
     },
     mountainMan: {
         type: 'battle',
         win: ['mountainWinEnd'],
         lose: ['mountainLoserEnd']
     },
     mountainWinEnd: {
         text: 'You beat the old man, even with him not holding back. The old man seems shocked at first, but regains his composure.\n "I guess you\'ve beaten me." He says with some remorse. "Even though I technically never put anything on the line like you likely have, it would still feel wrong to not do anything for you as the loser of this duel. I\'ll see what I can do about your debt." You both come back down from the mountain, where you both part your seperate ways. \nTrue to his word, you later recieve a letter from Bill Gatesford III, saying that your debt was fully paid for. You feel satisfaction at your redemption. You now live your life freely, with the journey leaving a big mark. You become a gladiator that dominates tournaments all around, hoping to become someone the Old Man is proud of.',
         choice: ['View your journey'],
         choiceId: ["results"],
         memory: 'Beat the old man at the top of the mountain.'
     },
     mountainLoserEnd: {
         text: "You collapse from exaustion, accpeting your defeat. The old man says nothing, and dissapears in a cloud of smoke. You have become a failure, unable to redeem yourself from your previous blunders. \nYou decend the mountain, cursed to be a peasant forever in debt. \nYou live out your life in misery, as someone who was unable to accomplish anything",
         choice: ['View your end'],
         choiceId: ["results"],
         memory: 'Lost to the old man at the top of the mountain.'
     },
     //THE CRIME ROUTE
     susMan: {
         text: 'You approach the suspicous man, he tells of a man who can help you out, the Big Cheese they call him',
         choice: ['Go with him', 'Go talk to the passionate man', 'Go talk to the prideful man'],
         choiceId: ['embarkCrime', 'drugAddict', 'prideyMan']
     },

     embarkCrime: {
        text: 'You meet the Big Cheese and he turns around in his chair menacingly, he states: "I got a job for you, I need you to go out and collect some money for me, three houses down the road. Don\'t come back until you get all 3 of them. I dont care what you have to do to get them, as long as I get my fair share."',
        choice: ['Go do the job', 'Refuse the job'],
        choiceId: ['house1', 'refuse'],
        memory: 'Started working for the Big Cheese.'
     },

     refuse: {
        text: 'You refused the job, scared of getting a little dirty, and the Big Cheese promptly kicks you in the gut and out onto the street',
        choice: ['Go gambling at a casino', 'Go to nexdor in order to participate in the tournament'],
        choiceId: ['embarkGambling', 'embarkTournament'],
        maxHP: -20,
        memory: 'Refused to work for the Big Cheese and got kicked out onto the street.'
     },

     house1: {
        text: 'You knock on the person\'s home and then you ask them about money the borrowed from the Big Cheese. They tell you to go away, but you can\'t take no for an answer.',
        choice: ['Negotiate', 'Force them to give you the money', ],
        choiceId: ['negotiate', 'forcemoney']
     },

     forcemoney: {
        type: 'battle',
        win: 'house1brutal',
        lose: 'gameOver'
     },

     house1brutal: {
        text: 'The person is unconcoius of the floor. You take thier money and leave, not finding the time or effort to get some help for them.',
        trait: 'agressive',
        choice: ['Continue onward'],
        choiceId: ['moveHouse'],
        memory: 'Beat up the first guy on the Big Cheese\'s list and took his money.'
     },

     negotiate: {
        text: 'You negotiate with the person, and calm them down. They take a deep breath, and say you aren\'t as scary as you look. They give you the money, since you seem like a nice guy.',
        choice: ['Go to the next house'],
        choiceId: ['moveHouse'],
        memory: 'Peacefully negotiated with the first guy on the Big Cheese\'s list and got his money.'
     },

     moveHouse: {
        text: 'You leave the house, and start to make your way to the next one. You find your next target, who has already noticed you and is currently on guard. Your current method seems to work, so why not just do it again?',
        choice: ['Talk him into giving the money', 'Beat him up', 'Ditch this whole side job shtick'],
        choiceId: ['niceHouse', 'battleHouse2', 'ditchJob']
     },

     niceHouse: {
        text: 'Once again, you begin to talk to the man in a gentle manner. He lowers his guard, and listens to your reasoning. He seems genuinely touched, and hands over his money with only a sarcastic complaint about not being let off the hook.',
        choice: ['Speed over to the final house', 'Ditch this dirty work and do something else'],
        choiceId: ['niceHouse3', 'ditchJob']
     },

     niceHouse3: {
        text: 'You head over to the final house, which isn\'t as far as you originally thought it was. You come face to face with the final guy, who reacts to you with the same amount of skepticism as the previous guys. You talk to him until he opens up. He goes into his house, and after a bit, he comes back out with a bag full of things to pay off his debt.',
        choice: ['Return to the Big Cheese'],
        choiceId: ['quotaNice'],
        memory: 'Negotiated with all of your targets and got all the money without any violence.'
     },

     battleHouse2: {
        type: 'battle',
        win: 'beatUpGuy2',
        lose: 'gameOver'
     },

     beatUpGuy2: {
        text: 'You sucessfully managed to beat up the second guy on the Big Cheese\s list. The next house seems to be only a few times over, and surely the final guy wouldn\'t be any stronger than this citizen.',
        choice: ['Head on over', 'Ditch before you become a menace'],
        choiceId: ['finalHouseAggro', 'ditchJob']
     },

     finalHouseAggro: {
        text: 'You are already prepared for what you must do next. The target has not found you yet, and you can probably get a very good sneak attack in.',
        choice: ['Charge!'],
        choiceId: ['battleFinalHouse']
     },

     battleFinalHouse: {
        type: 'battle',
        win: 'finalHouseBattle',
        lose: 'gameOver'
     },

     finalHouseBattle: {
        text: 'You have sucesfully defeated the third and final guy. You can now return to the Big Cheese with some good news.',
        choice: ['Return'],
        choiceId: ['quotaAggro'],
        type: 'heal',
        memory: 'Beat up the people on the Big Cheese\'s list and got all the money.'
     },

     quotaAggro: {
        text: 'You have made it to the boss, with only a few minor scrapes along the way. \n When you step through the door, you immediately feel His presence.\n "So, you finished the job I gave you. I am grateful for your cooperation. At this rate, you might be cleared out of your debt in only a couple of years!"\nThis isn\'t really what you wanted for your life. However, it seems you\'ll be safe from your debt, at least as safe as an underling could be.',
        choice: ['Fight the Big Cheese', 'Accept your working conditions.'],
        choiceId: ['aggroMob', 'underlingEnd'],
        memory: 'Returned to the Big Cheese with all the money.'
     },

     aggroMob: {
        text: 'You stare down the boss, ready to charge, when an angry mob of citizens storm into the office. \n"You! Whatever your name is! We are tired of you beating up people, and we... No, the Big Cheese, will strike you down!"\nShockingly, it mattered not that the Big Cheese was the evil that put them in debt. At the very least, he was the lesser evil right now.',
        choice: ['Fight'],
        choiceId: ['HeroCheese'],
        memory: 'Fought the Big Cheese with an angry mob of citizens rooting for your downfall.'
     },

     heroCheese: {
        type: 'battle',
        win: ['overthrowEnding'],
        lose: ['townChudEnding']
     },

     overthrowEnding: {
        text: 'You have failed to overthrow the Big Cheese. Your conciousness fades, and as the crowd cheers at your death, you begin to feel remorse. You wonder if beating up people for thier money was justified, and if you acted a little kinder, if your ending would be different, somehow.',
        choice: ['View your results'],
        choiceId: ['results'],
        memory: 'Died trying to overthrow the Big Cheese.'
     },

     underlingEnd: {
        text: 'You have defeated the Big Cheese, who for a moment became a hero, and have now become the newest menace in town. The people all flee for thier lives as you come to realized this ungained potential.\nYou now have unlimited power. No debt collectors can stop you now. As you live out the rest of your days, you become one of the greediest and violent criminals to ever set foot in history.',
        choice: ['View your results'],
        choiceId: ['results'],
        memory: 'Became the new Big Cheese and lived out your days as a crime boss.'
     },

     quotaNice: {
        text: 'You have managed to come back unscathed. The Big Cheese admires your work, saying "I\'m impressed with how well you got the hang of this! At this rate you\'ll have your debt cleared in a couple of years!"\nEven though living as an underling might not be as bad as you may think, it would not be pleasant to work here for years. What should you do?',
        choice: ['Convince him to be more than a henchman', 'Fight your way out of the crime ring'],
        choiceId: ['persuasionEnd', 'happyMob'],
        memory: 'Returned to the Big Cheese with all the money.'
     },

     happyMob: {
        text: 'You ready yourself to take on an intimidating foe. Then, something completely unexpected happens:\n A crowd of people are bursting through the door in what seems to be an angry mob. They are sick of the Big Cheese bossing them around, and start to weaken him, all to the point where finishing the job will be easy.',
        choice: ['Finish the Job!'],
        choiceId: ['smallCheese'],
        memory: 'Fought the Big Cheese with an angry mob of citizens rooting for your victory.'
     },

     smallCheese: {
        type:'battle',
        win: 'heroEnd',
        lose: 'despairEnd'
     },

     heroEnd: {
        text: 'The Big Cheese falls onto the ground, becoming Small Cheese. The crowd erupts in excitement, praising you as a hero of this town. As it turns out, the Big Cheese is the one carrying out your debt, so knocking him out of power also knowed your debt out of your hands.\nRevered as a hero who saves the day, you live out a pleasant life where you are at peace, helping strangers with any trouble they face.',
        choice: ['See your journey'],
        choiceId:['results'],
        memory: 'Overthrew the Big Cheese with the help of an angry mob and became a hero.'
     },

     depsairEnd: {
        text: 'You fall into deep slubmer. The townsfolk become afraid of what\'s to come and quickly flee the scene. \nThe Big Cheese imposes over you: "Did you really think you could take out THE Big Cheese? Well, you were sorely mistaken, and now I will remain in power while you will rest forever."\nTired from your defeat, you fall into a deep slumber, never to wake back up.',
        choice: ['See your journey'],
        choiceId: ['results'],
        memory: 'Died trying to overthrow the Big Cheese with the help of an angry mob.'
     },

     persuasionEnd: {
        text: '"Hold on." You say to the Big Cheese, "I\'m sure there\'s a lot better uses you could use me for than simple henchman work. Why don\'t I come work for you for your more \'difficult\' jobs".\nAlthough the Big Cheese hesitates, he eventually decided on taking you under his wing as a right-hand man. You have sucessfully gotten a more powerful position, and although you have to work under his wing for years to come, you have at the very least become a powerful henchman, able to live out the rest of your days doing skechy work to make a living.',
        choice: ['See your journey'],
        choiceId: ['results'],
        memory: 'Negotiated for a peaceful but boring henchman position under the Big Cheese.'
     },

     ditchJob: {
        text: 'You abandon the mind-numbing duties of being a victim of gang crime. You could see if the Big Cheese would be willing to find oyu another job, or just try to gamble or participate in some kind of tournament.\n What should you do?',
        choice: ['Go see what\'s up with the boss', 'Go gamble your way out of debt', 'Go to Nexdor, the town where battling tournaments are frequent.'],
        choiceId: ['unquotaAggro', 'embarkGambling', 'embarkTournament'],
        memory: 'Ditched the Big Cheese'
     },

     unquotaAggro: {
        text: 'You return to the Big Cheese, claiming that the people ran away. However, seeing some bruises from your battles, the Big Cheese becomes furious. He thinks that you got beaten up by the residents, and gives you a choice: \nFight him and prove you aren\'t weak, or leave this establishment and never come back.',
        choice: ['Fight', 'Never come back'],
        choiceId: ['angryBoss', 'kickedCrime'],
        memory: 'Returned to the Big Cheese after ditching the job.'
     },

     angryBoss: {
        type: 'battle',
        win: 'takeOverEnd',
        lose: 'gameOver'
     },

     takeOverEnd: {
        text: 'Suprisingly, you defeated the provoked Big Cheese. He falls to the floor, but slowly gets up and leaves without a word. It seems like he has given up his life as a crime boss, which seems good. You decide to become the new boss. You order around henchlings to do good for the community instead of exploiting the townsfolk. Suprisingly, this appears to be the most effective method of town rennovations. You live your life busy, but very important to your city\'s growth.',
        choice: ['View your results'],
        choiceId: ['results'],
        memory: 'Defeated the Big Cheese and reformed his crime ring.'
     },

     unquotaNice: {
        text: 'You return to the Big Cheese empty handed, saying that you don\'t think you\'re cut out for this kind of work. He gives an understanding, but still frustrated, nod, and says that you can either get out of his establishment nicely or he\'ll have to remove you with force',
        choice: ['Leave nicely', 'Forcefully, please!'],
        choiceId: ['kickedCrime', 'angryBoss'],
        memory: 'Returned to the Big Cheese after ditching the job.'
     },

     kickedCrime: {
        text: 'You have been kicked out of the Big Cheese\'s gang. There are realistically only two options left for you do do: go gambling, or head over to Nexdor, where tournaments are held for prize money.',
        choice: ['Gambling! Gambling!', 'Battle for honor, and for money'],
        choiceId: ['embarkGambling', 'embarkTournament'],
        memory: 'Kicked out of the Big Cheese\'s gang.'
     },
    
     //THE GAMBLING ROUTE
     drugAddict: {
         text: 'you talk to the passionate man and ask him if he has any ideas on how to get out of your debt. he then tells you about the casino, the casino might be a good idea if you\'re lucky enough.',
         choice: ['Let\'s go gambling!', 'Go see if the suspicous guy is more stable', 'go see how prideful the prideful man is'],
         choiceId: ['embarkGambling', 'susMan', 'prideyMan']
     },
     embarkGambling: {
         text: 'You decide to go to the casino, hoping to get lucky and win some money. You eneter the casion greeted by the smell of cigaretttes and the sound of people cheering ad groaning. You look around and everything is taken except for one table that\'s glowing. it is blackjack. You decide to play it, hoping to win some money.',
         choice: ['Play Blackjack'],
         choiceId: ['blackjack'],
         memory: 'Started gambling at the casino.'
     },
     blackjack: {
         type: 'blackjack',
         win: 'blackjackWin',
         lose: 'blackjackLose'
     },
     blackjackWin: {
         text: 'You win at blackjack! You win 5000 talons, You decide to keep playing, hoping to win more.',
         choice: ['Play again', 'go upgrade your luck'],
         choiceId: ['blackjack', 'luckUpgrade'],
         talons: 5000,
         memory: 'Won at blackjack.'
     },
     blackjackLose: {
         text: 'You lose at blackjack. You lose 20 talons, but you decide to keep playing, hoping to win it back.',
         choice: ['Play again', 'go upgrade your luck'],
         choiceId: ['blackjack', 'luckUpgrade'],
         talons: -2000,
         memory: 'Lost at blackjack.'
     },
     luckUpgrade: {
         type: 'shop',
         inventory: 'luck',
         leave: 'embarkGambling'
     },
     keepWinning: {
         text: 'The casino boss eyes you with a mix of fear and respect. "You\'re on a roll, aren\'t you?" he says, his voice tinged with both admiration and concern. "Keep it up, and you might just clean me out!" You can\'t help but feel a surge of confidence as you continue to win hand after hand. The thrill of victory is intoxicating, and you find yourself unable to stop. The casino is now your playground, and you\'re determined to make the most of it.',
         choice: ['Play again', 'go upgrade your luck'],
         choiceId: ['blackjack', 'luckUpgrade'],
         talons: 5000,
         memory: 'Caught the attention of the casino boss.'
     },
     blackjackLose2: {
         text: 'You lose at blackjack. You lose 200 talons, and the casino guards have had enough. They grab you and throw you out of the casino, banning you for life. You have lost your chance at clearing your debt, and now you have to find another way to get out of this mess.',
         choice: ['Go participate in a tournament', 'Go find a crime boss to work under'],
         choiceId: ['embarkTournament', 'embarkCrime'],
         memory: 'Kicked out of the casino.'
     },
     blackjackWin3: {
         text: 'The boss had enough and decides to grab you and says to get out but you tell him no strating a fight between him and you.',
         choice: ['Fight the boss!'],
         choiceId: ['fightBoss'],
         memory: 'Confronted the casino boss.'
     },
     fightBoss: {
         type: 'battle',
         win: 'fightBossWin',
         lose: 'blackjackLose2'
     },
     fightBossWin: {
         text: 'You defeat the casino boss in a fierce battle! The casino guards, seeing their leader defeated, quickly retreat, leaving you standing victorious in the middle of the casino floor. The boss, now at your mercy, offers you a deal. "You win," he says begrudgingly. "I\'ll clear your debt, but you have to leave and never come back."  of triumph. or you can end him and take over the casino, becoming the new boss. The choice is yours.',
         choice: ['Accept the deal and leave', 'End the boss and take over the casino'],
         choiceId: ['acceptDeal', 'endBoss'],
         memory: 'Defeated the casino boss.'
     },
     acceptDeal: {
         text: 'You accept the deal, and the casino boss clears your debt. You leave the casino, now a free man, but you can\'t help but feel a sense of accomplishment. You may have lost the battle, but you won the war. You now have a new lease on life, and you\'re determined to make the most of it.',
         choice: ['View your journey'],
         choiceId: ['results'],
         memory: 'Accepted the casino boss\'s deal to clear your debt.'
     },
     endBoss: {
         text: 'You decide to end the boss, taking over the casino for yourself. With the boss out of the way, you quickly establish yourself as the new leader of the casino. You run it with an iron fist, making sure to keep your patrons in line and your profits high. The casino becomes a thriving business under your leadership, and you\'re able to clear your debt in no time. You now have a new goal in life: to make the casino the best it can be, and to ensure that no one ever crosses you again.',
         choice: ['View your journey'],
         choiceId: ['results'],
         memory: 'Ended the casino boss and took over the casino.'
     },
 
     error: {
         text: "This text is an error, likely due to a forgotten path. Please report this to Jacob/Elic.",
         choice: ['Just run it back...'],
         choiceId: ['results'],
         memory: 'Hit an error in the story.'
     },
     gameOver: {
         text: 'You have died. Try again?',
         choice: ['View your journey'],
         choiceId: ['results'],
         memory: 'Died.'
     },
     dimensionSwordEnd: {
         text: 'From the depths of your Pants Hole, you pull out the Dimension Sword, a sword made from the 7 Dimension Shards. You valiantly take down your greedy and evil opponents, who fall with one strike. You are still in debt, but you have become the Debt Hero. You now have a new goal in life: save your fellow citizens from the evils of capitalism. You live out your days as a warrior who helps out many people, mostly for the better',
         choice: ['View your journey'],
         choiceId: ['results'],
         memory: 'Pulled out the Dimension Sword and became the Debt Hero.'
     },
     results: {
        type: 'results',
        choice: ['Return to where it all began'],
        choiceId: ['start'],
     },
 }