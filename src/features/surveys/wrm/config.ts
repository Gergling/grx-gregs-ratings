const ARCHETYPES = {
  mage: 'Mage',
  rogue: 'Rogue',
  warrior: 'Warrior',
} as const;

export type ArchetypeKey = keyof typeof ARCHETYPES;

export const ARCHETYPE_KEYS = Object.keys(ARCHETYPES) as ArchetypeKey[];

type WRMConfigQuestion = {
  title: string; // Inherit from surveyjs type, ideally.
} & {
  [K in ArchetypeKey]: string;
};

export type WRMQuestion = {
  // They're all going to be radiogroups.
  type: 'radiogroup';

  // TODO: Probably fairly standard, and should ideally be inherited from surveyjs, when there's time to look it up.
  name: string;
  title: WRMConfigQuestion['title'];
  choices: {
    value: ArchetypeKey;
    text: string;
  }[];
};

export const questionToWRMQuestion = ({ title, ...question }: WRMConfigQuestion, idx: number): WRMQuestion => ({
  type: 'radiogroup',
  name: `wrm-question-${idx}-${title}`,
  title,
  choices: Object.entries(question).map(
    ([value, text]): WRMQuestion['choices'][0] => ({
      value: value as ArchetypeKey,
      text,
    })
  ),
});

