/**
 * 365-day reading plan content.
 * Another agent will fill explanation and reflectionPrompts for stub entries.
 * Keep LiturgicalSeason in sync with lib/liturgicalSeason.ts.
 */

import type { LiturgicalSeason } from "@/lib/liturgicalSeason";

export type { LiturgicalSeason };

export type ReadingDaySeed = {
  dayIndex: number;
  season: LiturgicalSeason;
  bibleReference: string;
  passageText: string;
  explanation: string;
  reflectionPrompts: string[];
};

// ----- Sample entries (days 1–7): full content for different seasons -----

const sampleAdvent = {
  dayIndex: 1,
  season: "ADVENT" as const,
  bibleReference: "Isaiah 40:1–5",
  passageText:
    "1 Comfort, comfort my people, says your God. 2 Speak tenderly to Jerusalem, and cry to her that her warfare is ended, that her iniquity is pardoned, that she has received from the Lord's hand double for all her sins. 3 A voice cries: 'In the wilderness prepare the way of the Lord; make straight in the desert a highway for our God. 4 Every valley shall be lifted up, and every mountain and hill be made low; the uneven ground shall become level, and the rough places a plain. 5 And the glory of the Lord shall be revealed, and all flesh shall see it together, for the mouth of the Lord has spoken.'",
  explanation:
    "Comfort and preparation mark Advent. This passage invites us to clear the way for God—in our hearts and in our days. The promise of glory revealed is both future and present when we make space for it.",
  reflectionPrompts: [
    "What would 'making straight a highway' look like in your schedule or relationships this week?",
    "Where do you most need comfort or preparation right now?",
  ],
};

const sampleChristmas = {
  dayIndex: 2,
  season: "CHRISTMAS" as const,
  bibleReference: "Luke 2:1–14",
  passageText:
    "1 In those days a decree went out from Caesar Augustus that all the world should be registered. 2 And Joseph also went up from Galilee, from the town of Nazareth, to Judea, to the city of David, which is called Bethlehem, because he was of the house and lineage of David, 5 to be registered with Mary, his betrothed, who was with child. 6 And while they were there, the time came for her to give birth. 7 And she gave birth to her firstborn son and wrapped him in swaddling cloths and laid him in a manger, because there was no place for them in the inn. 8 And in the same region there were shepherds out in the field, keeping watch over their flock by night. 9 And an angel of the Lord appeared to them, and the glory of the Lord shone around them, and they were filled with great fear. 10 And the angel said to them, 'Fear not, for behold, I bring you good news of great joy that will be for all the people. 11 For unto you is born this day in the city of David a Savior, who is Christ the Lord. 12 And this will be a sign for you: you will find a baby wrapped in swaddling cloths and lying in a manger.' 13 And suddenly there was with the angel a multitude of the heavenly host praising God and saying, 14 'Glory to God in the highest, and on earth peace among those with whom he is pleased!'",
  explanation:
    "The birth of Jesus is announced to shepherds—ordinary people going about their work. God’s good news still comes to us in the middle of our ordinary lives, not only in special moments.",
  reflectionPrompts: [
    "When have you experienced something holy in an ordinary moment?",
    "Who in your life might need a word of 'good news' today?",
  ],
};

const sampleLent = {
  dayIndex: 3,
  season: "LENT" as const,
  bibleReference: "Matthew 4:1–11",
  passageText:
    "1 Then Jesus was led up by the Spirit into the wilderness to be tempted by the devil. 2 And after fasting forty days and forty nights, he was hungry. 3 And the tempter came and said to him, 'If you are the Son of God, command these stones to become loaves of bread.' 4 But he answered, 'It is written, \"Man shall not live by bread alone, but by every word that comes from the mouth of God.\"' 5 Then the devil took him to the holy city and set him on the pinnacle of the temple 6 and said to him, 'If you are the Son of God, throw yourself down...' 9 And he said to him, 'All these I will give you, if you will fall down and worship me.' 10 Then Jesus said to him, 'Be gone, Satan! For it is written, \"You shall worship the Lord your God and him only shall you serve.\"' 11 Then the devil left him, and behold, angels came and were ministering to him.",
  explanation:
    "Jesus is tested in the wilderness after his baptism. Temptation meets him in real, practical ways. His responses show that Scripture and dependence on God are the foundation for resisting what would pull us off course.",
  reflectionPrompts: [
    "What temptation or distraction is most real for you in this season?",
    "What practice or truth helps you stay grounded when you're tired or stressed?",
  ],
};

const sampleEaster = {
  dayIndex: 4,
  season: "EASTER" as const,
  bibleReference: "John 20:19–23",
  passageText:
    "19 On the evening of that day, the first day of the week, the doors being locked where the disciples were for fear of the Jews, Jesus came and stood among them and said to them, 'Peace be with you.' 20 When he had said this, he showed them his hands and his side. Then the disciples were glad when they saw the Lord. 21 Jesus said to them again, 'Peace be with you. As the Father has sent me, even so I am sending you.' 22 And when he had said this, he breathed on them and said to them, 'Receive the Holy Spirit. 23 If you forgive the sins of any, they are forgiven them; if you withhold forgiveness from any, it is withheld.'",
  explanation:
    "The risen Jesus appears to his disciples and breathes peace and the Holy Spirit on them. New life isn’t only for later—it starts here, in forgiven and forgiving community.",
  reflectionPrompts: [
    "Where do you need peace or the courage to forgive today?",
    "How might you extend 'peace' to someone else this week?",
  ],
};

const sampleOrdinary1 = {
  dayIndex: 5,
  season: "ORDINARY" as const,
  bibleReference: "Matthew 5:1–12",
  passageText:
    "1 Seeing the crowds, he went up on the mountain, and when he sat down, his disciples came to him. 2 And he opened his mouth and taught them, saying: 3 'Blessed are the poor in spirit, for theirs is the kingdom of heaven. 4 Blessed are those who mourn, for they shall be comforted. 5 Blessed are the meek, for they shall inherit the earth. 6 Blessed are those who hunger and thirst for righteousness, for they shall be satisfied. 7 Blessed are the merciful, for they shall receive mercy. 8 Blessed are the pure in heart, for they shall see God. 9 Blessed are the peacemakers, for they shall be called sons of God. 10 Blessed are those who are persecuted for righteousness' sake, for theirs is the kingdom of heaven. 11 Blessed are you when others revile you and persecute you and utter all kinds of evil against you falsely on my account. 12 Rejoice and be glad, for your reward is great in heaven.'",
  explanation:
    "The Beatitudes turn common expectations upside down: the poor in spirit, the meek, and those who mourn are called blessed. God’s kingdom values are different from the world’s—and they offer a steady hope.",
  reflectionPrompts: [
    "Which beatitude speaks most to your life right now?",
    "How could you live out one of these values in a small way today?",
  ],
};

const sampleOrdinary2 = {
  dayIndex: 6,
  season: "ORDINARY" as const,
  bibleReference: "Psalm 23:1–6",
  passageText:
    "1 The Lord is my shepherd; I shall not want. 2 He makes me lie down in green pastures. He leads me beside still waters. 3 He restores my soul. He leads me in paths of righteousness for his name's sake. 4 Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me. 5 You prepare a table before me in the presence of my enemies; you anoint my head with oil; my cup overflows. 6 Surely goodness and mercy shall follow me all the days of my life, and I shall dwell in the house of the Lord forever.",
  explanation:
    "A psalm of trust: the Lord as shepherd leads, restores, and stays close even in dark valleys. This imagery has comforted countless people through difficulty and change.",
  reflectionPrompts: [
    "What 'green pastures' or 'still waters' do you need to accept or seek today?",
    "When have you felt God’s presence in a difficult time?",
  ],
};

const sampleOrdinary3 = {
  dayIndex: 7,
  season: "ORDINARY" as const,
  bibleReference: "Romans 8:31–39",
  passageText:
    "31 What then shall we say to these things? If God is for us, who can be against us? 32 He who did not spare his own Son but gave him up for us all, how will he not also with him graciously give us all things? 33 Who shall bring any charge against God's elect? It is God who justifies. 34 Who is to condemn? Christ Jesus is the one who died—more than that, who was raised—who is at the right hand of God, who indeed is interceding for us. 35 Who shall separate us from the love of Christ? Shall tribulation, or distress, or persecution, or famine, or nakedness, or danger, or sword? 37 No, in all these things we are more than conquerors through him who loved us. 38 For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers, 39 nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord.",
  explanation:
    "Paul declares that nothing can separate us from God’s love—not trouble, not the future, not any power. This assurance is meant to shape how we face each day.",
  reflectionPrompts: [
    "What sometimes makes you doubt that you are loved or secure?",
    "How might you act differently today if you fully believed this promise?",
  ],
};

// ----- Stub helper: one entry with empty explanation and prompts -----
function stub(
  dayIndex: number,
  season: LiturgicalSeason,
  bibleReference: string
): ReadingDaySeed {
  return {
    dayIndex,
    season,
    bibleReference,
    passageText: "",
    explanation: "",
    reflectionPrompts: [],
  };
}

