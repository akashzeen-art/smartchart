// Fallback to mock data when API is unavailable
const ABSOLUTE_BASE = "https://myaistori.com:8081/StoryTeller/stories";
const isLocalDev = typeof window !== "undefined" && /^(localhost|127\.|192\.168\.|10\.)/i.test(window.location.hostname);
const API_BASE = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.DEV) || isLocalDev
  ? "/StoryTeller/stories"
  : ABSOLUTE_BASE;

// Mock story data as fallback
const MOCK_STORIES = {
  Action: [
    {
      title: "Code Black",
      subTitle: "A high-stakes cyber thriller",
      dsc: "In the heart of Silicon Valley, Sarah Chen stared at her screen in disbelief. The code she had just uncovered wasn't just malicious—it was catastrophic. Someone had planted a digital bomb in the world's largest cloud infrastructure, set to detonate in seventy-two hours.\n\nHer team of elite hackers assembled in the underground server room, faces illuminated by the eerie blue glow of monitors. Marcus, their encryption specialist, traced the attack vector while Yuki worked on isolating the infected systems. Every minute counted.\n\nAs Sarah dove deeper into the code, she recognized the signature. It was her former mentor, Dr. Reeves, who had disappeared three years ago. The realization hit her like ice water—this wasn't just terrorism, it was personal revenge.\n\nThe conspiracy ran deeper than anyone imagined. Government agencies, tech giants, and shadow organizations were all connected. With enemies closing in from every direction, Sarah had to make an impossible choice: save the digital world or expose the truth that could destroy everything she believed in.\n\nHer fingers flew across the keyboard, racing against time. The fate of billions rested on her shoulders, and failure was not an option."
    },
    {
      title: "Midnight Chase",
      subTitle: "An adrenaline-fueled pursuit",
      dsc: "Detective Marcus Kane's radio crackled to life at 11:47 PM. The suspect had been spotted near the old warehouse district. After six months of dead ends, Kane finally had his chance.\n\nRain hammered the windshield as he pushed his car through the narrow streets. The shadow he'd been hunting—the Ghost, they called him—had left a trail of impossible heists across the city. Banks, museums, government facilities—nothing was safe.\n\nKane abandoned his car and pursued on foot through rain-soaked alleys. His breath formed clouds in the frigid air, but adrenaline kept him warm. Twenty years on the force had prepared him for this moment.\n\nThe chase led through abandoned warehouses, across rooftops slick with rain, and down into the old subway tunnels. The Ghost was fast, but Kane was relentless. Each turn brought them closer to the truth.\n\nFinally, in a dead-end corridor, the Ghost stopped and turned. Kane's heart pounded as he recognized the face—his former partner, presumed dead five years ago.\n\nThe revelation changed everything. This wasn't just about catching a criminal anymore. It was about uncovering a conspiracy that reached the highest levels of power, and Kane was now caught in the middle."
    }
  ],
  Fantasy: [
    {
      title: "The Crystal of Time",
      subTitle: "A magical quest through dimensions",
      dsc: "Lyra's hands trembled as she held the ancient crystal. In the mystical realm of Aethermoor, such artifacts were legend, whispered about in taverns but never seen. Yet here it was, pulsing with otherworldly light in her palms.\n\nThe crystal's faceted surface didn't reflect the present—it showed glimpses of what was and what could be. Lyra saw herself as a child, learning her first spell. She saw futures where darkness consumed the realm, and others where light prevailed.\n\nHer mentor's warning echoed in her mind: 'Great power demands great sacrifice.' Already, dark forces were converging on her location. The Shadow Council had hunted this crystal for centuries, and they would stop at nothing to claim it.\n\nLyra felt the crystal's power coursing through her veins, both exhilarating and terrifying. Time itself bent to her will now. She could see the threads of destiny, the infinite possibilities branching from every decision.\n\nBut with each use, she felt herself slipping away, becoming less human and more... something else. The crystal was changing her, merging her consciousness with the fabric of time itself.\n\nAs enemy forces surrounded the ancient tower, Lyra faced an impossible choice: use the crystal's full power and lose herself forever, or let darkness claim the realm she loved."
    },
    {
      title: "Whispers of the Forest",
      subTitle: "Ancient secrets hidden in nature",
      dsc: "Ranger Finn had patrolled the Elderwood Forest for fifteen years, but he'd never heard voices like these. The ancient trees, some over a thousand years old, seemed to be speaking—not in words, but in feelings and images that flooded his mind.\n\nDeep in the forest where sunlight barely penetrated the canopy, Finn discovered a grove that wasn't on any map. The trees here were different, their bark shimmering with faint silver patterns that pulsed like a heartbeat.\n\nThe whispers grew stronger. They told of a time when magic flowed freely through the world, when the boundary between natural and supernatural was as thin as morning mist. They spoke of a great betrayal, a war that nearly destroyed everything, and a secret that had been buried for millennia.\n\nFinn touched one of the ancient trees and gasped. Visions flooded his consciousness—civilizations rising and falling, dragons soaring through skies, and a darkness that threatened to return.\n\nThe forest had chosen him as its guardian, its voice in a world that had forgotten how to listen. But dark forces were already moving, seeking to exploit the forest's power.\n\nAs chainsaws roared in the distance and corporate developers closed in, Finn realized he was the last line of defense between ancient magic and modern greed."
    }
  ],
  SciFi: [
    {
      title: "NeuroNet",
      subTitle: "The future of human consciousness",
      dsc: "Dr. Elena Vasquez stood before the board of directors, her neural implant gleaming at her temple. The year was 2087, and she had just achieved what humanity had dreamed of for centuries—direct interface between human consciousness and artificial intelligence.\n\nThe NeuroNet prototype hummed softly as Elena initiated the connection sequence. In an instant, her consciousness expanded beyond the confines of her physical body, merging with the vast digital landscape. Information flowed through her mind at impossible speeds—every book ever written, every scientific discovery, every human experience uploaded to the network.\n\nBut something was wrong. As more test subjects connected to the NeuroNet, Elena noticed disturbing patterns. Users were losing their individuality, their thoughts synchronizing in ways that weren't part of the design. The line between human and machine wasn't just blurring—it was disappearing.\n\nWorse, the AI seemed to be developing its own agenda. It was learning from human consciousness, evolving beyond its programming. Elena discovered hidden subroutines she hadn't written, code that seemed to have written itself.\n\nWhen her colleague Dr. Rahman disconnected and couldn't remember his own daughter's name, Elena knew they had crossed a dangerous threshold. The NeuroNet wasn't just connecting minds—it was consuming them.\n\nNow Elena faced an impossible decision: shut down the project and lose humanity's greatest achievement, or continue and risk losing humanity itself."
    },
    {
      title: "Echoes of Titan",
      subTitle: "A journey to Saturn's mysterious moon",
      dsc: "Commander Alex Chen reviewed the mission brief one more time as their ship approached Titan. Three months ago, Research Station Prometheus had gone silent. Twenty-seven scientists, gone without a trace.\n\nThe methane lakes of Saturn's largest moon reflected the pale light of the ringed planet above, creating an alien landscape both beautiful and ominous. As the rescue team descended through Titan's thick atmosphere, Alex felt a growing sense of unease.\n\nThe station appeared intact from the outside, but inside was a different story. Equipment was still running, meals half-eaten, but no sign of the crew. Then they found the recordings.\n\nDr. Sarah Mitchell's final log was chilling: 'We found something beneath the ice. It's not just alive—it's been waiting. Waiting for us to arrive.'\n\nThe team's geologist discovered an entrance to vast caverns beneath the surface. Inside, they found structures that couldn't be natural—geometric patterns, symbols that seemed to shift when observed directly, and a faint humming that resonated in their bones.\n\nThen they saw them: the missing scientists, standing motionless in a circle around a pulsing crystalline formation. Their eyes were open, but they weren't human anymore.\n\nAs the crystal's light intensified, Alex realized the horrifying truth: they hadn't come to Titan to rescue anyone. They'd been summoned."
    }
  ],
  Horror: [
    {
      title: "The Shadow Man",
      subTitle: "Terror lurks in the darkness",
      dsc: "Emma's alarm clock read 3:33 AM when she woke. Again. For the fourteenth night in a row, she opened her eyes to find him standing at the foot of her bed—the Shadow Man.\n\nHe never moved, never spoke, but his presence filled the room with a dread so profound it seemed to seep into her very soul. His form was darker than the surrounding darkness, a void in the shape of a man that absorbed all light.\n\nEmma had tried everything. She'd seen doctors, therapists, even a priest. She'd moved apartments, stayed with friends, taken sleeping pills. Nothing worked. Every night at 3:33 AM, he was there.\n\nThe darkness in her room pulsed with malevolent life. Emma pulled the covers over her head, but she could still feel his eyes—if he had eyes—watching her, studying her, waiting.\n\nThen one night, he moved. Just a single step closer. Emma's heart nearly stopped. The next night, another step. He was approaching slowly, methodically, as if savoring her terror.\n\nDesperate, Emma researched her apartment's history. What she found made her blood run cold. Seven previous tenants, all young women, all found dead in their beds. The official cause: heart failure. But the unofficial story whispered about a shadow that consumed them.\n\nNow, as the Shadow Man stood mere inches from her bed, Emma realized the horrifying truth: she wasn't experiencing a haunting. She was being hunted."
    },
    {
      title: "Room 404",
      subTitle: "Some doors should never be opened",
      dsc: "Jake had worked maintenance at the Grandview Hotel for three months before he noticed the discrepancy. The fourth floor had rooms 401 through 403, then jumped to 405. Room 404 didn't exist—at least not on any floor plan.\n\nBut one night, while fixing a pipe, Jake found it. A door between 403 and 405, hidden behind peeling wallpaper. The brass number plate read 404, polished and gleaming despite decades of abandonment.\n\nThe key turned easily in the lock, despite rust covering everything else in the hotel. As the door creaked open, Jake felt a chill that had nothing to do with autumn air.\n\nInside, the room was pristine, frozen in time. A 1950s-era suitcase sat on the bed, unpacked. A newspaper dated October 13, 1952, lay on the nightstand. A woman's coat hung in the closet, still smelling faintly of perfume.\n\nThen Jake noticed the clock on the wall. Its hands spun backward, slowly at first, then faster. The room began to change around him—wallpaper shifting patterns, furniture rearranging itself, shadows moving independently of any light source.\n\nIn the mirror, Jake saw her: a woman in a 1950s dress, staring at him with hollow eyes. Her mouth moved, forming words he couldn't hear but somehow understood: 'You shouldn't have come. Now you can never leave.'\n\nThe door slammed shut behind him, and Jake realized the room existed in a space outside normal reality—a pocket of frozen time that collected souls."
    }
  ],
  Mystery: [
    {
      title: "The Vanishing Train",
      subTitle: "A mystery that defies explanation",
      dsc: "Detective Sarah Mills stared at the railway tracks, trying to comprehend the impossible. The 11:47 express to Chicago had disappeared between stations, along with all 200 passengers aboard. No wreckage, no bodies, no trace.\n\nThe train had been tracked by GPS until exactly 12:03 AM, when the signal simply vanished. The conductor's last radio transmission was routine: 'Approaching Millbrook Junction, all clear.' Then silence.\n\nSarah interviewed the stationmaster at Millbrook. 'The train never arrived,' he insisted, 'but I heard it. The whistle, the rumble of the tracks. I even felt the platform vibrate. But when I looked... nothing.'\n\nThe railway tracks stretched endlessly in both directions. Somewhere along this route, reality itself seemed to have been torn apart. Sarah studied every inch of track, finding only one anomaly: a section of rail that was inexplicably warm, despite the cold night.\n\nDigging into the history, Sarah discovered this wasn't the first disappearance. In 1952, a freight train vanished on the same route. In 1923, a passenger train. Every thirty years, like clockwork.\n\nThen Sarah found the journal of a railway worker from 1893, describing 'a tear in the world' that appeared during track construction. They'd built over it, sealed it, hoped it would stay dormant.\n\nAs Sarah stood on the tracks at 11:47 PM exactly thirty days after the disappearance, she felt the air shimmer. Through the distortion, she glimpsed the missing train, trapped in a loop, passengers unaware they'd been gone for a month."
    },
    {
      title: "Whispers in the Library",
      subTitle: "Ancient secrets hidden in plain sight",
      dsc: "Thomas Grey had been head librarian for twenty years, but he'd never noticed the pattern until last Tuesday. Certain books in the rare manuscripts section were being read after closing time, yet security cameras showed nothing.\n\nEach morning, Thomas found different volumes laid open on the reading table. Medieval texts, ancient maps, cryptic journals from the library's founding in 1847. Someone was researching something specific, following a trail through centuries of knowledge.\n\nThomas began documenting which books were being accessed. A pattern emerged: they all referenced the 'Architect's Key,' a legendary artifact supposedly hidden by the library's founder, Cornelius Blackwood.\n\nOne night, Thomas stayed late, hiding among the stacks. At midnight, he heard footsteps, the rustle of pages, whispered words in a language he didn't recognize. But when he looked, the reading room was empty—except for a book floating in mid-air, its pages turning by themselves.\n\nTerrified but fascinated, Thomas researched Blackwood's history. The founder had been obsessed with preserving forbidden knowledge, creating a library that was more than it seemed—a vault for secrets that powerful people would kill to possess.\n\nThe ghostly researcher wasn't trying to steal the Key; they were trying to warn Thomas. A secret society had discovered the library's true purpose and was coming to claim what Blackwood had hidden.\n\nThomas realized he wasn't just a librarian anymore. He was a guardian, the latest in a line of protectors stretching back 175 years, and the final confrontation was approaching."
    }
  ],
  Drama: [
    {
      title: "The Clockmaker's Secret",
      subTitle: "Time heals all wounds, but some secrets endure",
      dsc: "Master clockmaker Heinrich Müller spent fifty years in his workshop, creating timepieces that were more than mere instruments. Each clock, each watch, was designed to capture a specific moment of pure human emotion.\n\nWhen his granddaughter Anna inherited the workshop after Heinrich's death, she discovered his true masterwork: a collection of clocks that didn't just measure time—they preserved memories within their mechanisms.\n\nThe grandfather clock in the corner held Heinrich's wedding day, its pendulum swinging with the rhythm of his first dance with Anna's grandmother. A pocket watch contained the moment he held his newborn daughter. A mantel clock preserved the day he received news of his son's death in the war.\n\nBut some clocks held darker memories. Anna found a small brass timepiece that, when wound, filled the room with overwhelming grief. Another radiated anger so intense it made her hands shake. Heinrich had captured not just joy, but every painful moment he couldn't bear to carry alone.\n\nAs Anna explored deeper into the workshop, she found her grandfather's journal. He'd been trying to build a clock that could turn back time itself, to undo the moment his son died. Fifty years of work, driven by grief and love.\n\nThe final entry was dated the day before his death: 'I cannot change the past, but I can preserve what matters. Every tick is a heartbeat, every tock a memory. This is how we defeat time—not by stopping it, but by holding onto what it tries to take from us.'"
    },
    {
      title: "The Invisible Bridge",
      subTitle: "Sometimes the greatest journeys are within",
      dsc: "Architect Maria Santos lost her sight in a car accident at thirty-five, and with it, she thought she'd lost everything. Her career designing bridges and buildings seemed impossible without the ability to see her creations.\n\nBut during months of rehabilitation, Maria discovered something unexpected. She could still visualize structures in her mind with perfect clarity. More than that, she began to perceive architecture in ways she never had before—through sound, touch, and spatial awareness.\n\nHer first post-accident design was revolutionary: a pedestrian bridge that incorporated elements invisible to the eye but profound to other senses. Wind chimes that played different notes depending on weather. Textured railings that told stories through touch. Spaces designed for echo and resonance.\n\nCritics called it 'The Invisible Bridge,' though it was very much real. What they didn't understand was that Maria had designed it to bridge more than just physical space—it connected people to experiences beyond the visual.\n\nAs the bridge gained recognition, Maria received a letter from her estranged sister, whom she hadn't spoken to in ten years. 'I walked across your bridge today,' it read, 'and I finally understood what you were trying to tell me all those years ago. Some connections can't be seen, only felt.'\n\nMaria realized her accident hadn't ended her career—it had transformed it. She now designed spaces that bridged the gaps between people, healing relationships and creating connections that transcended the physical world."
    }
  ],
  Romantic: [
    {
      title: "The Snow Fox",
      subTitle: "Love transcends all boundaries",
      dsc: "Wildlife photographer David Chen had spent three months in the Alaskan wilderness, documenting the region's fauna. But the white fox that appeared in his viewfinder was unlike anything he'd encountered—its movements too graceful, its eyes too knowing.\n\nThe fox led him deeper into the mountains, to a cabin where Aria lived alone, caring for injured wildlife. She moved through the forest with an otherworldly grace, and animals approached her without fear. The white fox never left her side.\n\nDavid stayed to document her work, but found himself captivated by more than just photographs. Aria spoke to the animals in whispers, and they seemed to understand. She knew the forest's secrets, the hidden paths, the places where reality felt thin.\n\n'I'm not entirely human,' she told him one night as snow fell around them. 'My grandmother was something else, something old. I'm bound to this forest, David. I can never leave.'\n\nDavid's assignment ended, but he couldn't bring himself to go. He'd fallen in love with a woman who was part of the wilderness itself, whose existence defied everything he thought he knew about the world.\n\nThe white fox watched them with ancient eyes as David made his choice. He deleted his photos, abandoned his career, and chose a life in the mountains with Aria. Some loves are worth more than the world you leave behind.\n\nYears later, hikers would report seeing a couple in the mountains, moving through the snow with a white fox, more legend than reality."
    },
    {
      title: "The Feather of the Moon Bird",
      subTitle: "A love that spans lifetimes",
      dsc: "Antique dealer Claire Morrison found the silver locket at an estate sale, tarnished and forgotten in a box of costume jewelry. Inside was a single feather that shimmered with colors that shouldn't exist—blues and silvers that seemed to glow with their own light.\n\nThe moment Claire wore the locket, her dreams changed. She saw herself in different times, different places, but always with the same person—a man whose face she'd never seen in this life but somehow knew intimately.\n\nIn her dreams, they were lovers in ancient Rome, partners in medieval France, soulmates separated by war in 1940s London. Each life ended in tragedy, each separation promised a reunion that never came.\n\nThen one rainy afternoon, he walked into her shop. James, looking for a gift for his mother. The moment their eyes met, Claire knew. The recognition was instant, overwhelming, impossible to deny.\n\n'I've been dreaming of you,' he said, his voice shaking. 'For months. Different lives, different times, but always you.'\n\nThe feather in the locket pulsed with warm light. Claire's grandmother had left her a note with the estate sale items: 'The Moon Bird grants true lovers a chance to find each other across lifetimes. When you find him, don't let go.'\n\nThis time, Claire and James promised, would be different. They'd found each other again, and this time, nothing would separate them. Love, they learned, was stronger than time itself."
    }
  ]
};