// TODO: Put the questions in here.
export const config: WRMConfigQuestion[] = [
  {
    title: "You have a paper jam in the office printer.",
    warrior: "Call the IT department and report the broken equipment, requesting that they fix it. Nod to yourself in a self-satisfied manner, knowing you have resolved the problem in accordance with technical protocol.",
    rogue: "Send the document to another department's printer and claim it's for an urgent meeting. Don't forget to compliment their accessorisation.",
    mage: "Carefully open the printer, remove the jammed paper, and re-feed it into the machine in a manner that re-educates the device about its purpose.",
  },
  {
    title: "The person next to you on the bus is having a very loud, annoying conversation on the phone.",
    warrior: "You politely but firmly ask them to lower their voice as it's disturbing other passengers.",
    rogue: "You start a fake phone call of your own, speaking loudly about a sensitive business deal to drown them out.",
    mage: "You focus intently on the physical object of their phone, trying to mentally disrupt its wireless signal.",
  },
  {
    title: "You are assembling a piece of flat-pack furniture and a crucial screw is missing from the box.",
    warrior: "You box it all back up and drive to the store to get a replacement kit or a refund.",
    rogue: "You go to a neighbour's house, ask to borrow a toolbox, and 'accidentally' leave with a similar-looking screw.",
    mage: "You re-evaluate the design and use a combination of string, a paperclip, and a thumbtack to create a more structurally sound connection.",
  },
  {
    title: "A relative gives you a terrible gift that you would never use.",
    warrior: "You tell them thank you, but later you will politely explain that it's not for you and ask if you can exchange it.",
    rogue: "You praise the gift excessively, then list it for sale on an auction site before you even get home.",
    mage: "You thank them and explain that the item has a 'beautiful energy' and can be repurposed for a completely different function you have in mind.",
  },
  {
    title: "Your neighbour is having a loud party late at night, and you have to get up early.",
    warrior: "You go over and knock on their door to ask them to keep the noise down.",
    rogue: "You anonymously report them to the local council's noise complaint line.",
    mage: "You create a sound-absorbing pillow fortress and listen to a recording of white noise, focusing your thoughts on peace and quiet until you fall asleep.",
  },
  {
    title: "Your work computer is running incredibly slowly.",
    warrior: "You submit a ticket to the IT help desk with a detailed description of the problem and your system specs.",
    rogue: "You download an unauthorised system 'accelerator' software from the internet and run it in the background.",
    mage: "You open the Task Manager and stare at the list of processes, mentally willing the most resource-intensive ones to close.",
  },
  {
    title: "The waiter brings you the wrong dish at a restaurant.",
    warrior: "You tell the waiter it's the wrong order and ask them to bring what you originally requested.",
    rogue: "You start eating it anyway, and if they come by to check on you, you tell them it’s 'almost right' and get a free dessert.",
    mage: "You imagine the ingredients of the correct dish, visualising it as you consume the one in front of you.",
  },
  {
    title: "You have to give an impromptu speech in front of a large group of people.",
    warrior: "You take a deep breath, walk to the front, and confidently speak what you know to be true.",
    rogue: "You deflect the request, telling the person next to you that they have 'more experience' and would be better suited to the task.",
    mage: "You quickly analyse the crowd, identifying a pattern of shared anxieties, then deliver a speech filled with abstract metaphors to bypass their logical defenses.",
  },
  {
    title: "You are locked out of your flat.",
    warrior: "You call a locksmith to come and open the door for you.",
    rogue: "You climb through a less secure window on the ground floor, hoping nobody sees you.",
    mage: "You sit down in front of the door, concentrate, and visualise your key turning in the lock, hoping to manifest the correct sequence of events.",
  },
  {
    title: "A car in front of you is driving well below the speed limit on a single-lane road.",
    warrior: "You follow them patiently, maintaining a safe distance, as it is the correct and lawful thing to do.",
    rogue: "You overtake them quickly and illegally on the first straight section of road you can find.",
    mage: "You put on music with a specific rhythm that you hope will subtly influence the other driver's subconscious mind into speeding up.",
  },
  {
    title: "The coffee machine at work is broken and you have a meeting in five minutes.",
    warrior: "You go to the kitchen to boil water and make instant coffee, as it is the fastest conventional way to get a drink.",
    rogue: "You go to the corner shop and buy a coffee, but tell your manager you were caught in traffic.",
    mage: "You sit by the coffee machine and, using the power of your mind, try to re-route the internal circuits and repair it telekinetically.",
  },
  {
    title: "You spill a drink on your friend's carpet at their house.",
    warrior: "You immediately get on your hands and knees and start scrubbing it with a cloth, apologising profusely.",
    rogue: "You try to cover the stain with a throw pillow or a piece of furniture and pretend nothing happened.",
    mage: "You explain to your friend that it's a blessing in disguise, as the stain is now an abstract representation of your enduring friendship.",
  },
  {
    title: "There's an awkward silence at a social gathering you're attending.",
    warrior: "You break the silence by asking everyone a direct and simple question about their day.",
    rogue: "You quickly look at your phone, making it seem like you're responding to an urgent message.",
    mage: "You close your eyes and focus on the collective mood of the room, attempting to shift the energy by thinking about an interesting topic.",
  },
  {
    title: "The wifi at a coffee shop you're in is so slow it's unusable.",
    warrior: "You go to the counter and politely ask if they can reset the router.",
    rogue: "You connect to your neighbour's unsecure network without their permission.",
    mage: "You open your laptop, stare at the router, and run a series of complex network diagnostics, trying to understand and manipulate the data flow.",
  },
  {
    title: "You're on a crowded train and can't find a seat.",
    warrior: "You stand up and hold the handrail, accepting the situation as it is and waiting for the next station.",
    rogue: "You loudly fake a cough and sniffle, hoping a seated passenger will get up to distance themselves from your 'illness'.",
    mage: "You close your eyes and meditate, creating a mental space around yourself that is completely empty and peaceful.",
  },
  {
    title: "Your flatmate consistently leaves a mess in the kitchen.",
    warrior: "You confront your flatmate directly and ask them to clean up after themselves.",
    rogue: "You put all of their dirty dishes in their bed as a passive-aggressive hint.",
    mage: "You draw a diagram of a clean kitchen on the fridge with a marker and leave it there, hoping to change their energy and habits.",
  },
  {
    title: "You can't find your keys just as you're about to leave the house.",
    warrior: "You methodically retrace your steps and check all of the logical places they could be.",
    rogue: "You go through your housemate's belongings to see if they've accidentally picked them up.",
    mage: "You close your eyes and mentally 'scan' the house, hoping to get a psychic feeling for where they are.",
  },
  {
    title: "You're stuck in a very long queue at the post office.",
    warrior: "You wait patiently, knowing that your turn will eventually come.",
    rogue: "You pretend you're meeting someone who is already at the front of the line, and you go to join them.",
    mage: "You watch the people ahead of you, trying to calculate the probability of when you will reach the front.",
  },
  {
    title: "You have a flat tyre on your bicycle far from home.",
    warrior: "You pull out your tyre repair kit and methodically fix it on the side of the road.",
    rogue: "You hitchhike with a passing driver, making up a story about a family emergency.",
    mage: "You inflate the tyre with a small pump and then spend the ride home visualising the rubber and air molecules working together to keep it inflated.",
  },
  {
    title: "You find a bad online review of a small business you own.",
    warrior: "You respond to the review professionally, addressing their concerns and offering to resolve the issue.",
    rogue: "You create a fake account and post several highly positive reviews to offset the negative one.",
    mage: "You try to find a pattern in their wording and search history to understand the 'vibe' they put out in the world, and why they might have targeted you.",
  },
  {
    title: "You've just found a library book you checked out years ago, and it's long overdue.",
    warrior: "You return the book immediately and pay the fine, as it is the right thing to do.",
    rogue: "You leave the book in a park, hoping someone else will find it and return it for you.",
    mage: "You look at the book and the library card, sensing a deep metaphysical connection between the two objects, and wonder why the universe kept them separate for so long.",
  },
  {
    title: "You're in a very boring work meeting that seems to be going nowhere.",
    warrior: "You suggest a clear agenda for the rest of the meeting to get it back on track.",
    rogue: "You discreetly pull out your phone and scroll through social media under the table.",
    mage: "You find a pattern in the way people are speaking and try to predict the next word or phrase they will say.",
  },
  {
    title: "Someone gives you unsolicited advice on how to do your job.",
    warrior: "You thank them for their input but firmly state that you have your own method that you are following.",
    rogue: "You act as if you're listening, but you have no intention of changing your approach.",
    mage: "You analyse their advice in terms of its theoretical framework, debating whether its underlying principles are sound or not.",
  },
  {
    title: "Your television remote stops working for no apparent reason.",
    warrior: "You replace the batteries and, if that doesn't work, you go out and buy a new remote.",
    rogue: "You hide the remote and tell your family it's lost, so you have an excuse to get a new one.",
    mage: "You open up the remote and examine the internal circuit board, hypothesising about a tiny electromagnetic anomaly.",
  },
  {
    title: "You've lost your wallet on your way home.",
    warrior: "You immediately call your bank to cancel your cards and report it to the police.",
    rogue: "You post a 'lost wallet' message on a local social media group, leaving out a detail so that only the real finder can claim it.",
    mage: "You walk the path you took home, visualising the wallet's location and hoping to feel a 'pull' towards it.",
  },
  {
    title: "Unexpected guests show up at your house right when you're about to leave.",
    warrior: "You politely explain that you have to go and arrange a time to get together with them later.",
    rogue: "You pretend you have an emergency phone call and slip away while they're distracted.",
    mage: "You sit them down and have a conversation about the nature of time and destiny, and how their arrival was an inevitable cosmic event.",
  },
  {
    title: "A traffic light at a major intersection is broken and everyone is confused about who has the right of way.",
    warrior: "You follow the rules of the road as if it's a four-way stop sign, waiting for your turn.",
    rogue: "You inch your car forward until you are a third of the way through the intersection and block a lane, forcing others to yield to you.",
    mage: "You look at the flow of traffic, trying to understand the collective consciousness of the drivers, and then move in a way that is mathematically most likely to succeed.",
  },
  {
    title: "You are working on a project with a tight deadline and it looks like you won't finish in time.",
    warrior: "You pull an all-nighter to finish it on time, knowing that you committed to the deadline.",
    rogue: "You intentionally submit a corrupted file so you can ask for an extension.",
    mage: "You refactor the code to remove all non-essential features, making the project simpler but also theoretically more efficient.",
  },
  {
    title: "A customer is being unreasonable and yelling at you.",
    warrior: "You remain calm and professional, following the company policy for dealing with difficult customers.",
    rogue: "You subtly lead them to another colleague's desk, telling them that person is the 'specialist' in their issue.",
    mage: "You listen to their words, but you are not truly hearing them. Instead, you are looking for the underlying logical fallacy in their argument.",
  },
  {
    title: "An email chain at work is getting out of control with too many 'reply all' messages.",
    warrior: "You start a new email to the group and clearly state that all further replies should be directed to a different thread or channel.",
    rogue: "You reply-all with a message saying 'unsubscribe' to the entire group.",
    mage: "You create a script that filters all emails from the thread and sends them directly to a 'junk' folder, creating a digital force field around your inbox.",
  },
];

export const QUESTIONS_WRM: WRMQuestion[] = config.map(questionToWRMQuestion);
// type QuestionName = typeof QUESTIONS_WRM