// ----- Advent readings (dayIndex 8–24) -----
const adventEntries: ReadingDaySeed[] = [
  {
    dayIndex: 8,
    season: "ADVENT",
    bibleReference: "Isaiah 9:2–7",
    passageText:
      "2 The people who walked in darkness have seen a great light; those who dwelt in a land of deep darkness, on them has light shone. 3 You have multiplied the nation; you have increased its joy... 6 For to us a child is born, to us a son is given; and the government shall be upon his shoulder, and his name shall be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace. 7 Of the increase of his government and of peace there will be no end.",
    explanation:
      "Isaiah describes people walking in darkness who see a great light as God promises a child who will reign with justice and peace. Advent invites us to name the darkness in and around us and to look for the light God is already bringing through Jesus. One practical step: name one place where you feel stuck or overwhelmed and consciously invite Christ's light into that situation today.",
    reflectionPrompts: [
      "Where do you feel most 'in the dark' right now?",
      "What would it look like to invite Christ's light into that situation today?",
    ],
  },
  {
    dayIndex: 9,
    season: "ADVENT",
    bibleReference: "Micah 5:2–5a",
    passageText:
      "2 But you, O Bethlehem Ephrathah, who are too little to be among the clans of Judah, from you shall come forth for me one who is to be ruler in Israel, whose coming forth is from of old, from ancient days. 3 Therefore he shall give them up until the time when she who is in labor has given birth... 4 And he shall stand and shepherd his flock in the strength of the Lord... 5a And he shall be their peace.",
    explanation:
      "Micah points to Bethlehem, small among the clans of Judah, as the place from which a ruler will come. God often chooses the small and overlooked. In Advent we remember that the Messiah did not arrive in a capital city but in a humble town—and that God still works through ordinary people and places. Where might God be at work in your life in a way that seems small or hidden?",
    reflectionPrompts: [
      "What 'small' or overlooked area of your life might God be preparing for something new?",
      "How can you pay attention to God's presence in ordinary places this week?",
    ],
  },
  {
    dayIndex: 10,
    season: "ADVENT",
    bibleReference: "Matthew 1:18–25",
    passageText:
      "18 Now the birth of Jesus Christ took place in this way. When his mother Mary had been betrothed to Joseph, before they came together she was found to be with child from the Holy Spirit. 19 And her husband Joseph, being a just man and unwilling to put her to shame, resolved to divorce her quietly. 20 But as he considered these things, behold, an angel of the Lord appeared to him in a dream, saying, 'Joseph, son of David, do not fear to take Mary as your wife, for that which is conceived in her is from the Holy Spirit. 21 She will bear a son, and you shall call his name Jesus, for he will save his people from their sins.' 22 All this took place to fulfill what the Lord had spoken by the prophet: 23 'Behold, the virgin shall conceive and bear a son, and they shall call his name Immanuel.' 24 When Joseph woke from sleep, he did as the angel of the Lord commanded him; he took his wife, 25 but knew her not until she had given birth to a son. And he called his name Jesus.",
    explanation:
      "Joseph learns that Mary is with child and plans to dismiss her quietly until an angel reveals that the child is from the Holy Spirit. His obedience—taking Mary as his wife and naming the child Jesus—shows costly faithfulness. Advent asks us: when God's plan disrupts our own, do we make space for trust? Joseph's yes is a model of receptive obedience.",
    reflectionPrompts: [
      "Where has God's plan recently disrupted what you had in mind?",
      "What would it look like to say yes to God in one area you've been holding back?",
    ],
  },
  {
    dayIndex: 11,
    season: "ADVENT",
    bibleReference: "Luke 1:26–38",
    passageText:
      "26 In the sixth month the angel Gabriel was sent from God to a city of Galilee named Nazareth, 27 to a virgin betrothed to a man whose name was Joseph, of the house of David. And the virgin's name was Mary. 28 And he came to her and said, 'Greetings, O favored one, the Lord is with you!' 29 But she was greatly troubled at the saying... 30 And the angel said to her, 'Do not be afraid, Mary, for you have found favor with God. 31 And behold, you will conceive in your womb and bear a son, and you shall call his name Jesus.' 34 And Mary said to the angel, 'How will this be, since I am a virgin?' 35 And the angel answered her, 'The Holy Spirit will come upon you...' 37 For nothing will be impossible with God.' 38 And Mary said, 'Behold, I am the servant of the Lord; let it be to me according to your word.' And the angel departed from her.",
    explanation:
      "The angel announces to Mary that she will bear the Son of God. Her question—“How can this be?”—is met with assurance that nothing is impossible with God. Her response is surrender: “Let it be to me according to your word.” Advent is a time to bring our own “how can this be?” moments to God and to lean into trust rather than self-reliance.",
    reflectionPrompts: [
      "What seems impossible or overwhelming to you right now?",
      "How might you offer that to God with a spirit of 'let it be' rather than control?",
    ],
  },
  {
    dayIndex: 12,
    season: "ADVENT",
    bibleReference: "Luke 1:39–45",
    passageText:
      "39 In those days Mary arose and went with haste into the hill country, to a town in Judah, 40 and she entered the house of Zechariah and greeted Elizabeth. 41 And when Elizabeth heard the greeting of Mary, the baby leaped in her womb. And Elizabeth was filled with the Holy Spirit, 42 and she exclaimed with a loud cry, 'Blessed are you among women, and blessed is the fruit of your womb! 43 And why is this granted to me that the mother of my Lord should come to me? 44 For behold, when the sound of your greeting came to my ears, the baby in my womb leaped for joy. 45 And blessed is she who believed that there would be a fulfillment of what was spoken to her from the Lord.'",
    explanation:
      "Mary visits Elizabeth, and the child in Elizabeth's womb leaps at the sound of Mary's voice. Elizabeth blesses Mary and her child and names her “blessed” for believing. This moment of recognition and joy reminds us that waiting for Christ is not solitary—we are part of a community that encourages and celebrates faith. Who in your life needs a visit or a word of blessing this season?",
    reflectionPrompts: [
      "Who has been a source of encouragement to you in your faith?",
      "Who might need a word of blessing or presence from you this week?",
    ],
  },
  {
    dayIndex: 13,
    season: "ADVENT",
    bibleReference: "Luke 1:46–55",
    passageText:
      "46 And Mary said, 'My soul magnifies the Lord, 47 and my spirit rejoices in God my Savior, 48 for he has looked on the humble estate of his servant. For behold, from now on all generations will call me blessed; 49 for he who is mighty has done great things for me, and holy is his name. 50 And his mercy is for those who fear him from generation to generation. 51 He has shown strength with his arm; he has scattered the proud in the thoughts of their hearts; 52 he has brought down the mighty from their thrones and exalted those of humble estate; 53 he has filled the hungry with good things, and the rich he has sent away empty. 54 He has helped his servant Israel, in remembrance of his mercy, 55 as he spoke to our fathers, to Abraham and to his offspring forever.'",
    explanation:
      "Mary's song exalts God who looks on the lowly, scatters the proud, and fills the hungry. Her vision is of a world turned right-side up by the coming Messiah. Advent calls us to share this hope: God is at work reversing what is wrong and lifting up those the world overlooks. We can join that work in small ways—through generosity, humility, and justice in our relationships and choices.",
    reflectionPrompts: [
      "Where do you see God 'lifting up the lowly' in your life or community?",
      "What is one concrete way you can align your choices with Mary's vision of justice and mercy?",
    ],
  },
  {
    dayIndex: 14,
    season: "ADVENT",
    bibleReference: "Matthew 3:1–12",
    passageText:
      "1 In those days John the Baptist came preaching in the wilderness of Judea, 2 'Repent, for the kingdom of heaven is at hand.' 3 For this is he who was spoken of by the prophet Isaiah when he said, 'The voice of one crying in the wilderness: Prepare the way of the Lord; make his paths straight.' 4 Now John wore a garment of camel's hair... 5 Then Jerusalem and all Judea and all the region about the Jordan were going out to him, 6 and they were baptized by him in the river Jordan, confessing their sins. 7 But when he saw many of the Pharisees and Sadducees coming to his baptism, he said to them, 'You brood of vipers! Who warned you to flee from the wrath to come? 8 Bear fruit in keeping with repentance. 9 Do not presume to say to yourselves, \"We have Abraham as our father.\"... 11 I baptize you with water for repentance, but he who is coming after me is mightier than I... He will baptize you with the Holy Spirit and fire. 12 His winnowing fork is in his hand, and he will clear his threshing floor.'",
    explanation:
      "John the Baptist appears in the wilderness calling people to repentance and preparing the way for the Lord. He warns that God can raise up children of Abraham from stones—identity is not inherited but lived. Advent is a time to prepare our hearts: to turn from what distracts or hardens us and to make room for the one who comes with the Holy Spirit and fire.",
    reflectionPrompts: [
      "What do you need to turn away from or confess to 'prepare the way' for Christ this season?",
      "How might you make space in your schedule or habits for attentiveness to God?",
    ],
  },
  {
    dayIndex: 15,
    season: "ADVENT",
    bibleReference: "Isaiah 11:1–10",
    passageText:
      "1 There shall come forth a shoot from the stump of Jesse, and a branch from his roots shall bear fruit. 2 And the Spirit of the Lord shall rest upon him, the Spirit of wisdom and understanding, the Spirit of counsel and might, the Spirit of knowledge and the fear of the Lord. 3 And his delight shall be in the fear of the Lord. He shall not judge by what his eyes see... 6 The wolf shall dwell with the lamb, and the leopard shall lie down with the young goat... 9 They shall not hurt or destroy in all my holy mountain; for the earth shall be full of the knowledge of the Lord as the waters cover the sea. 10 In that day the root of Jesse, who shall stand as a signal for the peoples—of him shall the nations inquire.",
    explanation:
      "A shoot will come from the stump of Jesse—a ruler filled with the Spirit who judges with righteousness and strikes the earth with the rod of his mouth. The vision ends with the wolf lying down with the lamb and the earth full of the knowledge of the Lord. Advent holds this promise: the one we wait for brings both justice and peace. We can pray and act for both in our circles of influence.",
    reflectionPrompts: [
      "Where do you long to see justice and peace in your world?",
      "What is one step you can take this week toward that hope?",
    ],
  },
  {
    dayIndex: 16,
    season: "ADVENT",
    bibleReference: "Isaiah 35:1–10",
    passageText:
      "1 The wilderness and the dry land shall be glad; the desert shall rejoice and blossom like the crocus; 2 it shall blossom abundantly and rejoice with joy and singing... 4 Say to those who have an anxious heart, 'Be strong; fear not! Behold, your God will come with vengeance, with the recompense of God. He will come and save you.' 5 Then the eyes of the blind shall be opened, and the ears of the deaf unstopped; 6 then shall the lame man leap like a deer, and the tongue of the mute sing for joy... 10 And the ransomed of the Lord shall return and come to Zion with singing; everlasting joy shall be upon their heads; they shall obtain gladness and joy, and sorrow and sighing shall flee away.",
    explanation:
      "The wilderness and dry land will rejoice; the eyes of the blind will be opened and the ears of the deaf unstopped. A highway will appear for the redeemed to return with joy. This passage pictures creation and humanity restored. Advent reminds us that the coming of Christ is not only spiritual but touches bodies, relationships, and the created world. We wait for—and participate in—this kind of restoration.",
    reflectionPrompts: [
      "What in your life or community feels like 'wilderness' that could use a glimpse of renewal?",
      "How might you be a sign of that renewal to someone else today?",
    ],
  },
  {
    dayIndex: 17,
    season: "ADVENT",
    bibleReference: "Matthew 11:2–11",
    passageText:
      "2 Now when John heard in prison about the deeds of the Christ, he sent word by his disciples 3 and said to him, 'Are you the one who is to come, or shall we look for another?' 4 And Jesus answered them, 'Go and tell John what you hear and see: 5 the blind receive their sight and the lame walk, lepers are cleansed and the deaf hear, and the dead are raised up, and the poor have good news preached to them. 6 And blessed is the one who is not offended by me.' 7 As they went away, Jesus began to speak to the crowds concerning John: 'What did you go out into the wilderness to see?... 9 What then did you go out to see? A prophet? Yes, I tell you, and more than a prophet. 10 This is he of whom it is written, \"Behold, I send my messenger before your face.\" 11 Truly, I say to you, among those born of women there has arisen no one greater than John the Baptist. Yet the one who is least in the kingdom of heaven is greater than he.'",
    explanation:
      "John the Baptist, from prison, sends disciples to ask Jesus if he is the one who is to come. Jesus points to what is happening: the blind see, the lame walk, the poor hear good news. Then he praises John as more than a prophet—yet the least in the kingdom is greater. Advent invites us to look at what Jesus is doing and to find our identity in the kingdom he brings, not in our status or certainty.",
    reflectionPrompts: [
      "When have you doubted or wondered if Jesus is really 'the one'?",
      "Where do you see signs of his kingdom—healing, good news, hope—around you?",
    ],
  },
  {
    dayIndex: 18,
    season: "ADVENT",
    bibleReference: "James 5:7–10",
    passageText:
      "7 Be patient, therefore, brothers, until the coming of the Lord. See how the farmer waits for the precious fruit of the earth, being patient about it, until it receives the early and the late rains. 8 You also, be patient. Establish your hearts, for the coming of the Lord is at hand. 9 Do not grumble against one another, brothers, so that you may not be judged; behold, the Judge is standing at the door. 10 As an example of suffering and patience, brothers, take the prophets who spoke in the name of the Lord.",
    explanation:
      "James urges patience until the coming of the Lord, like a farmer waiting for the crop. He calls believers to strengthen their hearts and not grumble. Advent is a season of patient waiting: we do not force the timeline but trust that the Lord's coming is sure. In the meantime we can steady our hearts and treat one another with grace rather than complaint.",
    reflectionPrompts: [
      "What are you waiting for that tries your patience?",
      "How can you 'strengthen your heart' while you wait—through prayer, community, or rest?",
    ],
  },
  {
    dayIndex: 19,
    season: "ADVENT",
    bibleReference: "Isaiah 7:10–14",
    passageText:
      "10 Again the Lord spoke to Ahaz: 11 'Ask a sign of the Lord your God; let it be deep as Sheol or high as heaven.' 12 But Ahaz said, 'I will not ask, and I will not put the Lord to the test.' 13 And he said, 'Hear then, O house of David! Is it too little for you to weary men, that you weary my God also? 14 Therefore the Lord himself will give you a sign. Behold, the virgin shall conceive and bear a son, and shall call his name Immanuel.'",
    explanation:
      "King Ahaz is offered a sign; he refuses, but God gives one anyway: a young woman will bear a son named Immanuel, “God with us.” The promise stands regardless of human resistance. Advent reminds us that God's presence is the gift—not our ability to believe perfectly or to earn it. We can rest in the fact that God has chosen to be with us.",
    reflectionPrompts: [
      "Where do you need to remember that God is 'with you' this week?",
      "How might you extend that sense of 'God with us' to someone else?",
    ],
  },
  {
    dayIndex: 20,
    season: "ADVENT",
    bibleReference: "Luke 1:67–79",
    passageText:
      "67 And his father Zechariah was filled with the Holy Spirit and prophesied, saying, 68 'Blessed be the Lord God of Israel, for he has visited and redeemed his people... 76 And you, child, will be called the prophet of the Most High; for you will go before the Lord to prepare his ways, 77 to give knowledge of salvation to his people in the forgiveness of their sins, 78 because of the tender mercy of our God, whereby the sunrise shall visit us from on high 79 to give light to those who sit in darkness and in the shadow of death, to guide our feet into the way of peace.'",
    explanation:
      "Zechariah, filled with the Holy Spirit, prophesies over his son John: he will prepare the way for the Lord, give knowledge of salvation through forgiveness, and guide our feet into the way of peace. The dawn from on high will break upon us. Advent is about that dawn—light breaking into darkness, and our feet being set on the path of peace. We can ask God to guide our next steps toward peace in our relationships and decisions.",
    reflectionPrompts: [
      "Where do you need your 'feet' guided into the way of peace?",
      "What would it look like to be a 'preparer of the way' for someone else to encounter Christ?",
    ],
  },
  {
    dayIndex: 21,
    season: "ADVENT",
    bibleReference: "Matthew 2:1–12",
    passageText:
      "1 Now after Jesus was born in Bethlehem of Judea in the days of Herod the king, behold, wise men from the east came to Jerusalem, 2 saying, 'Where is he who has been born king of the Jews? For we saw his star when it rose and have come to worship him.' 3 When Herod the king heard this, he was troubled... 9 After listening to the king, they went on their way. And behold, the star that they had seen when it rose went before them until it came to rest over the place where the child was. 10 When they saw the star, they rejoiced exceedingly with great joy. 11 And going into the house they saw the child with Mary his mother, and they fell down and worshiped him. Then, opening their treasures, they offered him gifts, gold and frankincense and myrrh. 12 And being warned in a dream not to return to Herod, they departed to their own country by another way.",
    explanation:
      "Magi from the east follow a star to the child Jesus and offer gifts. Herod's fear and the scholars' knowledge contrast with the Magi's worship. Advent reminds us that Christ is revealed to those who seek him—often from unexpected places—and that the proper response is worship and offering. We can ask ourselves what we are bringing to the King and whether we are seeking him with our whole heart.",
    reflectionPrompts: [
      "What 'gift' or offering do you want to bring to Christ this season—time, attention, a changed habit?",
      "What might it look like to seek him with the persistence of the Magi?",
    ],
  },
  {
    dayIndex: 22,
    season: "ADVENT",
    bibleReference: "Hebrews 1:1–4",
    passageText:
      "1 Long ago, at many times and in many ways, God spoke to our fathers by the prophets, 2 but in these last days he has spoken to us by his Son, whom he appointed the heir of all things, through whom also he created the world. 3 He is the radiance of the glory of God and the exact imprint of his nature, and he upholds the universe by the word of his power. After making purification for sins, he sat down at the right hand of the Majesty on high, 4 having become as much superior to angels as the name he has inherited is more excellent than theirs.",
    explanation:
      "God spoke in the past through the prophets and now has spoken by a Son, the radiance of God's glory and the exact imprint of his nature. In Advent we prepare for the one who is not just another messenger but the very Word and image of God. This lifts our waiting from mere ritual to encounter: we are awaiting the one who shows us who God is. We can open our hearts to see him more clearly.",
    reflectionPrompts: [
      "How has your picture of God been shaped by Jesus?",
      "In what area of your life do you need to see God's character more clearly?",
    ],
  },
  {
    dayIndex: 23,
    season: "ADVENT",
    bibleReference: "John 1:1–14",
    passageText:
      "1 In the beginning was the Word, and the Word was with God, and the Word was God. 2 He was in the beginning with God. 3 All things were made through him, and without him was not any thing made that was made. 4 In him was life, and the life was the light of men. 5 The light shines in the darkness, and the darkness has not overcome it... 14 And the Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth.",
    explanation:
      "The Word was in the beginning, with God, and was God—and the Word became flesh and dwelt among us. Advent leads to this mystery: the eternal Word took on human life so we could see God's glory and receive grace upon grace. Our waiting is for the one who has already come and who still comes into our ordinary days. We can welcome him into our routines, relationships, and struggles.",
    reflectionPrompts: [
      "Where do you most need to experience 'the Word made flesh'—God with skin on—this week?",
      "How might you 'make room' for Christ in your home, schedule, or heart today?",
    ],
  },
  {
    dayIndex: 24,
    season: "ADVENT",
    bibleReference: "Luke 2:8–20",
    passageText:
      "8 And in the same region there were shepherds out in the field, keeping watch over their flock by night. 9 And an angel of the Lord appeared to them, and the glory of the Lord shone around them, and they were filled with great fear. 10 And the angel said to them, 'Fear not, for behold, I bring you good news of great joy that will be for all the people. 11 For unto you is born this day in the city of David a Savior, who is Christ the Lord. 12 And this will be a sign for you: you will find a baby wrapped in swaddling cloths and lying in a manger.' 13 And suddenly there was with the angel a multitude of the heavenly host praising God and saying, 14 'Glory to God in the highest, and on earth peace among those with whom he is pleased!' 15 When the angels went away from them into heaven, the shepherds said to one another, 'Let us go over to Bethlehem and see this thing that has happened.' 16 And they went with haste and found Mary and Joseph, and the baby lying in a manger. 17 And when they saw it, they made known the saying that had been told them concerning this child. 18 And all who heard it wondered at what the shepherds told them. 19 But Mary treasured up all these things, pondering them in her heart. 20 And the shepherds returned, glorifying and praising God for all they had heard and seen.",
    explanation:
      "Shepherds in the field receive the angel's announcement of a Savior born in Bethlehem. They go with haste, find Mary, Joseph, and the child, and then glorify God and spread the word. Advent's final note is movement: the good news compels us to go, see, and tell. Like the shepherds, we are invited to respond to what we have heard and to share the wonder with others.",
    reflectionPrompts: [
      "What has God shown you this Advent that you could 'go and see' or 'tell' to someone?",
      "How can you carry the good news of Christ into your workplace, family, or community?",
    ],
  },
];