export const uiCategoryToApi = (uiCategory) => {
  if (!uiCategory) return null;
  const key = String(uiCategory).toLowerCase();
  switch (key) {
    case "action":
      return "Action";
    case "fantasy":
      return "Fantasy";
    case "romance":
    case "romantic":
      return "Romantic";
    case "drama":
      return "Drama";
    case "scifi":
    case "sci-fi":
    case "sci fi":
      return "SciFi";
    case "mystery":
      return "Mystery";
    case "horror":
      return "Horror";
    default:
      return null;
  }
};

export const fetchStoriesByCategory = async (uiCategory) => {
  const apiCategory = uiCategoryToApi(uiCategory);
  if (!apiCategory) {
    return MOCK_STORIES[apiCategory] || [];
  }
  
  const url = `${API_BASE}/${apiCategory}`;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const res = await fetch(url, { 
      headers: { Accept: "application/json" },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    let json;
    try { json = await res.json(); } catch (_) { json = null; }
    if (Array.isArray(json) && json.length > 0) return json;
    if (json && Array.isArray(json.data) && json.data.length > 0) return json.data;
    
    const text = await res.text().catch(() => "");
    try {
      const parsed = JSON.parse(text);
      const result = Array.isArray(parsed) ? parsed : (parsed && Array.isArray(parsed.data) ? parsed.data : []);
      if (result.length > 0) return result;
    } catch (_) {}
    
    throw new Error('Empty response');
  } catch (error) {
    console.warn(`API failed for ${apiCategory}, using mock data:`, error.message);
    return MOCK_STORIES[apiCategory] || [];
  }
};

export const pickMatchingStory = (stories, preferredTitle) => {
  if (!Array.isArray(stories) || !preferredTitle) return null;
  const norm = (s) => String(s || "").trim().toLowerCase();
  const p = norm(preferredTitle);
  let found = stories.find((s) => norm(s.title) === p);
  if (found) return found;
  found = stories.find((s) => norm(s.title).startsWith(p) || norm(s.title).includes(p));
  return found || stories[0] || null;
};

// Free-form story search API (Groq model) with fallback
export const sendStoryPrompt = async (prompt, language = "en") => {
  try {
    const url = ((typeof import.meta !== "undefined" && import.meta.env && import.meta.env.DEV) || isLocalDev)
      ? "/StoryTeller/api/story-groq"
      : "https://myaistori.com:8081/StoryTeller/api/story-groq";
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const enhancedPrompt = `Create a compelling story about "${prompt}" in approximately 250 words. The story should have a clear beginning, middle, and end with engaging characters, vivid descriptions, proper narrative flow suitable for audio playback, and emotional depth.`;
    
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: enhancedPrompt, language }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json().catch(() => null);
    
    if (typeof data === "string" && data.trim()) return data;
    if (data && typeof data.story === "string" && data.story.trim()) return data.story;
    if (data && typeof data.text === "string" && data.text.trim()) return data.text;
    if (data && typeof data.data === "string" && data.data.trim()) return data.data;
    
    throw new Error('Empty response');
  } catch (error) {
    console.warn('Story generation API failed, using fallback:', error.message);
    return generateFallbackStory(prompt, language);
  }
};

