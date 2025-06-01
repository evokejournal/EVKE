// Define reflection questions for each emotion category and specific emotion

export const reflectionQuestions = {
  // Joy / Happiness
  joy: {
    Content: [
      { id: "content_feeling", text: "What aspects of your life are making you feel content right now?" },
      { id: "content_appreciate", text: "What are you most appreciative of in this moment?" },
      { id: "content_maintain", text: "How can you maintain this feeling of contentment?" },
    ],
    Cheerful: [
      { id: "cheerful_source", text: "What brought this cheerfulness into your day?" },
      { id: "cheerful_body", text: "How does cheerfulness feel in your body right now?" },
      { id: "cheerful_share", text: "How might you share this cheerful energy with others?" },
    ],
    Elated: [
      { id: "elated_trigger", text: "What triggered this feeling of elation?" },
      { id: "elated_compare", text: "How does this compare to other joyful moments in your life?" },
      { id: "elated_savor", text: "How can you savor this feeling of elation?" },
    ],
    Ecstatic: [
      { id: "ecstatic_trigger", text: "What event or realization led to this ecstatic feeling?" },
      { id: "ecstatic_body", text: "Where in your body do you feel this ecstatic energy most strongly?" },
      { id: "ecstatic_express", text: "How are you expressing or sharing this ecstatic feeling?" },
    ],
    Euphoric: [
      { id: "euphoric_cause", text: "What caused this euphoric state you're experiencing?" },
      { id: "euphoric_compare", text: "How does this euphoria compare to other peak experiences?" },
      { id: "euphoric_wisdom", text: "What insight or wisdom might this euphoric state be offering you?" },
    ],
    Amused: [
      { id: "amused_situation", text: "What situation or thought is amusing you right now?" },
      { id: "amused_humor", text: "What does your sense of humor reveal about you?" },
      { id: "amused_perspective", text: "How does amusement shift your perspective on challenges?" },
    ],
    Playful: [
      { id: "playful_activity", text: "What activities bring out your playful side?" },
      { id: "playful_childhood", text: "How does this playfulness connect to your childhood?" },
      { id: "playful_creativity", text: "How might this playful energy enhance your creativity?" },
    ],
    Grateful: [
      { id: "grateful_specific", text: "What specifically are you feeling grateful for?" },
      { id: "grateful_express", text: "How might you express this gratitude outwardly?" },
      { id: "grateful_practice", text: "How can you cultivate more gratitude in your daily life?" },
    ],
    Optimistic: [
      { id: "optimistic_future", text: "What future possibility are you feeling optimistic about?" },
      { id: "optimistic_evidence", text: "What evidence supports your optimistic outlook?" },
      { id: "optimistic_action", text: "What action can you take to move toward this positive future?" },
    ],
    Proud: [
      { id: "proud_achievement", text: "What achievement or quality are you proud of?" },
      { id: "proud_effort", text: "What effort or growth led to this moment of pride?" },
      { id: "proud_acknowledge", text: "How can you acknowledge this achievement meaningfully?" },
    ],
    Excited: [
      { id: "excited_anticipate", text: "What are you excited about or looking forward to?" },
      { id: "excited_energy", text: "How is this excitement energizing you?" },
      { id: "excited_channel", text: "How can you channel this excited energy productively?" },
    ],
    Inspired: [
      { id: "inspired_source", text: "What or who has inspired you?" },
      { id: "inspired_create", text: "What does this inspiration make you want to create or do?" },
      { id: "inspired_meaning", text: "What meaning does this inspiration hold for you?" },
    ],
    Energetic: [
      { id: "energetic_source", text: "What's the source of this energetic feeling?" },
      { id: "energetic_channel", text: "How are you channeling this energy?" },
      { id: "energetic_balance", text: "How can you balance this energy with rest when needed?" },
    ],
    Loving: [
      { id: "loving_direct", text: "Toward whom or what are you feeling this love?" },
      { id: "loving_express", text: "How do you express this loving feeling?" },
      { id: "loving_receive", text: "How do you receive love from others?" },
    ],
    Peaceful: [
      { id: "peaceful_environment", text: "What in your environment contributes to this peace?" },
      { id: "peaceful_practice", text: "What practices help you cultivate inner peace?" },
      { id: "peaceful_maintain", text: "How can you maintain this peaceful state in challenging times?" },
    ],
    Serene: [
      { id: "serene_contrast", text: "How does this serenity contrast with other recent emotional states?" },
      { id: "serene_wisdom", text: "What wisdom arises in this serene state?" },
      { id: "serene_cultivate", text: "What helps you cultivate serenity in your life?" },
    ],
    Satisfied: [
      { id: "satisfied_need", text: "What need or desire has been satisfied?" },
      { id: "satisfied_contentment", text: "How is satisfaction different from contentment for you?" },
      { id: "satisfied_enough", text: "What helps you recognize when 'enough is enough'?" },
    ],
    Pleased: [
      { id: "pleased_situation", text: "What situation or outcome has pleased you?" },
      { id: "pleased_expectation", text: "How did this compare to your expectations?" },
      { id: "pleased_appreciation", text: "How can you express appreciation for this pleasing outcome?" },
    ],
    Delighted: [
      { id: "delighted_surprise", text: "What delightful surprise have you experienced?" },
      { id: "delighted_share", text: "How might you share this delight with others?" },
      { id: "delighted_savor", text: "How can you fully savor this delightful moment?" },
    ],
    Blissful: [
      { id: "blissful_moment", text: "What has created this moment of bliss?" },
      { id: "blissful_presence", text: "How present are you in this blissful state?" },
      { id: "blissful_wisdom", text: "What wisdom or insight does this blissful state offer?" },
    ],
    default: [
      { id: "joy_feeling", text: "How is this joy manifesting in your body right now?" },
      { id: "joy_gratitude", text: "What are you most grateful for in this moment?" },
      { id: "joy_extend", text: "How might you extend or share this joy?" },
    ],
  },

  // Sadness
  sadness: {
    Disappointed: [
      { id: "disappointed_expectation", text: "What expectation wasn't met that led to this disappointment?" },
      { id: "disappointed_lesson", text: "Is there a lesson or insight in this disappointment?" },
      { id: "disappointed_forward", text: "What's one small step you can take to move forward?" },
    ],
    Lonely: [
      { id: "lonely_trigger", text: "What triggered this feeling of loneliness?" },
      { id: "lonely_need", text: "What kind of connection do you need right now?" },
      { id: "lonely_action", text: "What's one action you could take to feel more connected?" },
    ],
    Hopeless: [
      { id: "hopeless_situation", text: "What situation feels hopeless right now?" },
      { id: "hopeless_control", text: "What aspects of this situation can you control?" },
      { id: "hopeless_support", text: "What support do you need during this difficult time?" },
    ],
    Grieving: [
      { id: "grieving_loss", text: "What loss are you grieving?" },
      { id: "grieving_honor", text: "How can you honor what you've lost?" },
      { id: "grieving_support", text: "What support do you need in your grief?" },
    ],
    Hurt: [
      { id: "hurt_source", text: "What is the source of this hurt?" },
      { id: "hurt_need", text: "What do you need to begin healing this hurt?" },
      { id: "hurt_boundary", text: "Is there a boundary that needs to be established?" },
    ],
    Ashamed: [
      { id: "ashamed_trigger", text: "What triggered this feeling of shame?" },
      { id: "ashamed_belief", text: "What belief about yourself is connected to this shame?" },
      { id: "ashamed_compassion", text: "How might you respond to yourself with compassion?" },
    ],
    Guilty: [
      { id: "guilty_action", text: "What action or inaction is causing this guilt?" },
      { id: "guilty_amends", text: "Is there an amends you could make?" },
      { id: "guilty_learn", text: "What can you learn from this experience?" },
    ],
    Mournful: [
      { id: "mournful_honoring", text: "How are you honoring what you've lost?" },
      { id: "mournful_expression", text: "How are you expressing your mourning?" },
      { id: "mournful_support", text: "What support do you need in this time of mourning?" },
    ],
    Despairing: [
      { id: "despairing_depth", text: "What has brought you to this depth of despair?" },
      { id: "despairing_reach", text: "Who could you reach out to for support?" },
      { id: "despairing_tiny", text: "What tiny step might bring even a moment of relief?" },
    ],
    Regretful: [
      { id: "regretful_action", text: "What action or decision do you regret?" },
      { id: "regretful_learn", text: "What have you learned from this regret?" },
      { id: "regretful_forward", text: "How can you move forward with this learning?" },
    ],
    Depressed: [
      { id: "depressed_duration", text: "How long have you been feeling depressed?" },
      { id: "depressed_support", text: "What professional support might be helpful?" },
      { id: "depressed_care", text: "What small act of self-care feels possible right now?" },
    ],
    Numb: [
      { id: "numb_before", text: "What emotions might you have been feeling before this numbness?" },
      { id: "numb_protection", text: "How might this numbness be protecting you?" },
      { id: "numb_gentle", text: "What gentle way might help you reconnect with your feelings?" },
    ],
    Downcast: [
      { id: "downcast_trigger", text: "What has left you feeling downcast?" },
      { id: "downcast_comfort", text: "What brings you comfort when you feel this way?" },
      { id: "downcast_kindness", text: "What act of kindness could you offer yourself?" },
    ],
    Isolated: [
      { id: "isolated_circumstance", text: "What circumstances are contributing to this isolation?" },
      { id: "isolated_reach", text: "Who could you reach out to, even in a small way?" },
      { id: "isolated_activity", text: "What activity might help you feel more connected?" },
    ],
    Heartbroken: [
      { id: "heartbroken_loss", text: "What loss are you experiencing right now?" },
      { id: "heartbroken_body", text: "Where do you feel this heartbreak in your body?" },
      { id: "heartbroken_care", text: "How can you show yourself compassion during this time?" },
    ],
    Discouraged: [
      { id: "discouraged_setback", text: "What setback has left you feeling discouraged?" },
      { id: "discouraged_perspective", text: "How might you view this setback differently?" },
      { id: "discouraged_support", text: "What support or encouragement do you need?" },
    ],
    Vulnerable: [
      { id: "vulnerable_situation", text: "What situation has left you feeling vulnerable?" },
      { id: "vulnerable_strength", text: "What strength can you find in this vulnerability?" },
      { id: "vulnerable_boundary", text: "What boundary might help you feel safer?" },
    ],
    Melancholy: [
      { id: "melancholy_trigger", text: "What has triggered this melancholy mood?" },
      { id: "melancholy_expression", text: "How might you express this melancholy creatively?" },
      { id: "melancholy_wisdom", text: "What wisdom or depth does this melancholy offer?" },
    ],
    Sorrowful: [
      { id: "sorrowful_source", text: "What is the source of this deep sorrow?" },
      { id: "sorrowful_honor", text: "How can you honor and acknowledge this sorrow?" },
      { id: "sorrowful_support", text: "What support do you need as you experience this sorrow?" },
    ],
    Defeated: [
      { id: "defeated_situation", text: "What situation has left you feeling defeated?" },
      { id: "defeated_lesson", text: "What lesson might be found in this defeat?" },
      { id: "defeated_resilience", text: "How have you bounced back from defeat in the past?" },
    ],
    default: [
      { id: "sadness_feeling", text: "How does this sadness feel in your body?" },
      { id: "sadness_need", text: "What do you need when you feel this way?" },
      { id: "sadness_wisdom", text: "What might this sadness be trying to tell you?" },
    ],
  },

  // Anger
  anger: {
    Annoyed: [
      { id: "annoyed_trigger", text: "What specifically is annoying you?" },
      { id: "annoyed_pattern", text: "Do you notice any patterns in what annoys you?" },
      { id: "annoyed_response", text: "How can you respond to this annoyance constructively?" },
    ],
    Irritated: [
      { id: "irritated_trigger", text: "What specifically is irritating you?" },
      { id: "irritated_boundary", text: "Is there a boundary that needs to be set?" },
      { id: "irritated_need", text: "What do you need to feel more at ease?" },
    ],
    Frustrated: [
      { id: "frustrated_obstacle", text: "What obstacle is causing this frustration?" },
      { id: "frustrated_control", text: "Which aspects of this situation can you control?" },
      { id: "frustrated_release", text: "What would help you release this frustration?" },
    ],
    Enraged: [
      { id: "enraged_trigger", text: "What has triggered this intense rage?" },
      { id: "enraged_safety", text: "How can you ensure your safety and others' safety right now?" },
      { id: "enraged_channel", text: "What healthy way can you channel this intense energy?" },
    ],
    Resentful: [
      { id: "resentful_situation", text: "What situation is causing you to feel resentful?" },
      { id: "resentful_unmet", text: "What need or expectation wasn't met?" },
      { id: "resentful_release", text: "How might you begin to release this resentment?" },
    ],
    Bitter: [
      { id: "bitter_experience", text: "What experience has left you feeling bitter?" },
      { id: "bitter_holding", text: "How is holding onto this bitterness affecting you?" },
      { id: "bitter_release", text: "What might help you release some of this bitterness?" },
    ],
    Agitated: [
      { id: "agitated_trigger", text: "What has triggered this agitation?" },
      { id: "agitated_body", text: "Where do you feel this agitation in your body?" },
      { id: "agitated_calm", text: "What helps you find calm when you feel agitated?" },
    ],
    Jealous: [
      { id: "jealous_specific", text: "What specifically are you feeling jealous about?" },
      { id: "jealous_need", text: "What need or desire does this jealousy reveal?" },
      { id: "jealous_action", text: "What positive action could you take based on this insight?" },
    ],
    Vengeful: [
      { id: "vengeful_hurt", text: "What hurt is beneath this desire for vengeance?" },
      { id: "vengeful_cost", text: "What would be the cost of acting on this vengeful feeling?" },
      { id: "vengeful_release", text: "What might help you release this vengeful energy?" },
    ],
    Hateful: [
      { id: "hateful_target", text: "What is the target of this hateful feeling?" },
      { id: "hateful_beneath", text: "What might be beneath this hatred (fear, hurt, etc.)?" },
      { id: "hateful_transform", text: "How might you transform this hateful energy?" },
    ],
    Disgusted: [
      { id: "disgusted_trigger", text: "What has triggered this disgust?" },
      { id: "disgusted_value", text: "What value or boundary does this disgust protect?" },
      { id: "disgusted_action", text: "What action, if any, does this disgust call for?" },
    ],
    Hostile: [
      { id: "hostile_threat", text: "What feels threatening in this situation?" },
      { id: "hostile_protection", text: "What are you protecting with this hostility?" },
      { id: "hostile_deescalate", text: "How might you de-escalate these hostile feelings?" },
    ],
    Critical: [
      { id: "critical_judging", text: "Who or what are you judging critically?" },
      { id: "critical_standard", text: "What standard or expectation is behind this criticism?" },
      { id: "critical_compassion", text: "How might you bring more compassion to this situation?" },
    ],
    Defiant: [
      { id: "defiant_against", text: "What are you standing against or defying?" },
      { id: "defiant_value", text: "What value or principle are you defending?" },
      { id: "defiant_express", text: "How can you express this defiance constructively?" },
    ],
    Offended: [
      { id: "offended_boundary", text: "What boundary or value has been crossed?" },
      { id: "offended_communicate", text: "How might you communicate about this offense?" },
      { id: "offended_response", text: "What response would feel appropriate and healthy?" },
    ],
    Indignant: [
      { id: "indignant_injustice", text: "What injustice are you responding to?" },
      { id: "indignant_action", text: "What constructive action might address this injustice?" },
      { id: "indignant_allies", text: "Who might be allies in addressing this situation?" },
    ],
    Outraged: [
      { id: "outraged_violation", text: "What violation has caused this outrage?" },
      { id: "outraged_channel", text: "How might you channel this outrage constructively?" },
      { id: "outraged_support", text: "What support do you need to process this outrage?" },
    ],
    Impatient: [
      { id: "impatient_waiting", text: "What are you waiting for or wanting to happen faster?" },
      { id: "impatient_control", text: "What aspects of this situation can you control?" },
      { id: "impatient_present", text: "How might you be more present while waiting?" },
    ],
    Sarcastic: [
      { id: "sarcastic_protect", text: "What might your sarcasm be protecting you from?" },
      { id: "sarcastic_direct", text: "What would it be like to express yourself more directly?" },
      { id: "sarcastic_impact", text: "How might your sarcasm impact others?" },
    ],
    Furious: [
      { id: "furious_trigger", text: "What has triggered this fury?" },
      { id: "furious_express", text: "How can you express this fury safely?" },
      { id: "furious_beneath", text: "What emotions might be beneath this fury?" },
    ],
    default: [
      { id: "anger_message", text: "What message might this anger be trying to deliver?" },
      { id: "anger_boundary", text: "Is there a boundary that needs to be protected?" },
      { id: "anger_channel", text: "How can you channel this energy constructively?" },
    ],
  },

  // Fear / Anxiety
  fear: {
    Worried: [
      { id: "worried_concern", text: "What specific concern is on your mind?" },
      { id: "worried_reality", text: "How likely is this worry to become reality?" },
      { id: "worried_action", text: "What small action might help address this worry?" },
    ],
    Nervous: [
      { id: "nervous_situation", text: "What situation is making you nervous?" },
      { id: "nervous_body", text: "Where do you feel this nervousness in your body?" },
      { id: "nervous_cope", text: "What helps you cope when you feel nervous?" },
    ],
    Anxious: [
      { id: "anxious_trigger", text: "What triggered this anxiety?" },
      { id: "anxious_body", text: "Where do you feel this anxiety in your body?" },
      { id: "anxious_ground", text: "What helps you feel grounded when anxious?" },
    ],
    Scared: [
      { id: "scared_fear", text: "What specifically are you scared of?" },
      { id: "scared_safety", text: "What would help you feel safer right now?" },
      { id: "scared_support", text: "What support do you need with this fear?" },
    ],
    Terrified: [
      { id: "terrified_threat", text: "What feels so threatening right now?" },
      { id: "terrified_immediate", text: "What immediate support do you need?" },
      { id: "terrified_step", text: "What tiny step might help you face this terror?" },
    ],
    Insecure: [
      { id: "insecure_situation", text: "In what situation are you feeling insecure?" },
      { id: "insecure_belief", text: "What belief about yourself is being challenged?" },
      { id: "insecure_truth", text: "What might be a more compassionate truth?" },
    ],
    Shy: [
      { id: "shy_situation", text: "In what situations do you feel most shy?" },
      { id: "shy_comfort", text: "What helps you feel more comfortable in social situations?" },
      { id: "shy_strength", text: "What strength might there be in your shyness?" },
    ],
    Alarmed: [
      { id: "alarmed_trigger", text: "What has triggered this alarm?" },
      { id: "alarmed_response", text: "What response is needed to this situation?" },
      { id: "alarmed_calm", text: "How can you find calm amid this alarm?" },
    ],
    Apprehensive: [
      { id: "apprehensive_anticipate", text: "What are you apprehensive about?" },
      { id: "apprehensive_prepare", text: "How might you prepare for what you're facing?" },
      { id: "apprehensive_support", text: "What support would help with this apprehension?" },
    ],
    Panicked: [
      { id: "panicked_trigger", text: "What triggered this panic?" },
      { id: "panicked_immediate", text: "What do you need right now to feel safer?" },
      { id: "panicked_breath", text: "Can you focus on taking slow, deep breaths?" },
    ],
    Hesitant: [
      { id: "hesitant_decision", text: "What decision or action are you hesitant about?" },
      { id: "hesitant_fear", text: "What fear is behind this hesitation?" },
      { id: "hesitant_information", text: "What information might help you move forward?" },
    ],
    Distrustful: [
      { id: "distrustful_person", text: "Who or what are you finding it difficult to trust?" },
      { id: "distrustful_experience", text: "What past experiences influence this distrust?" },
      { id: "distrustful_evidence", text: "What evidence might help you assess trustworthiness?" },
    ],
    Overwhelmed: [
      { id: "overwhelmed_specific", text: "What specifically feels overwhelming right now?" },
      { id: "overwhelmed_small", text: "What small step could you take to reduce this feeling?" },
      { id: "overwhelmed_support", text: "What support do you need when feeling overwhelmed?" },
    ],
    Dreadful: [
      { id: "dreadful_anticipate", text: "What are you dreading?" },
      { id: "dreadful_worst", text: "What's the worst that could happen, and could you cope?" },
      { id: "dreadful_present", text: "How can you stay present rather than future-focused?" },
    ],
    Timid: [
      { id: "timid_situation", text: "In what situations do you feel most timid?" },
      { id: "timid_need", text: "What would help you feel more confident?" },
      { id: "timid_step", text: "What small step could you take outside your comfort zone?" },
    ],
    Paranoid: [
      { id: "paranoid_fear", text: "What specific fear is behind this paranoia?" },
      { id: "paranoid_reality", text: "What evidence supports or contradicts these thoughts?" },
      { id: "paranoid_support", text: "What professional support might be helpful?" },
    ],
    Startled: [
      { id: "startled_trigger", text: "What startled you?" },
      { id: "startled_reaction", text: "How did your body react to being startled?" },
      { id: "startled_calm", text: "What helps you return to calm after being startled?" },
    ],
    Conflicted: [
      { id: "conflicted_options", text: "What options or values are in conflict?" },
      { id: "conflicted_important", text: "What matters most to you in this situation?" },
      { id: "conflicted_wisdom", text: "What wisdom might help resolve this conflict?" },
    ],
    Uneasy: [
      { id: "uneasy_intuition", text: "What might your uneasiness be trying to tell you?" },
      { id: "uneasy_attention", text: "What deserves your attention in this situation?" },
      { id: "uneasy_action", text: "What action, if any, does this uneasiness suggest?" },
    ],
    Exposed: [
      { id: "exposed_vulnerable", text: "In what way do you feel exposed or vulnerable?" },
      { id: "exposed_safety", text: "What would help you feel more protected?" },
      { id: "exposed_strength", text: "What strength can you find in vulnerability?" },
    ],
    default: [
      { id: "fear_protection", text: "What is this fear trying to protect you from?" },
      { id: "fear_safety", text: "What would help you feel safer right now?" },
      { id: "fear_courage", text: "What would courage look like in this situation?" },
    ],
  },

  // Surprise
  surprise: {
    Amazed: [
      { id: "amazed_unexpected", text: "What unexpected thing has amazed you?" },
      { id: "amazed_perspective", text: "How has this changed your perspective?" },
      { id: "amazed_appreciate", text: "How can you appreciate this moment of wonder?" },
    ],
    Startled: [
      { id: "startled_unexpected", text: "What unexpected event startled you?" },
      { id: "startled_reaction", text: "How did your body react to being startled?" },
      { id: "startled_recover", text: "What helps you recover your equilibrium?" },
    ],
    Shocked: [
      { id: "shocked_unexpected", text: "What unexpected event shocked you?" },
      { id: "shocked_reaction", text: "How are you reacting to this shock?" },
      { id: "shocked_process", text: "What might help you process this surprise?" },
    ],
    Stunned: [
      { id: "stunned_event", text: "What has left you feeling stunned?" },
      { id: "stunned_process", text: "What do you need to process this stunning event?" },
      { id: "stunned_meaning", text: "What meaning might this event hold for you?" },
    ],
    Confused: [
      { id: "confused_unclear", text: "What specifically feels unclear or confusing?" },
      { id: "confused_clarity", text: "What information might help bring clarity?" },
      { id: "confused_next", text: "What's your next step despite this confusion?" },
    ],
    Disoriented: [
      { id: "disoriented_cause", text: "What has caused this disorientation?" },
      { id: "disoriented_ground", text: "What helps you feel grounded when disoriented?" },
      { id: "disoriented_next", text: "What small step might help you regain your bearings?" },
    ],
    Curious: [
      { id: "curious_interest", text: "What has sparked your curiosity?" },
      { id: "curious_explore", text: "How might you explore this interest further?" },
      { id: "curious_learn", text: "What would you like to learn about this?" },
    ],
    Intrigued: [
      { id: "intrigued_attention", text: "What has captured your attention?" },
      { id: "intrigued_questions", text: "What questions does this raise for you?" },
      { id: "intrigued_explore", text: "How might you explore this intrigue further?" },
    ],
    Awestruck: [
      { id: "awestruck_experience", text: "What experience has left you in awe?" },
      { id: "awestruck_perspective", text: "How does this awe shift your perspective?" },
      { id: "awestruck_meaning", text: "What meaning does this awe-inspiring experience hold for you?" },
    ],
    Uncertain: [
      { id: "uncertain_situation", text: "What situation feels uncertain?" },
      { id: "uncertain_information", text: "What information might reduce this uncertainty?" },
      { id: "uncertain_step", text: "What step can you take despite this uncertainty?" },
    ],
    Baffled: [
      { id: "baffled_understand", text: "What are you trying to understand?" },
      { id: "baffled_approach", text: "How might you approach this from a different angle?" },
      { id: "baffled_help", text: "Who might help you make sense of this?" },
    ],
    Dazed: [
      { id: "dazed_overwhelm", text: "What has overwhelmed you into this dazed state?" },
      { id: "dazed_ground", text: "What might help you feel more grounded?" },
      { id: "dazed_support", text: "What support do you need right now?" },
    ],
    default: [
      { id: "surprise_unexpected", text: "What unexpected thing occurred?" },
      { id: "surprise_reaction", text: "What was your immediate reaction?" },
      { id: "surprise_adjust", text: "How are you adjusting to this surprise?" },
    ],
  },

  // Love / Connection
  love: {
    Affectionate: [
      { id: "affectionate_toward", text: "Toward whom are you feeling affectionate?" },
      { id: "affectionate_express", text: "How do you express this affection?" },
      { id: "affectionate_receive", text: "How do you like to receive affection?" },
    ],
    Compassionate: [
      { id: "compassionate_situation", text: "What situation is evoking your compassion?" },
      { id: "compassionate_action", text: "What compassionate action might you take?" },
      { id: "compassionate_self", text: "How can you extend this compassion to yourself?" },
    ],
    Warm: [
      { id: "warm_feeling", text: "What has evoked this warm feeling?" },
      { id: "warm_express", text: "How do you express this warmth to others?" },
      { id: "warm_cultivate", text: "How do you cultivate warmth in your relationships?" },
    ],
    Intimate: [
      { id: "intimate_connection", text: "With whom do you share this intimate connection?" },
      { id: "intimate_vulnerability", text: "How does vulnerability play a role in this intimacy?" },
      { id: "intimate_deepen", text: "How might you deepen this intimate connection?" },
    ],
    Caring: [
      { id: "caring_express", text: "How do you express your care for others?" },
      { id: "caring_balance", text: "How do you balance caring for others and yourself?" },
      { id: "caring_receive", text: "How do you receive care from others?" },
    ],
    Sympathetic: [
      { id: "sympathetic_situation", text: "What situation has evoked your sympathy?" },
      { id: "sympathetic_action", text: "What supportive action might you take?" },
      { id: "sympathetic_balance", text: "How do you balance sympathy with empowerment?" },
    ],
    Empathetic: [
      { id: "empathetic_feeling", text: "Whose feelings are you connecting with empathetically?" },
      { id: "empathetic_boundary", text: "How do you maintain healthy boundaries while being empathetic?" },
      { id: "empathetic_action", text: "What action might this empathy inspire?" },
    ],
    Romantic: [
      { id: "romantic_feeling", text: "Toward whom are you feeling romantic?" },
      { id: "romantic_express", text: "How do you express your romantic feelings?" },
      { id: "romantic_nurture", text: "How do you nurture romance in your relationship?" },
    ],
    Devoted: [
      { id: "devoted_commitment", text: "To whom or what are you devoted?" },
      { id: "devoted_express", text: "How do you express this devotion?" },
      { id: "devoted_balance", text: "How do you balance this devotion with other aspects of life?" },
    ],
    Trusting: [
      { id: "trusting_relationship", text: "In which relationship are you feeling trust?" },
      { id: "trusting_built", text: "How was this trust built?" },
      { id: "trusting_nurture", text: "How can you continue to nurture this trust?" },
    ],
    Protective: [
      { id: "protective_who", text: "Who or what are you feeling protective of?" },
      { id: "protective_express", text: "How do you express this protective feeling?" },
      { id: "protective_balance", text: "How do you balance protection with allowing independence?" },
    ],
    Appreciative: [
      { id: "appreciative_grateful", text: "What or who are you appreciating?" },
      { id: "appreciative_express", text: "How do you express this appreciation?" },
      { id: "appreciative_impact", text: "What impact does expressing appreciation have on your relationships?" },
    ],
    Forgiving: [
      { id: "forgiving_situation", text: "What situation are you working to forgive?" },
      { id: "forgiving_process", text: "What does the process of forgiveness look like for you?" },
      { id: "forgiving_benefit", text: "How might forgiveness benefit you in this situation?" },
    ],
    Secure: [
      { id: "secure_relationship", text: "In which relationship do you feel secure?" },
      { id: "secure_contribute", text: "What contributes to this feeling of security?" },
      { id: "secure_foster", text: "How do you foster security in your relationships?" },
    ],
    Comforted: [
      { id: "comforted_source", text: "What is the source of this comfort?" },
      { id: "comforted_feeling", text: "How does being comforted feel in your body?" },
      { id: "comforted_others", text: "How do you offer comfort to others?" },
    ],
    default: [
      { id: "love_expression", text: "How does this love or connection express itself?" },
      { id: "love_appreciation", text: "What do you appreciate most about this connection?" },
      { id: "love_nurture", text: "How can you nurture this connection?" },
    ],
  },

  // Anticipation / Desire
  anticipation: {
    Hopeful: [
      { id: "hopeful_future", text: "What future possibility are you hopeful about?" },
      { id: "hopeful_evidence", text: "What evidence supports this hope?" },
      { id: "hopeful_action", text: "What action can you take toward this hope?" },
    ],
    Curious: [
      { id: "curious_interest", text: "What has sparked your curiosity?" },
      { id: "curious_explore", text: "How might you explore this interest further?" },
      { id: "curious_learn", text: "What would you like to learn about this?" },
    ],
    Longing: [
      { id: "longing_desire", text: "What are you longing for?" },
      { id: "longing_need", text: "What need might be beneath this longing?" },
      { id: "longing_action", text: "What step might you take toward fulfilling this longing?" },
    ],
    Yearning: [
      { id: "yearning_deep", text: "What are you deeply yearning for?" },
      { id: "yearning_fulfill", text: "What might help fulfill this yearning?" },
      { id: "yearning_meaning", text: "What meaning does this yearning hold for you?" },
    ],
    Desirous: [
      { id: "desirous_want", text: "What do you desire or want?" },
      { id: "desirous_beneath", text: "What need might be beneath this desire?" },
      { id: "desirous_action", text: "What action might you take toward this desire?" },
    ],
    Inspired: [
      { id: "inspired_source", text: "What or who has inspired you?" },
      { id: "inspired_create", text: "What does this inspiration make you want to create or do?" },
      { id: "inspired_meaning", text: "What meaning does this inspiration hold for you?" },
    ],
    Passionate: [
      { id: "passionate_focus", text: "What are you feeling passionate about?" },
      { id: "passionate_energy", text: "How does this passion energize you?" },
      { id: "passionate_channel", text: "How can you channel this passionate energy?" },
    ],
    Motivated: [
      { id: "motivated_goal", text: "What goal are you motivated to pursue?" },
      { id: "motivated_why", text: "Why is this goal meaningful to you?" },
      { id: "motivated_step", text: "What's your next step toward this goal?" },
    ],
    Eager: [
      { id: "eager_anticipate", text: "What are you eagerly anticipating?" },
      { id: "eager_preparation", text: "How are you preparing for this?" },
      { id: "eager_present", text: "How can you enjoy the present while you wait?" },
    ],
    Enthusiastic: [
      { id: "enthusiastic_excited", text: "What are you enthusiastic about?" },
      { id: "enthusiastic_share", text: "How do you share your enthusiasm with others?" },
      { id: "enthusiastic_channel", text: "How do you channel this enthusiastic energy?" },
    ],
    Determined: [
      { id: "determined_goal", text: "What goal are you determined to achieve?" },
      { id: "determined_obstacle", text: "What obstacles might you face?" },
      { id: "determined_strategy", text: "What strategy will help you overcome these obstacles?" },
    ],
    Ambitious: [
      { id: "ambitious_aspire", text: "What are you aspiring toward?" },
      { id: "ambitious_why", text: "Why is this ambition meaningful to you?" },
      { id: "ambitious_step", text: "What's your next step toward this ambition?" },
    ],
    Focussed: [
      { id: "focussed_attention", text: "What are you focusing your attention on?" },
      { id: "focussed_distraction", text: "What helps you maintain focus amid distractions?" },
      { id: "focussed_balance", text: "How do you balance intense focus with rest?" },
    ],
    Zealous: [
      { id: "zealous_passionate", text: "What are you zealously passionate about?" },
      { id: "zealous_channel", text: "How do you channel this zealous energy?" },
      { id: "zealous_balance", text: "How do you balance zeal with openness to other perspectives?" },
    ],
    default: [
      { id: "anticipation_looking", text: "What are you looking forward to?" },
      { id: "anticipation_preparation", text: "How are you preparing for what's ahead?" },
      { id: "anticipation_present", text: "How can you balance anticipation with presence?" },
    ],
  },

  // Shame / Guilt
  shame: {
    Embarrassed: [
      { id: "embarrassed_situation", text: "What situation triggered this embarrassment?" },
      { id: "embarrassed_perspective", text: "How might others actually view this situation?" },
      { id: "embarrassed_compassion", text: "What would you say to a friend feeling this way?" },
    ],
    Humiliated: [
      { id: "humiliated_event", text: "What event led to this feeling of humiliation?" },
      { id: "humiliated_perspective", text: "How might you view this situation differently?" },
      { id: "humiliated_forward", text: "What would help you move forward from this experience?" },
    ],
    Guilty: [
      { id: "guilty_action", text: "What action or inaction is causing this guilt?" },
      { id: "guilty_amends", text: "Is there an amends you could make?" },
      { id: "guilty_learn", text: "What can you learn from this experience?" },
    ],
    Ashamed: [
      { id: "ashamed_trigger", text: "What triggered this feeling of shame?" },
      { id: "ashamed_belief", text: "What belief about yourself is connected to this shame?" },
      { id: "ashamed_compassion", text: "How might you respond with self-compassion?" },
    ],
    Regretful: [
      { id: "regretful_choice", text: "What choice are you regretting?" },
      { id: "regretful_different", text: "What would you do differently now?" },
      { id: "regretful_forward", text: "How can you move forward from here?" },
    ],
    "Self-loathing": [
      { id: "selfloathing_critical", text: "What are you being most critical of about yourself?" },
      { id: "selfloathing_origin", text: "Where might these harsh judgments originate from?" },
      { id: "selfloathing_compassion", text: "What would self-compassion look like in this moment?" },
    ],
    Remorseful: [
      { id: "remorseful_action", text: "What action are you feeling remorse about?" },
      { id: "remorseful_amends", text: "What amends might be appropriate?" },
      { id: "remorseful_forgive", text: "How might you work toward self-forgiveness?" },
    ],
    Inadequate: [
      { id: "inadequate_situation", text: "In what situation do you feel inadequate?" },
      { id: "inadequate_standard", text: "What standard are you measuring yourself against?" },
      { id: "inadequate_realistic", text: "What would be a more realistic or compassionate view?" },
    ],
    Unworthy: [
      { id: "unworthy_feeling", text: "What do you feel unworthy of?" },
      { id: "unworthy_belief", text: "What belief is behind this feeling of unworthiness?" },
      { id: "unworthy_challenge", text: "How might you challenge this belief?" },
    ],
    Inferior: [
      { id: "inferior_compare", text: "Who or what are you comparing yourself to?" },
      { id: "inferior_unique", text: "What unique strengths or qualities do you possess?" },
      { id: "inferior_compassion", text: "How might you view yourself with more compassion?" },
    ],
    default: [
      { id: "shame_trigger", text: "What triggered these feelings of shame or guilt?" },
      { id: "shame_belief", text: "What belief about yourself is this connected to?" },
      { id: "shame_compassion", text: "How might you respond with self-compassion?" },
    ],
  },

  // Empowerment / Confidence
  empowerment: {
    Bold: [
      { id: "bold_action", text: "What bold action are you taking or considering?" },
      { id: "bold_courage", text: "Where are you finding the courage for this boldness?" },
      { id: "bold_outcome", text: "What outcome do you hope for from this bold step?" },
    ],
    Assertive: [
      { id: "assertive_boundary", text: "What boundary are you asserting?" },
      { id: "assertive_communicate", text: "How are you communicating your needs or boundaries?" },
      { id: "assertive_balance", text: "How do you balance assertiveness with respect for others?" },
    ],
    Confident: [
      { id: "confident_situation", text: "In what situation are you feeling confident?" },
      { id: "confident_source", text: "What is the source of this confidence?" },
      { id: "confident_build", text: "How can you build on this confidence?" },
    ],
    Strong: [
      { id: "strong_feeling", text: "In what way are you feeling strong?" },
      { id: "strong_source", text: "What is the source of this strength?" },
      { id: "strong_use", text: "How might you use this strength?" },
    ],
    Capable: [
      { id: "capable_skill", text: "What skill or ability is giving you this capable feeling?" },
      { id: "capable_develop", text: "How did you develop this capability?" },
      { id: "capable_next", text: "What might be your next area for growth?" },
    ],
    Proud: [
      { id: "proud_accomplishment", text: "What accomplishment are you proud of?" },
      { id: "proud_effort", text: "What effort went into this achievement?" },
      { id: "proud_acknowledge", text: "How can you acknowledge this achievement?" },
    ],
    Resilient: [
      { id: "resilient_overcome", text: "What have you overcome that shows your resilience?" },
      { id: "resilient_develop", text: "How have you developed this resilience?" },
      { id: "resilient_support", text: "What supports your resilience during challenges?" },
    ],
    Independent: [
      { id: "independent_decision", text: "What independent decision or action are you taking?" },
      { id: "independent_value", text: "What do you value about independence?" },
      { id: "independent_balance", text: "How do you balance independence with connection?" },
    ],
    Grounded: [
      { id: "grounded_practice", text: "What practices help you feel grounded?" },
      { id: "grounded_body", text: "How does being grounded feel in your body?" },
      { id: "grounded_challenge", text: "How does being grounded help you face challenges?" },
    ],
    Courageous: [
      { id: "courageous_action", text: "What courageous action did you take?" },
      { id: "courageous_fear", text: "What fear did you face?" },
      { id: "courageous_strength", text: "What strength did you draw upon?" },
    ],
    Brave: [
      { id: "brave_face", text: "What are you bravely facing?" },
      { id: "brave_despite", text: "How are you moving forward despite fear?" },
      { id: "brave_support", text: "What supports your bravery?" },
    ],
    Empowered: [
      { id: "empowered_situation", text: "In what situation do you feel empowered?" },
      { id: "empowered_source", text: "What is the source of this empowerment?" },
      { id: "empowered_use", text: "How might you use this sense of empowerment?" },
    ],
    Centered: [
      { id: "centered_practice", text: "What helps you feel centered?" },
      { id: "centered_body", text: "How does being centered feel in your body?" },
      { id: "centered_benefit", text: "How does being centered benefit you?" },
    ],
    "Self-assured": [
      { id: "selfassured_situation", text: "In what situation do you feel self-assured?" },
      { id: "selfassured_develop", text: "How have you developed this self-assurance?" },
      { id: "selfassured_maintain", text: "How do you maintain this self-assurance during challenges?" },
    ],
    default: [
      { id: "empowerment_source", text: "What is the source of this empowerment?" },
      { id: "empowerment_strength", text: "What strength are you connecting with?" },
      { id: "empowerment_forward", text: "How can you carry this forward?" },
    ],
  },

  // Calm / Stillness
  calm: {
    Relaxed: [
      { id: "relaxed_tension", text: "What tension have you released?" },
      { id: "relaxed_body", text: "How does relaxation feel in your body?" },
      { id: "relaxed_practice", text: "What helps you relax when you're tense?" },
    ],
    Peaceful: [
      { id: "peaceful_environment", text: "What in your environment is contributing to this peace?" },
      { id: "peaceful_practice", text: "What practice helped you reach this state?" },
      { id: "peaceful_maintain", text: "How can you maintain this peaceful feeling?" },
    ],
    Tranquil: [
      { id: "tranquil_environment", text: "What environment helps you feel tranquil?" },
      { id: "tranquil_practice", text: "What practices foster tranquility for you?" },
      { id: "tranquil_contrast", text: "How does this tranquility contrast with other recent states?" },
    ],
    Reflective: [
      { id: "reflective_contemplating", text: "What are you reflecting on?" },
      { id: "reflective_insight", text: "What insights are emerging from this reflection?" },
      { id: "reflective_action", text: "What action might these reflections inspire?" },
    ],
    Meditative: [
      { id: "meditative_practice", text: "What meditative practice works best for you?" },
      { id: "meditative_benefit", text: "What benefits do you notice from meditation?" },
      { id: "meditative_challenge", text: "What challenges do you face in your practice?" },
    ],
    Settled: [
      { id: "settled_resolution", text: "What has been resolved that allows you to feel settled?" },
      { id: "settled_body", text: "How does being settled feel in your body?" },
      { id: "settled_maintain", text: "What helps you maintain this settled feeling?" },
    ],
    Grounded: [
      { id: "grounded_connection", text: "What are you feeling connected to?" },
      { id: "grounded_present", text: "What's helping you stay present?" },
      { id: "grounded_practice", text: "What grounding practice works best for you?" },
    ],
    Balanced: [
      { id: "balanced_areas", text: "Which areas of your life feel in balance right now?" },
      { id: "balanced_maintain", text: "What helps you maintain this balance?" },
      { id: "balanced_attention", text: "What area might need more attention to improve balance?" },
    ],
    Safe: [
      { id: "safe_environment", text: "What in your environment helps you feel safe?" },
      { id: "safe_relationship", text: "Which relationships contribute to your sense of safety?" },
      { id: "safe_create", text: "How do you create safety for yourself and others?" },
    ],
    Open: [
      { id: "open_receptive", text: "What are you feeling open and receptive to?" },
      { id: "open_barrier", text: "What barriers to openness have you overcome?" },
      { id: "open_benefit", text: "What benefits do you notice from this openness?" },
    ],
    default: [
      { id: "calm_present", text: "What's helping you feel present and calm?" },
      { id: "calm_body", text: "How does this calmness feel in your body?" },
      { id: "calm_practice", text: "What practice helps you return to this state?" },
    ],
  },

  // Complex / Ambiguous
  complex: {
    Conflicted: [
      { id: "conflicted_options", text: "What options or values are in conflict?" },
      { id: "conflicted_values", text: "Which core values are most important here?" },
      { id: "conflicted_wisdom", text: "What wisdom might help resolve this conflict?" },
    ],
    Nostalgic: [
      { id: "nostalgic_memory", text: "What memory is bringing up this nostalgia?" },
      { id: "nostalgic_feeling", text: "What feelings accompany this nostalgia?" },
      { id: "nostalgic_present", text: "How does this past experience inform your present?" },
    ],
    Awkward: [
      { id: "awkward_situation", text: "What situation feels awkward?" },
      { id: "awkward_response", text: "How are you responding to this awkwardness?" },
      { id: "awkward_ease", text: "What might help ease this awkward feeling?" },
    ],
    Ambivalent: [
      { id: "ambivalent_situation", text: "What situation are you feeling ambivalent about?" },
      { id: "ambivalent_mixed", text: "What mixed feelings are you experiencing?" },
      { id: "ambivalent_clarity", text: "What might help bring more clarity?" },
    ],
    Mixed: [
      { id: "mixed_emotions", text: "What different emotions are you experiencing?" },
      { id: "mixed_primary", text: "Which emotion feels strongest right now?" },
      { id: "mixed_wisdom", text: "What wisdom might these mixed feelings offer?" },
    ],
    Detached: [
      { id: "detached_disconnected", text: "What do you feel disconnected from?" },
      { id: "detached_protection", text: "How might this detachment be protecting you?" },
      { id: "detached_reconnect", text: "What might help you reconnect if you wish to?" },
    ],
    Indifferent: [
      { id: "indifferent_situation", text: "What situation are you feeling indifferent about?" },
      { id: "indifferent_beneath", text: "What might be beneath this indifference?" },
      { id: "indifferent_engage", text: "What might help you feel more engaged?" },
    ],
    Bored: [
      { id: "bored_situation", text: "What situation is boring you?" },
      { id: "bored_need", text: "What need might this boredom be pointing to?" },
      { id: "bored_engage", text: "What might engage your interest more fully?" },
    ],
    Surreal: [
      { id: "surreal_experience", text: "What experience feels surreal?" },
      { id: "surreal_reality", text: "How is this different from your normal reality?" },
      { id: "surreal_meaning", text: "What meaning might this surreal experience hold?" },
    ],
    Pensive: [
      { id: "pensive_thinking", text: "What are you thinking deeply about?" },
      { id: "pensive_insight", text: "What insights are emerging from this pensiveness?" },
      { id: "pensive_action", text: "What action might these thoughts inspire?" },
    ],
    Reflective: [
      { id: "reflective_contemplating", text: "What are you reflecting on?" },
      { id: "reflective_insight", text: "What insights are emerging from this reflection?" },
      { id: "reflective_action", text: "What action might these reflections inspire?" },
    ],
    Intrigued: [
      { id: "intrigued_attention", text: "What has captured your attention?" },
      { id: "intrigued_questions", text: "What questions does this raise for you?" },
      { id: "intrigued_explore", text: "How might you explore this intrigue further?" },
    ],
    Envious: [
      { id: "envious_desire", text: "What do you desire that someone else has?" },
      { id: "envious_need", text: "What need might be beneath this envy?" },
      { id: "envious_action", text: "What action might you take toward fulfilling this need?" },
    ],
    Cynical: [
      { id: "cynical_distrust", text: "What are you feeling cynical or distrustful about?" },
      { id: "cynical_experience", text: "What experiences have contributed to this cynicism?" },
      { id: "cynical_perspective", text: "What alternative perspective might be worth considering?" },
    ],
    Skeptical: [
      { id: "skeptical_doubt", text: "What are you doubting or questioning?" },
      { id: "skeptical_evidence", text: "What evidence would help you evaluate this?" },
      { id: "skeptical_balance", text: "How do you balance healthy skepticism with openness?" },
    ],
    Distracted: [
      { id: "distracted_attention", text: "What is distracting your attention?" },
      { id: "distracted_focus", text: "What would you prefer to focus on?" },
      { id: "distracted_strategy", text: "What strategy might help you regain focus?" },
    ],
    Restless: [
      { id: "restless_energy", text: "What restless energy are you experiencing?" },
      { id: "restless_need", text: "What need might this restlessness be pointing to?" },
      { id: "restless_channel", text: "How might you channel this restless energy?" },
    ],
    Alienated: [
      { id: "alienated_disconnected", text: "From what or whom do you feel alienated?" },
      { id: "alienated_contribute", text: "What has contributed to this feeling of alienation?" },
      { id: "alienated_connection", text: "What might help you feel more connected?" },
    ],
    Curious: [
      { id: "curious_interest", text: "What has sparked your curiosity?" },
      { id: "curious_explore", text: "How might you explore this interest further?" },
      { id: "curious_learn", text: "What would you like to learn about this?" },
    ],
    Inspired: [
      { id: "inspired_source", text: "What or who has inspired you?" },
      { id: "inspired_create", text: "What does this inspiration make you want to create or do?" },
      { id: "inspired_meaning", text: "What meaning does this inspiration hold for you?" },
    ],
    default: [
      { id: "complex_feelings", text: "What different feelings are you experiencing?" },
      { id: "complex_tension", text: "Where do you feel tension or uncertainty?" },
      { id: "complex_wisdom", text: "What wisdom might this complexity be offering?" },
    ],
  },

  // Default questions for any emotion
  default: [
    { id: "emotion_feeling", text: "How does this emotion feel in your body?" },
    { id: "emotion_trigger", text: "What triggered this emotion?" },
    { id: "emotion_response", text: "How did you respond to this emotion?" },
  ],
}

// Helper function to get questions for a specific emotion
export function getQuestionsForEmotion(category: string, emotion: string) {
  const categoryKey = category.toLowerCase().split(" ")[0]
  const categoryQuestions = reflectionQuestions[categoryKey as keyof typeof reflectionQuestions]

  if (!categoryQuestions) {
    return reflectionQuestions.default
  }

  if (typeof categoryQuestions === "object" && emotion in categoryQuestions) {
    return categoryQuestions[emotion as keyof typeof categoryQuestions]
  }

  // Return category default questions if available, otherwise global default
  return categoryQuestions.default || reflectionQuestions.default
}