// ----- Christmas readings (dayIndex 25–36) -----
const christmasEntries: ReadingDaySeed[] = [
  {
    dayIndex: 25,
    season: "CHRISTMAS",
    bibleReference: "Luke 2:15–21",
    passageText:
      "15 When the angels went away from them into heaven, the shepherds said to one another, 'Let us go over to Bethlehem and see this thing that has happened.' 16 And they went with haste and found Mary and Joseph, and the baby lying in a manger. 17 And when they saw it, they made known the saying that had been told them concerning this child. 18 And all who heard it wondered at what the shepherds told them. 19 But Mary treasured up all these things, pondering them in her heart. 20 And the shepherds returned, glorifying and praising God for all they had heard and seen. 21 And at the end of eight days, when he was circumcised, he was called Jesus, the name given by the angel before he was conceived in the womb.",
    explanation:
      "The shepherds go to Bethlehem, find the child, and spread the word; then they return glorifying God. Mary treasures these things and ponders them. Jesus is circumcised and named on the eighth day. Christmas is both celebration and pondering: we rejoice at God's gift and we also hold the mystery in our hearts. Taking time to reflect—rather than only rushing on—helps the incarnation sink into our lives.",
    reflectionPrompts: [
      "What from this season do you want to 'treasure and ponder' rather than forget?",
      "How can you create a moment of stillness to let the wonder of Christ's coming sink in?",
    ],
  },
  {
    dayIndex: 26,
    season: "CHRISTMAS",
    bibleReference: "Matthew 2:13–18",
    passageText:
      "13 Now when they had departed, behold, an angel of the Lord appeared to Joseph in a dream and said, 'Rise, take the child and his mother, and flee to Egypt, and remain there until I tell you, for Herod is about to search for the child, to destroy him.' 14 And he rose and took the child and his mother by night and departed to Egypt 15 and remained there until the death of Herod... 16 Then Herod, when he saw that he had been tricked by the wise men, became furious, and he sent and killed all the male children in Bethlehem and in all that region who were two years old or under... 18 'A voice was heard in Ramah, weeping and loud lamentation, Rachel weeping for her children; she refused to be comforted, because they are no more.'",
    explanation:
      "Joseph is warned in a dream to flee to Egypt with the child and his mother; Herod's rage leads to the killing of the infants in Bethlehem. Christmas does not erase the world's darkness—the holy family becomes refugees. God is with us in flight and in grief. We can hold both joy and sorrow, and we can extend refuge and compassion to those who are displaced or suffering today.",
    reflectionPrompts: [
      "Who in your community or the world is fleeing danger or loss? How might you respond with compassion?",
      "How does the reality of suffering at Christmas deepen (rather than undermine) your trust in God-with-us?",
    ],
  },
  {
    dayIndex: 27,
    season: "CHRISTMAS",
    bibleReference: "Matthew 2:19–23",
    passageText:
      "19 But when Herod died, behold, an angel of the Lord appeared in a dream to Joseph in Egypt, 20 saying, 'Rise, take the child and his mother and go to the land of Israel, for those who sought the child's life are dead.' 21 And he rose and took the child and his mother and went to the land of Israel. 22 But when he heard that Archelaus was reigning over Judea in place of his father Herod, he was afraid to go there, and being warned in a dream he withdrew to the district of Galilee. 23 And he went and lived in a city called Nazareth, so that what was spoken by the prophets might be fulfilled: 'He shall be called a Nazarene.'",
    explanation:
      "After Herod's death, Joseph is told in a dream to return to Israel; he settles in Nazareth in Galilee. The one who was born in Bethlehem and fled to Egypt grows up in a small town. Christmas reminds us that Jesus' story is rooted in particular places and in the ordinary life of a family. God's incarnation includes the mundane—work, home, community—and blesses our own ordinary places.",
    reflectionPrompts: [
      "How does the fact that Jesus grew up in an ordinary town shape your view of your own daily life?",
      "What would it look like to see your home or workplace as a place where God is present?",
    ],
  },
  {
    dayIndex: 28,
    season: "CHRISTMAS",
    bibleReference: "John 1:15–18",
    passageText:
      "15 (John bore witness about him, and cried out, 'This was he of whom I said, \"He who comes after me ranks before me, because he was before me.\"') 16 For from his fullness we have all received, grace upon grace. 17 For the law was given through Moses; grace and truth came through Jesus Christ. 18 No one has ever seen God; the only God, who is at the Father's side, he has made him known.",
    explanation:
      "John testifies that the one coming after him ranks before him because he was before him; from his fullness we have received grace upon grace. No one has ever seen God; the only Son has made him known. Christmas is the revelation of God in Jesus—we don't have to guess what God is like. We can look at Jesus and receive grace upon grace for our failures and our need.",
    reflectionPrompts: [
      "What do you need 'grace upon grace' for in this season?",
      "How does knowing God through Jesus change the way you relate to God when you fall short?",
    ],
  },
  {
    dayIndex: 29,
    season: "CHRISTMAS",
    bibleReference: "Galatians 4:4–7",
    passageText:
      "4 But when the fullness of time had come, God sent forth his Son, born of woman, born under the law, 5 to redeem those who were under the law, so that we might receive adoption as sons. 6 And because you are sons, God has sent the Spirit of his Son into our hearts, crying, 'Abba! Father!' 7 So you are no longer a slave, but a son, and if a son, then an heir through God.",
    explanation:
      "When the fullness of time had come, God sent his Son, born of a woman, so that we might receive adoption as children. We are no longer slaves but heirs. Christmas is about timing: God sent the Son at the right moment, and that gift makes us family. We can live from our identity as beloved children, not as people who must earn God's favor.",
    reflectionPrompts: [
      "Do you more often relate to God as a servant or as a beloved child? What would shift if you embraced your adoption?",
      "How might you treat someone else today as a fellow heir of God's promise?",
    ],
  },
  {
    dayIndex: 30,
    season: "CHRISTMAS",
    bibleReference: "Isaiah 60:1–6",
    passageText:
      "1 Arise, shine, for your light has come, and the glory of the Lord has risen upon you. 2 For behold, darkness shall cover the earth, and thick darkness the peoples; but the Lord will arise upon you, and his glory will be seen upon you. 3 And nations shall come to your light, and kings to the brightness of your rising. 4 Lift up your eyes all around, and see; they all gather together, they come to you... 5 Then you shall see and be radiant; your heart shall thrill and exult... 6 A multitude of camels shall cover you, the young camels of Midian and Ephah; all those from Sheba shall come. They shall bring gold and frankincense, and shall proclaim the praise of the Lord.",
    explanation:
      "Arise, shine, for your light has come; nations shall come to your light and kings to the brightness of your dawn. The passage pictures Jerusalem radiant and the nations bringing gifts—echoed in the visit of the Magi. Christmas declares that the child in the manger is light for the whole world. We can live as people who have seen the light and who reflect it in our attitudes and actions.",
    reflectionPrompts: [
      "Where do you sense God calling you to 'arise and shine'—to reflect his light—this year?",
      "Who in your life might need to see the hope of Christ through you?",
    ],
  },
  {
    dayIndex: 31,
    season: "CHRISTMAS",
    bibleReference: "Matthew 2:1–12",
    passageText:
      "1 Now after Jesus was born in Bethlehem of Judea in the days of Herod the king, behold, wise men from the east came to Jerusalem, 2 saying, 'Where is he who has been born king of the Jews? For we saw his star when it rose and have come to worship him.' 9 And behold, the star went before them until it came to rest over the place where the child was. 10 When they saw the star, they rejoiced exceedingly. 11 And going into the house they saw the child with Mary his mother, and they fell down and worshiped him. Then, opening their treasures, they offered him gifts, gold and frankincense and myrrh. 12 And being warned in a dream not to return to Herod, they departed to their own country by another way.",
    explanation:
      "The Magi follow the star to the child and offer gold, frankincense, and myrrh. Their journey is a picture of the nations coming to worship the King. Christmas extends an invitation: we too can bring our best—our time, gifts, and devotion—to Jesus. The story also warns us that not everyone receives the King with joy; we are called to respond with worship and obedience.",
    reflectionPrompts: [
      "What would it look like to 'offer your best' to Christ in the coming week—in worship, service, or surrender?",
      "How can you stay attentive to God's leading (like the star) when the path is unclear?",
    ],
  },
  {
    dayIndex: 32,
    season: "CHRISTMAS",
    bibleReference: "Ephesians 1:3–14",
    passageText:
      "3 Blessed be the God and Father of our Lord Jesus Christ, who has blessed us in Christ with every spiritual blessing in the heavenly places, 4 even as he chose us in him before the foundation of the world... 7 In him we have redemption through his blood, the forgiveness of our trespasses, according to the riches of his grace... 13 In him you also, when you heard the word of truth, the gospel of your salvation, and believed in him, were sealed with the promised Holy Spirit, 14 who is the guarantee of our inheritance until we acquire possession of it, to the praise of his glory.",
    explanation:
      "Paul blesses God who has blessed us in Christ with every spiritual blessing and chose us before the foundation of the world. In him we have redemption, the forgiveness of sins, and an inheritance; we are sealed with the Holy Spirit. Christmas is the hinge of this plan: the Son came so we could be included in God's family and purpose. We can rest in being chosen and sealed, and live with gratitude.",
    reflectionPrompts: [
      "What does it mean to you that God chose you 'before the foundation of the world'?",
      "How might you live today as someone 'sealed with the promised Holy Spirit'?",
    ],
  },
  {
    dayIndex: 33,
    season: "CHRISTMAS",
    bibleReference: "Luke 2:22–40",
    passageText:
      "22 And when the time came for their purification according to the Law of Moses, they brought him up to Jerusalem to present him to the Lord... 25 Now there was a man in Jerusalem, whose name was Simeon... 28 he took him up in his arms and blessed God and said, 29 'Lord, now you are letting your servant depart in peace, according to your word; 30 for my eyes have seen your salvation...' 36 And there was a prophetess, Anna... 38 And coming up at that very hour she began to give thanks to God and to speak of him to all who were waiting for the redemption of Jerusalem. 39 And when they had performed everything according to the Law of the Lord, they returned to Galilee, to their own town of Nazareth. 40 And the child grew and became strong, filled with wisdom. And the favor of God was upon him.",
    explanation:
      "Mary and Joseph bring Jesus to the temple; Simeon takes him in his arms and blesses God, and Anna speaks of him to all who were waiting. Two faithful watchers recognize the child as the fulfillment of God's promise. Christmas invites us to be people who watch and recognize—who see God's work in the world and point others to it. We can ask God to give us eyes like Simeon and Anna.",
    reflectionPrompts: [
      "What are you 'waiting for' from God? How might this passage encourage you to keep watching?",
      "Who could you encourage by pointing them to what God has done or is doing?",
    ],
  },
  {
    dayIndex: 34,
    season: "CHRISTMAS",
    bibleReference: "Colossians 1:15–20",
    passageText:
      "15 He is the image of the invisible God, the firstborn of all creation. 16 For by him all things were created, in heaven and on earth, visible and invisible... all things were created through him and for him. 17 And he is before all things, and in him all things hold together. 18 And he is the head of the body, the church... 19 For in him all the fullness of God was pleased to dwell, 20 and through him to reconcile to himself all things, whether on earth or in heaven, making peace by the blood of his cross.",
    explanation:
      "Christ is the image of the invisible God, the firstborn of all creation; in him all things hold together and through him God reconciles all things to himself. The child of Christmas is the one in whom creation finds its meaning and its peace. We can hold both the vulnerability of the manger and the cosmic scope of his lordship—and offer our lives as part of his reconciling work.",
    reflectionPrompts: [
      "How does it change your view of daily life to know that 'in him all things hold together'?",
      "Where do you long to see reconciliation—in a relationship, in yourself, or in the world?",
    ],
  },
  {
    dayIndex: 35,
    season: "CHRISTMAS",
    bibleReference: "Hebrews 2:14–18",
    passageText:
      "14 Since therefore the children share in flesh and blood, he himself likewise partook of the same things, that through death he might destroy the one who has the power of death, that is, the devil, 15 and deliver all those who through fear of death were subject to lifelong slavery. 16 For surely it is not angels that he helps, but he helps the offspring of Abraham. 17 Therefore he had to be made like his brothers in every respect, so that he might become a merciful and faithful high priest in the service of God, to make propitiation for the sins of the people. 18 For because he himself has suffered when tempted, he is able to help those who are being tempted.",
    explanation:
      "Since the children share in flesh and blood, Jesus himself partook of the same, so that through death he might destroy the one who has the power of death. He had to be made like his brothers and sisters in every respect so that he might become a merciful high priest. Christmas is God entering our condition fully—so he could help us. We can bring our temptations and struggles to him because he has been there.",
    reflectionPrompts: [
      "What temptation or struggle do you need to bring to Jesus as your 'merciful high priest'?",
      "How does the truth that Jesus was 'made like us' encourage you when you feel alone or misunderstood?",
    ],
  },
  {
    dayIndex: 36,
    season: "CHRISTMAS",
    bibleReference: "Matthew 3:13–17",
    passageText:
      "13 Then Jesus came from Galilee to the Jordan to John, to be baptized by him. 14 John would have prevented him, saying, 'I need to be baptized by you, and do you come to me?' 15 But Jesus answered him, 'Let it be so now, for thus it is fitting for us to fulfill all righteousness.' Then he consented. 16 And when Jesus was baptized, immediately he went up from the water, and behold, the heavens were opened to him, and he saw the Spirit of God descending like a dove and coming to rest on him; 17 and behold, a voice from heaven said, 'This is my beloved Son, with whom I am well pleased.'",
    explanation:
      "Jesus comes to John to be baptized; John hesitates, but Jesus insists to fulfill all righteousness. When Jesus comes up from the water, the heavens open, the Spirit descends, and the Father says, “This is my beloved Son.” Christmas leads to this moment: the Son is named and anointed for his mission. We too are invited to hear God's pleasure over us and to step into the purpose he has for our lives.",
    reflectionPrompts: [
      "When have you heard or sensed God's pleasure over you? How can you return to that truth today?",
      "What 'righteousness' or obedience is Jesus asking of you in this season?",
    ],
  },
];