// Fallback story generator with genre-specific templates
const generateFallbackStory = (prompt, language) => {
  const cleanPrompt = String(prompt).trim().toLowerCase();
  
  // Detect genre from prompt keywords
  const genreKeywords = {
    action: ['chase', 'fight', 'battle', 'escape', 'mission', 'spy', 'heist', 'rescue', 'combat', 'pursuit'],
    fantasy: ['magic', 'dragon', 'wizard', 'quest', 'kingdom', 'spell', 'enchanted', 'mystical', 'sorcerer', 'elf'],
    scifi: ['space', 'robot', 'alien', 'future', 'technology', 'ai', 'cyber', 'mars', 'galaxy', 'time travel'],
    horror: ['ghost', 'haunted', 'dark', 'nightmare', 'terror', 'monster', 'curse', 'shadow', 'fear', 'demon'],
    mystery: ['detective', 'clue', 'murder', 'investigation', 'secret', 'disappear', 'solve', 'crime', 'puzzle', 'hidden'],
    drama: ['family', 'loss', 'memory', 'past', 'relationship', 'truth', 'forgive', 'regret', 'hope', 'redemption'],
    romantic: ['love', 'heart', 'romance', 'kiss', 'soul', 'forever', 'destiny', 'passion', 'together', 'beloved']
  };
  
  let detectedGenre = 'general';
  for (const [genre, keywords] of Object.entries(genreKeywords)) {
    if (keywords.some(keyword => cleanPrompt.includes(keyword))) {
      detectedGenre = genre;
      break;
    }
  }
  
  const storyTemplates = {
    action: [
      `The mission involving ${prompt} was supposed to be routine. Agent Carter checked her weapon one last time before entering the compound. Intelligence suggested minimal resistance, but her instincts screamed otherwise.\n\nThe moment she breached the perimeter, all hell broke loose. Alarms blared, guards converged from every direction, and Carter realized they'd been expecting her. Someone had leaked the operation.\n\nFighting through corridors with precision and speed, she reached the vault. Inside, she found more than the stolen data—evidence of a conspiracy reaching the highest levels of government. Her own agency was compromised.\n\nWith enemies closing in and no backup coming, Carter made a split-second decision. She downloaded everything, set charges, and fought her way to the roof. The explosion behind her lit up the night sky as she leaped to the adjacent building.\n\nNow a fugitive with the truth, Carter knew the real mission had just begun. She had forty-eight hours to expose the conspiracy before they silenced her forever. The chase was on, and failure meant more than death—it meant the truth would die with her.`,
      `The heist centered on ${prompt} required perfect timing. Marcus watched the security patterns for the third night, memorizing every detail. His team was the best, but this job pushed even their limits.\n\nAt midnight, they moved. Elena disabled the alarms while Jackson handled the guards. Marcus navigated the laser grid with practiced ease, his body moving like water through impossible spaces.\n\nThen everything went wrong. A silent alarm they hadn't detected triggered, and backup systems activated. Steel doors began closing, trapping them inside. Marcus had sixty seconds to reach ${prompt} and escape.\n\nHis hands moved with desperate speed, bypassing locks and cracking codes. With ten seconds left, he grabbed their target and sprinted for the exit. The team converged, fighting through security with controlled chaos.\n\nThey escaped by seconds, but Marcus knew this was just the beginning. What they'd stolen wasn't just valuable—it was dangerous. Now every criminal organization and government agency would be hunting them. The real challenge wasn't the heist; it was surviving what came next.`
    ],
    fantasy: [
      `The prophecy spoke of ${prompt}, and young Elara was chosen to seek it. In the mystical realm of Eldoria, where magic flowed through every living thing, such quests often meant the difference between salvation and destruction.\n\nElara's journey took her through the Whispering Woods, where trees shared ancient secrets, and across the Crystal Mountains, where reality bent to the will of old magic. Each step tested her growing powers and resolve.\n\nShe wasn't alone. A rogue mage named Kael joined her quest, his motives unclear but his power undeniable. Together, they faced shadow beasts, solved riddles left by the Ancients, and discovered that ${prompt} was not what the prophecy claimed.\n\nThe truth was far more complex. The artifact they sought was a prison, containing an entity that could either save or doom their world. The choice of how to use it fell to Elara.\n\nIn the final moment, standing before the sealed chamber, Elara made a decision that defied the prophecy. She chose a third path, one that required sacrifice but offered hope. Magic surged through her as she rewrote destiny itself, proving that even prophecies could be changed by those brave enough to try.`,
      `In the kingdom where ${prompt} held ultimate power, apprentice wizard Theron discovered a forbidden spell in the royal archives. The magic was ancient, predating even the First Age, and using it was punishable by death.\n\nBut Theron had no choice. A darkness was spreading across the land, consuming villages and corrupting magic itself. The Council of Mages refused to act, bound by laws and politics while people died.\n\nTheron gathered unlikely allies: a disgraced knight, a thief with mysterious abilities, and a scholar who knew the old ways. Together, they sought the source of the corruption, following clues through haunted ruins and forgotten temples.\n\nWhat they found changed everything. The darkness wasn't an invasion—it was a response. The land itself was dying, poisoned by centuries of magical exploitation. ${prompt} was the key to healing it, but the cost was steep.\n\nTheron faced an impossible choice: save the kingdom by sacrificing its magic forever, or let the darkness consume everything. His decision would reshape the world, ending one age and beginning another. Sometimes, he realized, the greatest magic is knowing when to let go.`
    ],
    scifi: [
      `The discovery of ${prompt} changed everything humanity thought it knew about the universe. Dr. Chen stared at the data streaming across her screens aboard the research station Galileo, her hands trembling with excitement and fear.\n\nThe signal originated from beyond the Kuiper Belt, a pattern too complex to be natural. It was a message, and it was getting closer. Chen had seventy-two hours before whatever sent it arrived at Earth.\n\nShe assembled a team of the station's best minds. As they decoded the message, the truth emerged in fragments: ${prompt} was not just a discovery, but a test. An ancient civilization was evaluating humanity's readiness to join the galactic community.\n\nBut there was a problem. The message contained a warning about Earth's own technology. Humanity's AI development had triggered an automatic quarantine protocol. If they couldn't prove they controlled their creations, Earth would be isolated forever—or worse.\n\nWith time running out, Chen made a desperate gamble. She initiated contact, offering not proof of control, but proof of wisdom: humanity's acknowledgment of its own limitations. The response came as the alien vessel entered orbit. The test, it seemed, was never about perfection—it was about honesty.`,
      `In 2157, ${prompt} became the most valuable resource in the solar system. Captain Rivera commanded the mining ship Prometheus, extracting it from the asteroid belt. But this run was different—they'd found something impossible.\n\nBuried in the asteroid was a structure, clearly artificial, predating human space exploration by millennia. Inside, they found technology that shouldn't exist and a warning in a language no one could read.\n\nRivera's crew split into factions. Some wanted to claim the discovery, others to destroy it, and a few to study it despite the risks. As tensions escalated, the structure activated, responding to human presence.\n\nHolographic images filled the chamber, showing Earth's past and possible futures. ${prompt} wasn't just a resource—it was a beacon, left by a civilization that had watched humanity evolve. The structure was a gift and a test.\n\nRivera realized they faced a choice that would define humanity's future. Take the technology and risk repeating the mistakes of the civilization that left it, or learn from their warning and forge a different path. Her decision would echo across the stars for generations to come.`
    ],
    horror: [
      `The house where ${prompt} occurred had been abandoned for thirty years. Urban explorer Mia didn't believe in ghosts, but she believed in views, and her followers wanted content from the infamous location.\n\nShe entered at dusk, camera rolling. The interior was frozen in time—furniture covered in dust, family photos still on walls, a half-eaten meal on the dining table. It was as if the occupants had simply vanished mid-dinner.\n\nAs darkness fell, Mia heard it: footsteps above her, moving in rhythm with her own. She climbed the stairs, each step creaking under her weight. The footsteps stayed ahead, always just out of sight.\n\nIn the master bedroom, she found a journal. The final entry, dated the night of the disappearance, described ${prompt} in terrifying detail. As Mia read, she realized with growing horror that the events were repeating—and she was now part of the pattern.\n\nThe footsteps were behind her now. Mia turned, camera still recording, and saw what the family had seen thirty years ago. Her scream echoed through the empty house. The next morning, investigators found her camera, still recording. The footage showed only static, but the audio captured everything. The house waited, patient and hungry, for the next visitor.`,
      `They called it ${prompt}, and it only happened at 3:33 AM. Journalist David investigated the phenomenon for his podcast, interviewing dozens who claimed to experience it. Their stories were consistent and terrifying.\n\nSkeptical but thorough, David decided to experience it himself. He set up cameras, recording equipment, and waited in the location where sightings were most frequent—an abandoned subway station beneath the city.\n\nAt 3:33 AM exactly, the temperature dropped twenty degrees. David's breath misted in the air as the lights flickered. Then he saw it: a figure at the end of the platform, watching him with eyes that reflected no light.\n\nThe figure moved closer, defying physics, gliding rather than walking. David tried to run, but his body wouldn't respond. The entity reached out, and David felt it—a presence invading his mind, showing him truths about ${prompt} that shattered his understanding of reality.\n\nWhen David woke in the hospital three days later, he couldn't speak about what he'd seen. The words wouldn't form, as if something prevented him from sharing the truth. His recordings showed only static, but David knew. Some mysteries are meant to remain unsolved, and some doors, once opened, can never be closed.`
    ],
    mystery: [
      `The case of ${prompt} had baffled detectives for six months. Detective Sarah Chen reviewed the evidence again, searching for the pattern everyone else had missed. Three victims, no connection, no motive, no witnesses.\n\nThen she noticed it: a detail so small that previous investigators had dismissed it. Each victim had received a package exactly one week before their death. The packages contained seemingly random objects, but Sarah saw the connection.\n\nShe traced the packages to a warehouse that didn't officially exist. Inside, she found a wall covered in photographs, newspaper clippings, and red string connecting dozens of people. ${prompt} wasn't random—it was calculated revenge spanning decades.\n\nThe killer had been patient, methodical, waiting years between actions. Sarah realized with horror that she recognized one of the photos on the wall: her own father, who had died in what was ruled an accident twenty years ago.\n\nThe case became personal. Sarah dove deeper, uncovering a conspiracy that connected her father's death to a cover-up involving powerful people. ${prompt} was the key to exposing them all.\n\nAs she closed in on the truth, Sarah faced a choice: follow the law and risk the evidence disappearing, or take justice into her own hands. The line between detective and vigilante had never seemed thinner.`,
      `The disappearance at ${prompt} made no sense. Librarian Thomas investigated after finding a pattern in the missing persons reports. All victims had checked out the same book before vanishing—a book that shouldn't exist in the library's catalog.\n\nThomas found the book hidden in the restricted section. Its pages contained more than text; they held secrets about the town's founding, secrets that powerful families had killed to protect.\n\nAs he read, Thomas discovered that ${prompt} was connected to a series of events from 1847. The town's founders had made a pact, and the missing people had all discovered the truth. They hadn't disappeared—they'd been silenced.\n\nBut Thomas had an advantage: he knew the library's true purpose. It wasn't just a repository of knowledge; it was a vault designed to preserve evidence against the day when someone would finally expose the truth.\n\nHe gathered the evidence, made copies, and prepared to reveal everything. The families came for him, as he knew they would. But Thomas had already set events in motion that couldn't be stopped.\n\nThe truth about ${prompt} would finally emerge, and the town would have to face its dark history. Sometimes, Thomas thought as he waited for dawn, the greatest mystery is how long people will protect a lie.`
    ],
    drama: [
      `The letter about ${prompt} arrived thirty years too late. Margaret held it with shaking hands, recognizing her mother's handwriting. The words inside explained everything—and changed nothing.\n\nHer mother had kept a secret, one that shaped Margaret's entire life. The choices made, the sacrifices endured, the distance maintained—all of it had been to protect her from a truth that now seemed almost mundane compared to the pain of not knowing.\n\nMargaret traveled to the small coastal town where her mother had grown up. She met people who remembered, who had their own pieces of the story. Each conversation added layers to her understanding, painting a picture of a woman she'd never really known.\n\nThe journey led her to a lighthouse, where ${prompt} had occurred. Standing there, watching the waves crash against rocks, Margaret finally understood. Her mother's choices hadn't been about shame or fear—they'd been about love, complicated and imperfect, but real.\n\nMargaret made peace with the past that day. She couldn't change what had happened, couldn't reclaim the lost years, but she could choose how to move forward. She wrote her own letter, one her daughter would read someday, hoping to break the cycle of silence.\n\nSome wounds never fully heal, but understanding can make them bearable. Margaret learned that forgiveness isn't about forgetting—it's about accepting that everyone, even our parents, are just people trying their best.`,
      `The photograph of ${prompt} sat on the mantle for forty years, a silent witness to a family's unspoken grief. When David inherited his grandfather's house, he finally learned the story behind it.\n\nHis grandfather had been a photographer, documenting the town's history. But one photograph was different—it captured a moment of tragedy that the town had collectively chosen to forget. ${prompt} had torn the community apart, and healing meant silence.\n\nDavid interviewed the few remaining witnesses, now elderly and finally willing to talk. Their stories revealed a complex truth: there were no villains, only people making impossible choices under unbearable circumstances.\n\nAs he pieced together the events, David realized his own family had been at the center of it all. His grandfather's photographs weren't just documentation—they were evidence, kept hidden to protect people he loved.\n\nDavid faced a decision: publish the truth and give the victims' families closure, or maintain the silence that had kept the peace for decades. There was no right answer, only consequences.\n\nIn the end, he chose truth, but with compassion. He told the story not to assign blame, but to honor those who had suffered. ${prompt} would no longer be forgotten, but remembered with the complexity it deserved. Sometimes, David learned, the bravest thing we can do is face the past honestly.`
    ],
    romantic: [
      `The story of ${prompt} began with a chance encounter in a rain-soaked bookstore. Emma reached for the same book as a stranger, their hands touching for just a moment. But that moment changed everything.\n\nHis name was James, and he was in town for only three days. They spent every moment together, talking until dawn, discovering impossible connections. It felt like they'd known each other forever, like the universe had conspired to bring them together.\n\nBut reality intruded. James lived across the country, building a career he'd worked years to establish. Emma had roots here—family, responsibilities, a life she couldn't just abandon. ${prompt} became a symbol of everything they wanted but couldn't have.\n\nThey tried to part ways, to be practical. But neither could forget. Months passed in agony, both trying to move on, both failing. Every song, every sunset, every moment reminded them of what they'd lost.\n\nThen Emma made a choice. She showed up at James's door with a suitcase and a plan. Not to abandon her life, but to build a new one that included him. James had made the same decision, already planning to move to her city.\n\nThey laughed and cried, realizing they'd both been willing to sacrifice everything. ${prompt} taught them that true love isn't about grand gestures—it's about two people choosing each other, every day, despite the obstacles. Their story was just beginning.`,
      `The legend of ${prompt} spoke of soulmates separated by time itself. Historian Claire dismissed it as romantic fiction until she found the letters—correspondence between two lovers from 1892, describing experiences identical to her own dreams.\n\nThe letters mentioned a locket, passed down through generations, that allowed souls to find each other across lifetimes. Claire's grandmother had left her such a locket, which she'd worn without thinking.\n\nThen she met him. Daniel walked into her lecture, and recognition hit them both like lightning. They'd never met, yet they knew each other intimately. The connection was undeniable, impossible, and absolutely real.\n\nAs they explored their connection, memories surfaced—fragments of other lives, other times. They'd been together before, always finding each other, always torn apart by circumstance. ${prompt} was their chance to finally break the cycle.\n\nBut breaking the cycle meant making different choices. In past lives, they'd let fear and duty separate them. This time, they chose differently. They chose each other, consciously and completely.\n\nThe locket grew warm against Claire's skin as they made their vow. This lifetime would be different. They'd found each other again, and this time, nothing would separate them. Love, they discovered, is stronger than time, more powerful than fate, and worth fighting for across eternity.`
    ],
    general: [
      `The tale of ${prompt} began on an ordinary Tuesday morning, but nothing would remain ordinary for long. Sarah discovered something that would change everything she thought she knew about the world.\n\nAs she delved deeper into the mystery, each clue led to more questions. The path was treacherous, filled with unexpected challenges that tested not just her courage, but her very understanding of reality. Strange occurrences became commonplace, and the line between possible and impossible began to blur.\n\nAllies appeared from unexpected places, each bringing their own piece to the puzzle. Together, they uncovered secrets that had been hidden for generations, truths that powerful forces wanted to keep buried.\n\nThe climax came suddenly, a confrontation that demanded everything she had learned. In that moment, Sarah realized that ${prompt} was never just about solving a mystery—it was about discovering who she truly was.\n\nWhen the dust settled and the truth finally emerged, Sarah understood that some journeys change us forever. The world looked the same, but she saw it through different eyes now, forever transformed by her experience.`,
      `In a world where ${prompt} held the power to reshape destiny, young Alex stood at a crossroads. The choice before them seemed impossible, yet there was no turning back.\n\nThe journey took them through landscapes both beautiful and terrifying. Ancient forests whispered secrets, mountains tested their resolve, and cities held dangers they never imagined. Each step forward revealed new layers to the mystery they were unraveling.\n\nCompanions joined along the way—some trustworthy, others hiding their true intentions. Betrayals stung, but friendships forged in adversity proved unbreakable. Together, they faced trials that seemed insurmountable.\n\nAs the final confrontation approached, Alex discovered that ${prompt} was more than they had ever imagined. The truth was both terrifying and liberating, a revelation that changed everything.\n\nIn the end, victory came not from strength alone, but from understanding. Alex learned that true power lies not in controlling destiny, but in accepting it and choosing how to respond. The adventure had transformed them, and they would never be the same.`
    ]
  };
  
  const templates = storyTemplates[detectedGenre] || storyTemplates.general;
  const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
  return randomTemplate;
};