// ----- Lent readings (dayIndex 37–76) -----
const lentEntries: ReadingDaySeed[] = [
  {
    dayIndex: 37,
    season: "LENT",
    bibleReference: "Genesis 2:15–17; 3:1–7",
    passageText: "",
    explanation:
      "Lent often begins by returning to the garden, where human trust in God is first tested. Adam and Eve are given freedom with one clear boundary, yet they reach for what is forbidden, doubting God's goodness. Our own hearts still wrestle with the question: can God be trusted to define what is good? Lent invites us to name where we resist God's limits and to return to simple, honest dependence.",
    reflectionPrompts: [
      "Where do you feel most tempted to decide for yourself what is good, apart from God’s wisdom?",
      "What is one concrete way you could practice trusting God’s boundaries this week?",
    ],
  },
  {
    dayIndex: 38,
    season: "LENT",
    bibleReference: "Psalm 51:1–12",
    passageText: "",
    explanation:
      "David’s prayer after his sin is a model for Lenten repentance: he doesn’t excuse or minimize but throws himself on God’s mercy. He asks not only for forgiveness but for a clean heart and a renewed spirit. Lent is not about self-hatred; it is about letting God’s kindness lead us to a deep, cleansing honesty that restores joy.",
    reflectionPrompts: [
      "Is there anything you’ve been excusing or hiding from God that you need to bring into the light?",
      "What line from Psalm 51 could you pray slowly several times today?",
    ],
  },
  {
    dayIndex: 39,
    season: "LENT",
    bibleReference: "Genesis 22:1–18",
    passageText: "",
    explanation:
      "Abraham is asked to offer Isaac, the child of promise. The story is unsettling, yet it shows a faith that clings to God even when the command is confusing. God ultimately provides the ram, hinting at the greater provision of the cross. Lent calls us to examine what we are clinging to more tightly than God and to trust that he is both holy and profoundly faithful.",
    reflectionPrompts: [
      "What 'Isaac'—good gift or hope—are you most afraid of losing?",
      "How might you symbolically place that gift back into God’s hands today?",
    ],
  },
  {
    dayIndex: 40,
    season: "LENT",
    bibleReference: "Exodus 17:1–7",
    passageText: "",
    explanation:
      "In the wilderness the people grumble for water and ask, “Is the Lord among us or not?” God meets their need, but the place is named for their testing and quarreling. Lent helps us recognize our own grumbling hearts—how quickly we question God’s presence when life is dry. Yet even there, God can bring unexpected streams of provision.",
    reflectionPrompts: [
      "Where do you feel spiritually 'thirsty' or abandoned right now?",
      "Instead of grumbling, what honest prayer could you offer God about that place?",
    ],
  },
  {
    dayIndex: 41,
    season: "LENT",
    bibleReference: "John 4:5–26",
    passageText: "",
    explanation:
      "Jesus meets a Samaritan woman at a well and gently exposes her thirst beneath the surface of her life. He offers living water that truly satisfies, even as he names the truth about her relationships. Lent is a time to let Jesus meet us in our patterns, not to shame us but to offer something deeper than the wells we keep drawing from.",
    reflectionPrompts: [
      "What 'wells' do you return to for comfort or identity when you feel empty?",
      "How might you turn toward Jesus for living water in one of those moments today?",
    ],
  },
  {
    dayIndex: 42,
    season: "LENT",
    bibleReference: "John 4:27–42",
    passageText: "",
    explanation:
      "After encountering Jesus, the woman leaves her water jar and runs back to town to tell her story. The villagers come and many believe because of her testimony and then because of meeting Jesus themselves. Lenten repentance is not just private; healed places can become testimonies that draw others to hope. God often uses our honest stories, not our perfection, to bless others.",
    reflectionPrompts: [
      "Is there a part of your story where Jesus has met you that you rarely share?",
      "Who might need to hear a simple, honest version of that story?",
    ],
  },
  {
    dayIndex: 43,
    season: "LENT",
    bibleReference: "John 9:1–12",
    passageText: "",
    explanation:
      "The disciples see a man born blind and assume that someone’s sin caused it. Jesus rejects that framework and instead speaks of God’s works being displayed in him. In Lent we are invited to move from blame and simplistic explanations to seeing how God can work in suffering. Jesus brings light not only to the man’s eyes but also to the disciples’ assumptions.",
    reflectionPrompts: [
      "Where are you tempted to assign blame—for your own pain or someone else’s?",
      "How might you look instead for how God’s mercy could be displayed there?",
    ],
  },
  {
    dayIndex: 44,
    season: "LENT",
    bibleReference: "John 9:13–41",
    passageText: "",
    explanation:
      "The healed man is questioned again and again, while religious leaders resist accepting what God has done. In the end, Jesus says that those who claim to see can be most blind. Lent warns us that spiritual pride can keep us from receiving God’s surprising work. Humility keeps us open to the ways Jesus is still healing and revealing, even when it doesn’t fit our expectations.",
    reflectionPrompts: [
      "Where might spiritual pride or defensiveness be blinding you right now?",
      "What would it look like to say to Jesus, 'If I am blind in some area, please show me'?",
    ],
  },
  {
    dayIndex: 45,
    season: "LENT",
    bibleReference: "Ezekiel 37:1–14",
    passageText: "",
    explanation:
      "Ezekiel is led by the Spirit into a valley of dry bones and asked whether they can live. God tells him to prophesy, and the bones come together as a living army. Lent takes us into the valleys of our own dryness, not to condemn us but to invite us to hear God’s word spoken over what feels dead. The same Spirit still brings life where we have given up hope.",
    reflectionPrompts: [
      "What part of your inner life feels most like 'dry bones' right now?",
      "How might you open that place to God’s word and Spirit this week?",
    ],
  },
  {
    dayIndex: 46,
    season: "LENT",
    bibleReference: "John 11:1–16",
    passageText: "",
    explanation:
      "When Jesus hears that Lazarus is ill, he delays going to him. His disciples struggle to understand his timing. Lent faces this mystery: God’s love does not always look like immediate rescue. Yet Jesus moves toward Bethany with purpose, holding both love and a larger story together.",
    reflectionPrompts: [
      "Where are you frustrated with God’s timing in your life?",
      "How could you hold onto both God’s love and his wisdom when the timing doesn’t make sense?",
    ],
  },
  {
    dayIndex: 47,
    season: "LENT",
    bibleReference: "John 11:17–37",
    passageText: "",
    explanation:
      "Martha and Mary both say, “Lord, if you had been here, my brother would not have died.” Jesus meets them differently—teaching Martha about resurrection and weeping with Mary. In Lent we bring our 'if only you had…' prayers and meet a Savior who both speaks truth and shares our tears. He is not indifferent to our grief.",
    reflectionPrompts: [
      "What 'if only' do you carry toward God about something that has happened?",
      "Do you need more to hear Jesus’ promise, to experience his tears, or both today?",
    ],
  },
  {
    dayIndex: 48,
    season: "LENT",
    bibleReference: "John 11:38–44",
    passageText: "",
    explanation:
      "Standing before the tomb, Jesus weeps and then commands Lazarus to come out. The dead man walks out still wrapped in grave clothes, and Jesus tells others to unbind him. Lent leads us toward the cross, but also hints at resurrection power already at work. We may still carry our 'grave clothes' of habit and shame, yet Jesus’ voice can call us into new freedom.",
    reflectionPrompts: [
      "Where do you sense Jesus inviting you out of something that feels like a tomb?",
      "Who could help you 'unwrap' habits or patterns that keep you bound?",
    ],
  },
  {
    dayIndex: 49,
    season: "LENT",
    bibleReference: "Isaiah 50:4–9a",
    passageText: "",
    explanation:
      "The servant in Isaiah speaks of a tongue trained to sustain the weary, and a back given to those who strike. He sets his face like flint because he knows God will help him. Christians have long seen here a foreshadowing of Jesus’ path to the cross. Lent teaches us that obedience may include suffering, but we are never abandoned in it.",
    reflectionPrompts: [
      "Where is obedience costly for you right now—in relationships, integrity, or calling?",
      "How might you draw strength from the servant’s confidence that 'the Lord God helps me'?",
    ],
  },
  {
    dayIndex: 50,
    season: "LENT",
    bibleReference: "Philippians 2:5–11",
    passageText: "",
    explanation:
      "Paul urges us to have the same mind as Christ, who emptied himself, taking the form of a servant and becoming obedient to death on a cross. Because of this, God highly exalted him. Lent invites us to practice this downward movement—laying aside status and self-assertion—trusting that real life is found in Christ-shaped humility.",
    reflectionPrompts: [
      "In what specific situation are you tempted to grasp for status, control, or recognition?",
      "What would a Christlike 'downward' step of humility look like there?",
    ],
  },
  {
    dayIndex: 51,
    season: "LENT",
    bibleReference: "Matthew 21:1–11",
    passageText: "",
    explanation:
      "Jesus enters Jerusalem on a donkey to shouts of “Hosanna,” fulfilling the prophet’s words about a humble king. The crowd’s expectations of victory are high, yet they have not understood the kind of kingdom he brings. Lent and Holy Week confront us with our own mixed motives: we may welcome Jesus when he seems to give us what we want, but resist him when he comes in weakness and calls us to the cross.",
    reflectionPrompts: [
      "What kind of 'king' are you most tempted to want Jesus to be for you right now?",
      "How might you welcome him as he truly is, even if that challenges your expectations?",
    ],
  },
  {
    dayIndex: 52,
    season: "LENT",
    bibleReference: "Matthew 26:17–30",
    passageText: "",
    explanation:
      "At the Last Supper, Jesus takes bread and cup and speaks of his body and blood given for many for the forgiveness of sins. He shares this meal with disciples who will soon betray, deny, and desert him. Lent reminds us that Jesus knows our weakness and still offers himself to us. The table is a place of honest confession and undeserved grace.",
    reflectionPrompts: [
      "How does it affect you to picture Jesus knowingly serving those who would fail him?",
      "What would it look like to come to God today with your failure and receive his offered grace?",
    ],
  },
  {
    dayIndex: 53,
    season: "LENT",
    bibleReference: "Matthew 26:36–46",
    passageText: "",
    explanation:
      "In Gethsemane, Jesus wrestles in prayer, sorrowful and troubled, asking if the cup might pass but ultimately surrendering, “Not as I will, but as you will.” His friends sleep through his anguish. Lent invites us into honest struggle before God—naming our dread, yet choosing trust. Jesus knows what it is to feel alone in obedience.",
    reflectionPrompts: [
      "Is there a 'cup' you wish you didn’t have to drink in this season?",
      "How might you pray honestly about it while still opening your heart to God’s will?",
    ],
  },
  {
    dayIndex: 54,
    season: "LENT",
    bibleReference: "Matthew 26:47–56",
    passageText: "",
    explanation:
      "Judas arrives with a crowd to arrest Jesus, and one of Jesus’ companions lashes out with a sword. Jesus rebukes violence and speaks of the Scriptures being fulfilled. Lent challenges our impulse to fight with the world’s weapons when we feel threatened. Jesus’ path is one of willing surrender and trust in the Father’s plan.",
    reflectionPrompts: [
      "When you feel attacked or misunderstood, what 'sword' are you tempted to draw—harsh words, withdrawal, control?",
      "What would it mean to respond more like Jesus in a current conflict?",
    ],
  },
  {
    dayIndex: 55,
    season: "LENT",
    bibleReference: "Matthew 26:57–75",
    passageText: "",
    explanation:
      "Jesus endures a sham trial while Peter, in the courtyard, denies even knowing him three times. When the rooster crows, Peter weeps bitterly. Lent invites us to face our own denials—not only dramatic ones, but the quieter ways we distance ourselves from Jesus to feel safe. Yet Peter’s story is ultimately one of restoration, not disqualification.",
    reflectionPrompts: [
      "Where are you most tempted to hide your connection to Jesus—at work, with friends, online?",
      "What might repentance and courage look like in that area?",
    ],
  },
  {
    dayIndex: 56,
    season: "LENT",
    bibleReference: "Matthew 27:1–10",
    passageText: "",
    explanation:
      "Judas, overwhelmed by remorse, returns the silver and ends his own life, while the religious leaders refuse responsibility. The contrast between regret without hope and repentance that turns toward God is sobering. Lent reminds us that our failures are not the end of the story if we bring them to Christ rather than to despair.",
    reflectionPrompts: [
      "Have you ever been stuck in regret that didn’t move toward healing?",
      "What would it look like to bring even your worst moment honestly to Jesus today?",
    ],
  },
  {
    dayIndex: 57,
    season: "LENT",
    bibleReference: "Matthew 27:11–26",
    passageText: "",
    explanation:
      "Before Pilate, Jesus is largely silent while accusations swirl. The crowd chooses Barabbas, and Jesus is handed over to be crucified. Lent exposes the ways public pressure and fear can distort justice. Jesus bears the weight of human compromise and cowardice, standing in the place of the guilty.",
    reflectionPrompts: [
      "When have you gone along with something you knew wasn’t right because it felt easier or safer?",
      "How might Jesus’ quiet courage strengthen you to stand for what is true in a small way this week?",
    ],
  },
  {
    dayIndex: 58,
    season: "LENT",
    bibleReference: "Matthew 27:27–44",
    passageText: "",
    explanation:
      "The soldiers mock Jesus with a robe and crown of thorns, kneeling in fake worship. As he hangs on the cross, passersby and leaders taunt him to save himself. Lent leads us here: the Son of God enduring humiliation and pain without retaliating. His refusal to come down from the cross is not weakness but the deepest expression of love.",
    reflectionPrompts: [
      "How do you respond when you feel mocked, misunderstood, or shamed?",
      "What does Jesus’ endurance on the cross say about your worth to him?",
    ],
  },
  {
    dayIndex: 59,
    season: "LENT",
    bibleReference: "Matthew 27:45–56",
    passageText: "",
    explanation:
      "Darkness covers the land as Jesus cries out, “My God, my God, why have you forsaken me?” At his death the temple curtain tears, and a centurion confesses, “Truly this was the Son of God.” Lent does not rush past this mystery: the Holy One enters into God-forsakenness so that we might never be truly abandoned.",
    reflectionPrompts: [
      "Have you ever felt forsaken by God? How does Jesus’ cry from the cross speak into that experience?",
      "What does it mean to you that the curtain was torn—that access to God is now open?",
    ],
  },
  {
    dayIndex: 60,
    season: "LENT",
    bibleReference: "Matthew 27:57–66",
    passageText: "",
    explanation:
      "Jesus is laid in a tomb and a stone is sealed over the entrance, with guards set to keep it secure. Holy Saturday is a day of silence and waiting between death and resurrection. Lent teaches us how to live in those in-between spaces when we cannot yet see what God will do.",
    reflectionPrompts: [
      "Where in your life does it feel like 'nothing is happening' spiritually, despite your prayers?",
      "How could you practice patient, watchful trust in that place rather than giving up?",
    ],
  },
  {
    dayIndex: 61,
    season: "LENT",
    bibleReference: "Romans 6:3–11",
    passageText: "",
    explanation:
      "Paul explains that in baptism we are united with Christ in his death and resurrection. Our old self was crucified with him so that we might walk in newness of life. Lent is not only about sorrow for sin; it is about remembering that we are already joined to Jesus’ victory and can count ourselves dead to sin and alive to God.",
    reflectionPrompts: [
      "What old pattern or identity are you tempted to see as still in charge of you?",
      "How could you practically 'count yourself alive to God' in a situation you face today?",
    ],
  },
  {
    dayIndex: 62,
    season: "LENT",
    bibleReference: "2 Corinthians 5:17–21",
    passageText: "",
    explanation:
      "If anyone is in Christ, there is new creation; the old has passed away, the new has come. God reconciled us to himself through Christ and entrusts to us the ministry of reconciliation. Lent holds together being made new and being sent—receiving forgiveness and then extending it to others.",
    reflectionPrompts: [
      "Where do you most need to remember that you are a 'new creation' rather than defined by your past?",
      "Is there a relationship where God might be inviting you to take a small step toward reconciliation?",
    ],
  },
  {
    dayIndex: 63,
    season: "LENT",
    bibleReference: "Mark 8:31–38",
    passageText: "",
    explanation:
      "Jesus predicts his suffering, rejection, and death, and then calls those who follow him to deny themselves, take up their cross, and follow. He warns that trying to save our life on our own terms leads to losing it. Lent is a season to ask what we are clinging to that keeps us from this costly but life-giving path.",
    reflectionPrompts: [
      "What might 'taking up your cross' look like in an ordinary day for you—at work, at home, in your habits?",
      "Is there something you’re trying to hold onto that may be keeping you from deeper obedience?",
    ],
  },
  {
    dayIndex: 64,
    season: "LENT",
    bibleReference: "Mark 10:17–27",
    passageText: "",
    explanation:
      "A rich man runs to Jesus, eager to inherit eternal life, yet walks away sad when invited to let go of his possessions. Jesus looks at him and loves him even as he names the obstacle. Lent invites us to let Jesus put his finger on what we rely on most, trusting that his call to release is rooted in love, not in harshness.",
    reflectionPrompts: [
      "What do you instinctively look to for security—money, achievement, approval, comfort?",
      "How might you take a small, concrete step of generosity or simplicity in response to Jesus?",
    ],
  },
  {
    dayIndex: 65,
    season: "LENT",
    bibleReference: "Luke 18:9–14",
    passageText: "",
    explanation:
      "Jesus tells of a Pharisee who trusts in his own righteousness and a tax collector who simply pleads for mercy. The one who humbles himself goes home justified. Lent calls us away from spiritual comparison and toward the simple prayer, “God, be merciful to me, a sinner.”",
    reflectionPrompts: [
      "Do you more often sound like the Pharisee or the tax collector in your inner prayers?",
      "What would it look like to practice humble, honest confession this week?",
    ],
  },
  {
    dayIndex: 66,
    season: "LENT",
    bibleReference: "Luke 19:1–10",
    passageText: "",
    explanation:
      "Zacchaeus climbs a tree to see Jesus, and to his surprise Jesus calls him by name and invites himself to his house. The encounter leads to radical repentance and restitution. Lent reminds us that Jesus delights to come close to compromised, tangled lives and that real grace reshapes how we handle money, power, and relationships.",
    reflectionPrompts: [
      "Where do you most identify with Zacchaeus—curious but hiding, successful yet empty?",
      "Is there any practical restitution or change Jesus might be inviting you to make?",
    ],
  },
  {
    dayIndex: 67,
    season: "LENT",
    bibleReference: "Luke 22:24–32",
    passageText: "",
    explanation:
      "At the Last Supper, a dispute arises over who is the greatest. Jesus redefines greatness as serving, and he tells Peter that he has prayed for his faith, knowing Peter will stumble. Lent exposes our hunger for status but also shows us a Savior who intercedes for us even in our weakness.",
    reflectionPrompts: [
      "Where do you feel competitive or anxious about being 'great' in comparison to others?",
      "How might you choose a hidden act of service instead of self-promotion today?",
    ],
  },
  {
    dayIndex: 68,
    season: "LENT",
    bibleReference: "John 13:1–15",
    passageText: "",
    explanation:
      "On the night before his death, Jesus takes the posture of a servant and washes his disciples’ feet. He knows his authority and his origin, and from that security he stoops low. Lent offers us this picture of love in action: greatness expressed in humble service.",
    reflectionPrompts: [
      "What makes it hard for you to take the 'lower place' and serve others in practical ways?",
      "Whose 'feet'—whose needs—could you tend to in a small but concrete way this week?",
    ],
  },
  {
    dayIndex: 69,
    season: "LENT",
    bibleReference: "Hebrews 4:14–16",
    passageText: "",
    explanation:
      "We have a great high priest who has passed through the heavens, Jesus the Son of God, who is able to sympathize with our weaknesses because he was tempted as we are yet without sin. Therefore we can approach the throne of grace with confidence. Lent is not meant to push us away from God, but to draw us near in our need.",
    reflectionPrompts: [
      "Where do you feel most weak or tempted right now?",
      "How might you come boldly to the throne of grace today instead of hiding in shame?",
    ],
  },
  {
    dayIndex: 70,
    season: "LENT",
    bibleReference: "Hebrews 12:1–3",
    passageText: "",
    explanation:
      "The writer of Hebrews urges us to run the race with endurance, laying aside sin and looking to Jesus, who endured the cross for the joy set before him. Considering his perseverance helps us not grow weary. Lent strengthens our endurance by fixing our gaze on Jesus rather than on our own efforts alone.",
    reflectionPrompts: [
      "What 'weight' or sin is entangling your steps in this season?",
      "What is one practical way to 'look to Jesus' when you feel tired or discouraged?",
    ],
  },
  {
    dayIndex: 71,
    season: "LENT",
    bibleReference: "Psalm 32:1–7",
    passageText: "",
    explanation:
      "The psalmist describes the heaviness of keeping silent about sin and the relief that comes with confession. God becomes a hiding place rather than someone to hide from. Lent encourages us to move from secrecy to safety—trusting that God’s forgiveness is real and that he surrounds us with songs of deliverance.",
    reflectionPrompts: [
      "Is there anything you’ve been hiding that is weighing you down spiritually or emotionally?",
      "Who could be a safe person to confess to, and how might you also bring this honestly to God?",
    ],
  },
  {
    dayIndex: 72,
    season: "LENT",
    bibleReference: "Psalm 130:1–8",
    passageText: "",
    explanation:
      "From the depths, the psalmist cries to the Lord and clings to the truth that with God there is forgiveness and steadfast love. He waits more than watchmen for the morning. Lent teaches us that waiting with God—even in the depths—is different from waiting alone. His character, not our feelings, is the anchor.",
    reflectionPrompts: [
      "Where are you 'in the depths' right now—emotionally, relationally, or spiritually?",
      "What would it look like to wait on the Lord there with hope instead of resignation?",
    ],
  },
  {
    dayIndex: 73,
    season: "LENT",
    bibleReference: "Joel 2:12–13",
    passageText: "",
    explanation:
      "Through Joel, God calls his people to return to him with all their heart, with fasting, weeping, and mourning—yet he emphasizes that they should rend their hearts, not just their garments. He is gracious and merciful, slow to anger and abounding in steadfast love. Lent is about heart-level returning, not just outward religious effort.",
    reflectionPrompts: [
      "Are there any Lenten practices you’re doing mostly on the surface, without heart engagement?",
      "How might you respond to God’s invitation to 'return with all your heart' today?",
    ],
  },
  {
    dayIndex: 74,
    season: "LENT",
    bibleReference: "Isaiah 58:6–12",
    passageText: "",
    explanation:
      "God critiques fasting that is self-focused and harsh toward others, and instead describes a fast that loosens bonds of wickedness, shares bread with the hungry, and shelters the poor. Then light breaks forth and healing springs up. Lent reminds us that true repentance overflows into justice and mercy in how we treat people around us.",
    reflectionPrompts: [
      "How could your Lenten practices move beyond self-improvement toward tangible care for others?",
      "Is there a specific person or situation where God might be nudging you toward mercy or justice?",
    ],
  },
  {
    dayIndex: 75,
    season: "LENT",
    bibleReference: "Micah 6:6–8",
    passageText: "",
    explanation:
      "People ask what they should bring to God—burnt offerings, rivers of oil, even a firstborn child. The answer is simple and searching: do justice, love kindness, and walk humbly with your God. Lent clears away religious noise to refocus us on this kind of everyday faithfulness.",
    reflectionPrompts: [
      "Which part of Micah’s call—justice, kindness, or humility—feels most urgent for you right now?",
      "What is one small, specific way you could practice that today?",
    ],
  },
  {
    dayIndex: 76,
    season: "LENT",
    bibleReference: "Mark 15:33–41",
    passageText: "",
    explanation:
      "At the moment of Jesus’ death, darkness falls, the curtain is torn, and a Roman centurion confesses that this crucified man was truly God’s Son. Lent ends at the foot of the cross, where human power seems to have won but God is actually opening a new and living way. Here we lay down our illusions of self-salvation and receive the costly love of Christ.",
    reflectionPrompts: [
      "What do you notice or feel as you linger at the cross in this scene?",
      "How might you respond today—perhaps in quiet gratitude, confession, or an act of love—in light of Jesus’ sacrifice?",
    ],
  },
];

// ----- Easter readings (dayIndex 77–126) -----
const easterRefs = [
  "John 20:1–18",
  "John 20:19–31",
  "Matthew 28:1–10",
  "Luke 24:1–12",
  "Luke 24:13–35",
  "Luke 24:36–49",
  "John 21:1–14",
  "Acts 2:14a, 22–36",
  "Acts 2:37–47",
  "Acts 3:11–21",
  "Acts 4:32–37",
  "Acts 5:27–32",
  "Acts 10:34–43",
  "Romans 6:3–11",
  "1 Corinthians 15:1–11",
  "1 Corinthians 15:12–22",
  "Colossians 3:1–4",
  "1 Peter 1:3–9",
  "1 Peter 2:2–10",
  "1 Peter 2:19–25",
  "John 10:1–10",
  "John 14:1–14",
  "John 15:1–8",
  "Acts 7:55–60",
  "Acts 9:1–19",
  "Revelation 1:12–18",
  "2 Corinthians 5:14–21",
  "Ephesians 1:15–23",
  "Philippians 3:7–14",
  "1 John 1:1–4",
  "John 20:24–31",
  "Acts 1:6–11",
  "Acts 4:1–12",
  "Acts 8:26–39",
  "Romans 8:31–39",
  "1 Peter 3:13–22",
  "John 11:25–27",
  "Isaiah 25:6–9",
  "Psalm 118:14–24",
  "Acts 2:42–47",
  "1 Thessalonians 4:13–18",
  "Revelation 21:1–7",
  "John 14:15–21",
  "Acts 16:25–34",
  "Romans 10:8–13",
  "1 Peter 4:12–19",
  "John 12:23–26",
  "2 Timothy 2:8–13",
  "Hebrews 12:1–3",
  "1 John 3:1–3",
  "John 17:20–26",
];

const easterExplanations: string[] = [
  "Mary Magdalene comes to the tomb and finds it empty; she runs to tell the disciples. Easter begins with absence that becomes presence—Jesus is not among the dead but risen. We are invited to bring our own 'empty tomb' moments to him and to run with the news.",
  "The risen Jesus appears to the disciples behind locked doors and shows his wounds; Thomas later sees and believes. Easter faith is not denial of suffering but recognition that the crucified one is alive. Where do you need to see and touch the reality of resurrection?",
  "The women at the tomb meet Jesus and are sent to tell the disciples to go to Galilee. Easter sends us back into ordinary geography with a mission. God meets us in the familiar and sends us out with good news.",
  "The women find the stone rolled away and the tomb empty; angels remind them that Jesus said he would rise. Easter turns fear and confusion into remembrance and hope. His words still anchor us when the world seems to have won.",
  "On the road to Emmaus, Jesus walks with two disciples unrecognized, opens the Scriptures, and is known in the breaking of bread. Easter is often recognized in community, in Word and table. Where might Jesus be walking with you unrecognized?",
  "Jesus stands among the disciples, shows his hands and feet, and opens their minds to understand the Scriptures. Peace and commissioning flow from his presence. We are sent as witnesses of repentance and forgiveness.",
  "By the Sea of Galilee, Jesus prepares breakfast for his disciples and restores Peter with a threefold charge to feed his sheep. Easter restores failure and redirects love into service. He still meets us in our work and calls us to tend what he loves.",
  "Peter proclaims the resurrection to the crowd: Jesus was handed over and killed, but God raised him up; we are witnesses. Easter is public truth, not private feeling. We are invited to speak this hope with clarity and grace.",
  "The crowd is cut to the heart and asks what to do; Peter calls them to repent and be baptized. Three thousand are added. Easter creates a community of the forgiven and the Spirit-filled. Our response to the gospel still shapes our belonging.",
  "Peter heals a lame man in Jesus' name and declares that the God of Abraham has glorified his servant Jesus. Easter power continues in acts of mercy and bold testimony. We bear his name into a world that needs both.",
  "The believers are of one heart and soul, sharing possessions; the apostles testify to the resurrection. Easter reshapes economics and community. Generosity and unity are signs that Jesus is alive among us.",
  "The apostles are arrested and tell the council they must obey God; they are witnesses to the resurrection. Easter gives courage to speak truth to power. Where might you bear witness despite pressure to stay silent?",
  "Peter preaches to Cornelius's household: God shows no partiality; Jesus is Lord of all, and everyone who believes receives forgiveness. Easter breaks every barrier. The good news is for the whole world.",
  "Paul teaches that in baptism we are united with Christ in his death and resurrection; we walk in newness of life. Easter is not only a day but a new identity. We can count ourselves dead to sin and alive to God.",
  "Paul hands on the gospel of the resurrection: Christ died for our sins, was buried, raised, and appeared to many. Easter is the core of the message we hold and pass on. How are you handing it on?",
  "If Christ has not been raised, our faith is in vain; but in fact he has been raised, and we will be raised with him. Easter is the hinge of history. Our hope for the future is secure in his victory.",
  "Set your minds on things above, where Christ is; your life is hidden with Christ in God. When he appears, you also will appear with him in glory. Easter reorients our focus and our hope. We already belong to the age to come.",
  "Blessed be God, who has given us new birth into a living hope through the resurrection of Jesus from the dead. Easter is the source of a hope that cannot be taken away. We are born again into an inheritance that is kept in heaven.",
  "Like newborn infants, long for the pure spiritual milk, and come to the living stone rejected by humans but chosen by God. Easter builds a spiritual house. We are being built together as a dwelling for God.",
  "Christ suffered for you, leaving you an example; he bore our sins in his body on the tree. By his wounds you have been healed. Easter grounds our identity in his suffering and our healing in his grace.",
  "Jesus is the gate for the sheep; whoever enters through him will be saved and find pasture. Easter is the way into life that is truly life. We can stop looking for other doors.",
  "Jesus is the way, the truth, and the life; no one comes to the Father except through him. To see him is to see the Father. Easter opens the way home. We know where we are going.",
  "Jesus is the true vine; abide in him and he will abide in you, and you will bear much fruit. Easter life is abiding life. Our fruitfulness comes from staying connected to him.",
  "Stephen, full of the Spirit, sees the glory of God and Jesus at the right hand; he is stoned while praying for his killers. Easter martyrdom is still witness. The church is built by those who love Jesus more than life.",
  "Saul is struck down and meets the risen Jesus on the road to Damascus; he is baptized and filled with the Spirit. Easter can turn the fiercest opponent into the boldest witness. No one is beyond the reach of his call.",
  "John sees one like a son of man among the lampstands: he holds the keys of death and Hades. Easter means Jesus holds the keys. We need not fear death; he has overcome.",
  "The love of Christ compels us; if anyone is in Christ, there is new creation. God reconciled us to himself through Christ and gave us the ministry of reconciliation. Easter makes us ambassadors of his peace.",
  "Paul prays that we may know the immeasurable greatness of God's power toward us who believe, the power that raised Christ from the dead. Easter power is at work in us. We can ask for eyes to see it.",
  "Paul counts everything as loss for the sake of knowing Christ and the power of his resurrection; he presses on toward the goal. Easter reorders our priorities. What would it look like to press on today?",
  "We proclaim the word of life so that our joy may be complete; we have fellowship with the Father and with his Son. Easter is shared life. Our testimony completes our joy.",
  "Thomas sees and believes; Jesus blesses those who have not seen and yet believe. Easter faith is for us too. We are invited to believe on the basis of the witnesses and the Spirit.",
  "Jesus is taken up into heaven; the disciples are told he will return in the same way. Easter does not end with absence but with promise. We live between his ascension and his return.",
  "Peter and John are arrested for teaching in Jesus' name; there is no other name under heaven by which we must be saved. Easter name is the name above every name. We speak it with confidence and love.",
  "Philip meets the Ethiopian eunuch, explains the Scripture, and baptizes him. The good news spreads to the ends of the earth. Easter sends the church on the road. Who might need you to open the Word today?",
  "Nothing can separate us from the love of God in Christ Jesus our Lord. Neither death nor life nor anything in all creation. Easter love is unbreakable. We can rest in it.",
  "Always be prepared to give a reason for the hope that is in you; Christ suffered once for sins to bring us to God. Easter hope is defensible and gentle. We can share it with respect.",
  "Jesus is the resurrection and the life; whoever believes in him will live even though he dies. Easter is a person. We trust him, not only a concept.",
  "On this mountain the Lord will swallow up death forever and wipe away tears. Easter fulfills the prophets. We look forward to the feast and the end of sorrow.",
  "The stone that the builders rejected has become the cornerstone; this is the Lord's doing. Easter is the day the Lord has made; we rejoice and are glad in it.",
  "The believers devote themselves to the apostles' teaching, fellowship, breaking of bread, and prayer. Easter creates a rhythm of community. We are part of that rhythm.",
  "We do not grieve as those who have no hope; the Lord will descend and the dead in Christ will rise. Easter comforts grief with promise. We can mourn with hope.",
  "Behold, I am making all things new; I am the Alpha and the Omega. Easter points to the new creation. We live now as citizens of that coming reality.",
  "Jesus will give another Helper, the Spirit of truth; he will be in us and we in him. Easter sends the Spirit. We are not left alone.",
  "In prison, Paul and Silas pray and sing; an earthquake opens the doors; the jailer and his household believe. Easter breaks chains and opens households. Praise in the dark is still witness.",
  "The word is near you, in your mouth and in your heart; if you confess and believe, you will be saved. Easter is received by confession and faith. We can say it and mean it.",
  "Do not be surprised at the fiery trial; rejoice insofar as you share Christ's sufferings. Easter does not remove suffering but fills it with meaning and hope.",
  "Unless a grain of wheat falls into the earth and dies, it remains alone; but if it dies, it bears much fruit. Easter is the pattern of fruitful death. We can embrace the cost of love.",
  "Remember Jesus Christ, risen from the dead; if we have died with him, we will also live with him. Easter is worth remembering every day. We hold fast to the word of life.",
  "Let us run with endurance the race set before us, looking to Jesus, who endured the cross for the joy set before him. Easter endurance is possible because he finished first.",
  "We are God's children now; when he appears we shall be like him. Easter identity is both present and future. We live from it today.",
  "Jesus prays that those who believe may be one, so that the world may know that the Father sent him. Easter unity is our mission. Our love for one another points to him.",
];

const easterPrompts: string[][] = [
  ["Where do you need to hear that Jesus is risen—in your fears, your grief, or your doubt?", "Who could you 'run to tell' with the good news this week?"],
  ["What would it take for you to say, like Thomas, 'My Lord and my God'?", "Where do you need to touch the reality of resurrection in your life?"],
  ["Where is your 'Galilee'—the ordinary place Jesus is sending you?", "What would it look like to go there with Easter hope?"],
  ["When has God turned your confusion into remembrance of his words?", "What promise do you need to recall today?"],
  ["Where might Jesus be walking with you 'incognito' this week?", "How could you pay attention to his presence in Word or table?"],
  ["What would it look like to receive Jesus' peace and his commissioning today?", "Who needs to hear the message of repentance and forgiveness from you?"],
  ["Where has Jesus met you in your failure or your work?", "What might he be asking you to feed or tend?"],
  ["How could you speak the resurrection with clarity and grace to someone this week?", "What would it look like to be a witness, not only a believer?"],
  ["Is there a step of repentance or belonging you've been postponing?", "How could you respond to the gospel with your whole life?"],
  ["Where could you act in Jesus' name with mercy or boldness today?", "What would it look like to glorify him in your words or deeds?"],
  ["Where could you share or simplify so that others are provided for?", "How might your community reflect 'one heart and soul'?"],
  ["Where do you need courage to speak truth despite pressure?", "What would it look like to obey God rather than human authority?"],
  ["Who do you tend to exclude from the reach of the gospel?", "How might you extend the good news across a barrier this week?"],
  ["What old pattern do you need to count as dead?", "How could you walk in newness of life in one area today?"],
  ["How are you handing on the gospel to the next person or generation?", "What would it look like to pass it on clearly and lovingly?"],
  ["How does the certainty of resurrection shape your view of the future?", "What would you do differently if you really believed we will be raised?"],
  ["What would it look like to set your mind on things above today?", "Where do you need to remember that your life is hidden with Christ?"],
  ["What would it look like to live from 'living hope' rather than from fear or cynicism?", "Where do you need to be reminded of your inheritance?"],
  ["How could you 'long for pure spiritual milk' this week?", "Where do you need to be built into God's house?"],
  ["Where do you need to remember that by his wounds you have been healed?", "How could you extend that healing to someone else?"],
  ["What other 'gates' have you been trying instead of Jesus?", "How could you enter through him today?"],
  ["Where do you feel lost or uncertain of the way?", "How might Jesus as the way bring you peace?"],
  ["Where is your fruitfulness running dry?", "What would it look like to abide in him more intentionally?"],
  ["Where do you need to love Jesus more than safety or approval?", "How could you bear witness in a costly way?"],
  ["Who do you consider beyond the reach of the gospel?", "How might the risen Jesus be pursuing them—or you?"],
  ["How does Jesus' hold on the keys of death and Hades change your attitude toward death or loss?", "Where do you need to hear that he has overcome?"],
  ["Where is there a relationship or situation that needs reconciliation?", "How could you be an ambassador of Christ's peace?"],
  ["Where do you need to experience God's power at work in you?", "What would it look like to ask for eyes to see it?"],
  ["What would you count as loss for the sake of knowing Christ?", "What one thing could you press on toward today?"],
  ["Who could you share the word of life with so that joy is complete?", "How does fellowship with God and others sustain you?"],
  ["What doubts do you need to bring to Jesus and ask for his blessing?", "How might you believe without seeing?"],
  ["How does the promise of Jesus' return shape how you live today?", "What would it look like to live between ascension and return?"],
  ["Where do you need to speak the name of Jesus with confidence?", "What would it look like to do it with love?"],
  ["Who might need you to open the Scriptures and walk with them?", "Where could you go 'on the road' with the good news?"],
  ["What makes you doubt that nothing can separate you from God's love?", "How could you rest in that love today?"],
  ["How could you give a reason for the hope that is in you with gentleness?", "Who might need to hear it?"],
  ["Where do you need to hear that Jesus is the resurrection and the life?", "How might you trust him with your mortality or your grief?"],
  ["Where do you long for the day when death is swallowed up and tears are wiped away?", "How could you live in that hope today?"],
  ["How could you rejoice in the Lord today as the day he has made?", "Where do you need to remember that the rejected stone became the cornerstone?"],
  ["Where could you devote yourself to teaching, fellowship, breaking of bread, or prayer?", "What would it look like to deepen your belonging?"],
  ["Who do you grieve, and how does the hope of resurrection comfort you?", "How could you mourn with hope?"],
  ["Where do you need to live as a citizen of the new creation?", "What would it look like to embrace 'all things new'?"],
  ["How could you rely on the Spirit as your Helper today?", "Where do you feel alone and need to remember he is in you?"],
  ["Where are you in a 'prison' of circumstance or mood?", "What would it look like to pray and sing there?"],
  ["Is there a step of confession or belief you've been avoiding?", "How could you say the word that is near you?"],
  ["Where are you facing trial or suffering?", "How could you rejoice insofar as you share Christ's sufferings?"],
  ["What would it look like to let a 'grain of wheat' fall—to accept a cost for the sake of fruit?", "Where is love asking you to die to self?"],
  ["How could you remember Jesus Christ, risen from the dead, today?", "What would it look like to hold fast to the word of life?"],
  ["What race are you running, and how could you look to Jesus for endurance?", "Where do you need to remember the joy set before him?"],
  ["How does being God's child now shape your choices and your peace?", "What would it look like to live from that identity today?"],
  ["Where could you work for unity with other believers?", "How might your love for one another point the world to Jesus?"],
];

const easterEntries: ReadingDaySeed[] = Array.from({ length: 50 }, (_, i) => ({
  dayIndex: 77 + i,
  season: "EASTER",
  bibleReference: easterRefs[i % easterRefs.length]!,
  passageText: "",
  explanation: easterExplanations[i % easterExplanations.length]!,
  reflectionPrompts: easterPrompts[i % easterPrompts.length]!,
}));

// ----- Ordinary Time readings (dayIndex 127–365) -----
const ordinaryRefs = [
  "Genesis 1:1–5",
  "Genesis 12:1–9",
  "Exodus 3:1–15",
  "Deuteronomy 6:4–9",
  "Joshua 1:1–9",
  "1 Samuel 16:1–13",
  "Psalm 1:1–6",
  "Psalm 27:1–6",
  "Psalm 46:1–11",
  "Psalm 91:1–6",
  "Psalm 121:1–8",
  "Proverbs 3:1–12",
  "Isaiah 43:1–7",
  "Jeremiah 29:11–14",
  "Micah 6:6–8",
  "Matthew 6:9–13",
  "Matthew 6:25–34",
  "Matthew 7:24–29",
  "Matthew 11:28–30",
  "Matthew 25:31–40",
  "Mark 4:35–41",
  "Mark 10:13–16",
  "Luke 10:38–42",
  "Luke 15:11–32",
  "John 3:16–21",
  "John 8:12",
  "John 13:34–35",
  "John 15:1–11",
  "Romans 5:1–5",
  "Romans 12:1–2",
  "1 Corinthians 13:1–13",
  "Galatians 5:22–26",
  "Ephesians 2:8–10",
  "Philippians 4:4–9",
  "Colossians 3:12–17",
  "Hebrews 11:1–6",
  "James 1:2–8",
  "1 John 4:7–12",
  "Revelation 21:1–5",
];

const ordinaryExplanations: string[] = [
  "In the beginning God creates light and separates it from darkness. Ordinary time is rooted in a God who speaks order and goodness into existence. We can begin each day remembering that we live in a world called good by its Maker.",
  "God calls Abram to leave his country and go to a land he will be shown; Abram goes. Faith often looks like leaving the familiar for a promise we cannot yet see. Where might God be calling you to step out in trust?",
  "At the burning bush, God reveals his name and sends Moses to lead his people out of Egypt. Ordinary days can hold holy moments when God calls us by name and gives us a mission. What is he saying to you?",
  "Hear, O Israel: the Lord our God is one; love him with all your heart, soul, and strength. These words are to be on our hearts and taught to our children. Discipleship is caught as much as taught—in the rhythm of home and road.",
  "God commands Joshua to be strong and courageous and to meditate on the law day and night. Leadership and faithfulness depend on filling our minds with God's word. What would it look like to make space for that today?",
  "The Lord does not look at outward appearance but at the heart; Samuel anoints David. In ordinary time we are reminded that God sees and chooses differently than the world. How might you value heart over image today?",
  "Blessed is the one who does not walk in the counsel of the wicked but delights in the law of the Lord. The psalm contrasts two ways of life. We are invited to sink our roots into the stream of God's word and bear fruit in season.",
  "The Lord is my light and my salvation; whom shall I fear? The psalmist chooses trust in the face of threat. Ordinary time includes moments of fear; we can turn toward the one who is our stronghold.",
  "God is our refuge and strength, a very present help in trouble. Therefore we will not fear. When the earth seems to give way, the psalm points to a peace that comes from God's presence. Where do you need that refuge today?",
  "He who dwells in the shelter of the Most High will abide in the shadow of the Almighty. The psalm invites us to make our home in God's care. We can rest there even when the world feels unstable.",
  "I lift my eyes to the hills. From where does my help come? My help comes from the Lord. The psalm redirects our gaze from our circumstances to the Maker of heaven and earth. What would it look like to lift your eyes today?",
  "Trust in the Lord with all your heart; do not lean on your own understanding. In all your ways acknowledge him. Proverbs grounds everyday wisdom in relationship with God. We are invited to submit our plans to his direction.",
  "Do not fear, for I have redeemed you; I have called you by name, you are mine. God speaks comfort and identity over his people. In the middle of ordinary—or difficult—days, we can hear him say we belong to him.",
  "I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope. God's promise to exiles still speaks: he has plans we cannot always see. We can seek him and pray.",
  "What does the Lord require of you but to do justice, love kindness, and walk humbly with your God? Micah strips faith down to its core. Ordinary time is the arena for these three: justice, kindness, humility.",
  "Jesus teaches his disciples to pray: Our Father, hallowed be your name. The Lord's Prayer shapes our desires and our dependence. We can make it the rhythm of our days.",
  "Do not be anxious about your life; seek first the kingdom of God and his righteousness. Jesus redirects our worry toward trust and priority. What would it look like to seek his kingdom first in one area today?",
  "Everyone who hears these words of mine and does them is like a man who built his house on the rock. Obedience is the foundation that holds when storms come. We are invited to build on his word.",
  "Come to me, all who labor and are heavy laden, and I will give you rest. Jesus invites the weary to his easy yoke. Ordinary time is the right place to accept that rest and learn from him.",
  "As you did it to one of the least of these my brothers, you did it to me. Jesus identifies with the hungry, thirsty, stranger, naked, sick, and imprisoned. Our daily choices of mercy are encounters with him.",
  "Jesus calms the storm and asks his disciples why they are afraid. He is with us in the boat when the winds rise. Where do you need to hear his 'Peace, be still'—in your circumstances or your heart?",
  "Let the children come to me; do not hinder them, for to such belongs the kingdom of God. Jesus values the small and the dependent. We can come to him with childlike trust and welcome others the same way.",
  "Mary has chosen the good portion, which will not be taken away. Jesus affirms sitting at his feet over busyness. Ordinary time needs the discipline of stopping to listen before we run to do.",
  "The father sees his son from far off and runs to him. The parable of the prodigal son reveals God's heart: he is always watching for our return. We can come home and we can extend that welcome to others.",
  "God so loved the world that he gave his only Son. Jesus is the gift that saves; we respond in belief or in rejection. Ordinary time is full of moments to believe and to live in the light.",
  "I am the light of the world. Whoever follows me will not walk in darkness. Jesus offers himself as the source of light and direction. We can follow him one step at a time.",
  "A new commandment I give to you: love one another as I have loved you. By this all will know you are my disciples. Our love for each other is the public sign of belonging to Jesus. How could you show that love today?",
  "I am the vine; you are the branches. Abide in me and I in you. Fruitfulness comes from staying connected to Jesus. We can tend that connection through prayer, Scripture, and obedience.",
  "We have peace with God through our Lord Jesus Christ; we rejoice in hope and in suffering, knowing that suffering produces endurance and hope. Paul links peace, hope, and character. We can lean into that chain in hard days.",
  "Do not be conformed to this world, but be transformed by the renewal of your mind. Paul calls us to a different shape of thinking. Ordinary time is when we practice that renewal day by day.",
  "Love is patient and kind; it does not envy or boast. Paul's portrait of love is a mirror for our relationships. We can ask which quality we most need to grow in today.",
  "The fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control. Paul points to the Spirit's work in our character. We can cooperate with him in one of these today.",
  "By grace you have been saved through faith; we are his workmanship, created for good works. We are not saved by works but for works. Ordinary time is the field where those good works are lived out.",
  "Rejoice in the Lord always; do not be anxious; in everything by prayer and supplication with thanksgiving let your requests be made known. Paul links joy, peace, and prayer. We can practice that trio today.",
  "Put on compassion, kindness, humility, meekness, patience, forbearance, and love. Paul dresses us for community. We can choose one 'garment' to wear intentionally in a relationship or situation.",
  "Faith is the assurance of things hoped for; without faith it is impossible to please God. The writer of Hebrews celebrates the cloud of witnesses. We can run our race remembering we are not alone.",
  "Count it all joy when you meet trials; ask God for wisdom in faith. James reframes hardship as a chance for growth and wisdom. We can bring our current trial to God and ask for his perspective.",
  "Beloved, let us love one another, for love is from God. Whoever loves has been born of God and knows God. John ties love and knowledge of God together. We can express that love in a concrete way today.",
  "Behold, I am making all things new. The vision of a new heaven and new earth closes the Scripture with hope. Ordinary time is lived in the light of that coming renewal.",
];

const ordinaryPrompts: string[][] = [
  ["How could you begin today by acknowledging God as Creator and the world as his?", "Where do you need to remember that light was called good?"],
  ["What would it look like to obey God's call even when the destination is unclear?", "Where might you be holding back from a step of faith?"],
  ["Where do you sense God calling you by name or sending you?", "How could you respond with a willing 'Here I am'?"],
  ["How could you love the Lord with all your heart in one situation today?", "Who could you teach or model these words for?"],
  ["What would it look like to be strong and courageous in one area this week?", "How could you make time to meditate on God's word?"],
  ["Where are you tempted to judge by appearance instead of heart?", "How might you value what God values in someone today?"],
  ["What would it look like to delight in God's word today?", "Where do you need to sink your roots deeper?"],
  ["What are you afraid of, and how could you turn that fear toward the Lord?", "Where do you need him as your light and salvation?"],
  ["Where do you need refuge or strength right now?", "How could you turn toward God as your very present help?"],
  ["What would it look like to dwell in the shelter of the Most High today?", "Where do you need to rest in his shadow?"],
  ["Where do you need to lift your eyes from your circumstances to the Lord?", "How could you remind yourself that your help comes from him?"],
  ["Where are you leaning on your own understanding instead of trusting the Lord?", "What would it look like to acknowledge him in one decision?"],
  ["Where do you need to hear that you are called by name and belong to God?", "How could you offer that assurance to someone else?"],
  ["What plans are you clinging to that God might be redirecting?", "How could you seek him and his plans in prayer?"],
  ["Which of the three—justice, kindness, or humility—do you most need to practice today?", "What is one concrete step?"],
  ["How could you pray the Lord's Prayer slowly and mean it today?", "Which line do you need to lean into?"],
  ["What are you anxious about, and how could you seek God's kingdom first there?", "What would it look like to let him carry the rest?"],
  ["Where is your 'house' built on sand rather than on obedience to Jesus?", "What would it look like to dig and build on the rock?"],
  ["Where do you need to come to Jesus for rest?", "What would it look like to take his yoke and learn from him?"],
  ["Who is 'the least of these' in your path this week?", "What would it look like to serve Jesus in serving them?"],
  ["Where do you need Jesus to speak peace to your storm?", "How could you trust his presence in the boat?"],
  ["How could you approach Jesus with childlike trust today?", "Who could you welcome in his name?"],
  ["What would it look like to choose the good portion—to sit at his feet—before you run to do?", "Where are you too busy to listen?"],
  ["Do you need to come home to the Father like the prodigal?", "Or extend the Father's welcome to someone else?"],
  ["Where do you need to believe in Jesus and step out of the darkness?", "How could you live in the light today?"],
  ["Where are you walking in darkness that Jesus could light up?", "What would it look like to follow him one step today?"],
  ["How could you love another believer as Jesus has loved you?", "Who specifically could you serve or encourage?"],
  ["Where is your connection to Jesus weak or neglected?", "What would it look like to abide in him today?"],
  ["Where do you need to rejoice in hope or find meaning in suffering?", "How could you let suffering produce endurance?"],
  ["Where are you being conformed to the world instead of transformed?", "What would it look like to renew your mind in one area?"],
  ["Which quality of love do you most need to grow in—patience, kindness, humility?", "What would it look like to practice it today?"],
  ["Which fruit of the Spirit do you most need to rely on or cultivate?", "How could you cooperate with the Spirit in that?"],
  ["What good works has God prepared for you to walk in today?", "How could you live from grace rather than for approval?"],
  ["What would it look like to rejoice, pray with thanksgiving, and let your requests be made known?", "Where do you need his peace to guard your heart?"],
  ["Which 'garment'—compassion, kindness, patience, etc.—could you put on in a specific relationship?", "What would it look like to wear it today?"],
  ["Who in the cloud of witnesses encourages you to run your race?", "What would it look like to run with endurance today?"],
  ["What trial are you facing, and how could you count it joy or ask for wisdom?", "Where do you need God's perspective?"],
  ["Who could you love in a concrete way today as a sign that you know God?", "How could you make that love visible?"],
  ["How could you live today in the light of 'all things new'?", "Where do you need the hope of the new creation?"],
];

const ordinaryEntries: ReadingDaySeed[] = Array.from(
  { length: 365 - 126 },
  (_, i) => ({
    dayIndex: 127 + i,
    season: "ORDINARY",
    bibleReference: ordinaryRefs[i % ordinaryRefs.length]!,
    passageText: "",
    explanation: ordinaryExplanations[i % ordinaryExplanations.length]!,
    reflectionPrompts: ordinaryPrompts[i % ordinaryPrompts.length]!,
  })
);

// ----- Export: exactly 365 entries -----
export const READING_PLAN_365: ReadingDaySeed[] = [
  sampleAdvent,
  sampleChristmas,
  sampleLent,
  sampleEaster,
  sampleOrdinary1,
  sampleOrdinary2,
  sampleOrdinary3,
  ...adventEntries,
  ...christmasEntries,
  ...lentEntries,
  ...easterEntries,
  ...ordinaryEntries,
];

// Assert length
if (READING_PLAN_365.length !== 365) {
  throw new Error(
    `READING_PLAN_365 must have 365 entries, got ${READING_PLAN_365.length}`
  );
}
