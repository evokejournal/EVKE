import {
  faBrain,
  faPersonWalking,
  faPersonFallingBurst,
  faSpa,
  faPuzzlePiece,
  faWind,
  faUserGroup,
  faEarthAmericas,
} from "@fortawesome/free-solid-svg-icons"

export type CategoryType =
  | "Cognitive Restructuring"
  | "Behavioral Activation"
  | "Exposure Techniques"
  | "Mindfulness"
  | "Problem Solving"
  | "Relaxation"
  | "Social Skills"
  | "Grounding"

export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced"
export type EvidenceLevel = "Strong" | "Moderate" | "Limited"

export interface CBTExercise {
  id: string
  title: string
  difficulty: DifficultyLevel
  evidence: EvidenceLevel
  category: CategoryType
  description: string
  instructions: string
  targetEmotions?: string[] // For recommendation engine
  contraindications?: string[] // Emotions or states where this might not be helpful
}

export const categoryInfo = {
  "Cognitive Restructuring": {
    name: "Cognitive Restructuring",
    color: "#2563EB", // Blue-600
    bgColor: "#EFF6FF", // Blue-100
    borderColor: "#DBEAFE", // Blue-200
    icon: faBrain,
  },
  "Behavioral Activation": {
    name: "Behavioral Activation",
    color: "#059669", // Green-600
    bgColor: "#ECFDF5", // Green-50
    borderColor: "#D1FAE5", // Green-100
    icon: faPersonWalking,
  },
  "Exposure Techniques": {
    name: "Exposure Techniques",
    color: "#DC2626", // Red-600
    bgColor: "#FEF2F2", // Red-50
    borderColor: "#FEE2E2", // Red-100
    icon: faPersonFallingBurst,
  },
  Mindfulness: {
    name: "Mindfulness",
    color: "#8B5CF6", // Purple-600
    bgColor: "#F5F3FF", // Purple-50
    borderColor: "#EDE9FE", // Purple-100
    icon: faSpa,
  },
  "Problem Solving": {
    name: "Problem Solving",
    color: "#CA8A04", // Amber-600
    bgColor: "#FFFBEB", // Amber-50
    borderColor: "#FEF3C7", // Amber-100
    icon: faPuzzlePiece,
  },
  Relaxation: {
    name: "Relaxation",
    color: "#06B6D4", // Cyan-500
    bgColor: "#E0F2FE", // Sky-50
    borderColor: "#CFFAFE", // Sky-100
    icon: faWind,
  },
  "Social Skills": {
    name: "Social Skills",
    color: "#10B981", // Emerald-500
    bgColor: "#F0FDF4", // Emerald-50
    borderColor: "#DCFCE7", // Emerald-100
    icon: faUserGroup,
  },
  Grounding: {
    name: "Grounding",
    color: "#6366F1", // Indigo
    bgColor: "#EEF2FF",
    borderColor: "#C7D2FE",
    icon: faEarthAmericas,
  },
}

export const cbtExercises: CBTExercise[] = [
  // Cognitive Restructuring
  {
    id: "thought-record",
    title: "Thought Record",
    difficulty: "Beginner",
    evidence: "Strong",
    category: "Cognitive Restructuring",
    description: "Identify and challenge negative automatic thoughts.",
    instructions: `
1. **Situation:** Describe the situation that led to the negative thought.
2. **Automatic Thoughts:** What thoughts went through your mind? Rate how much you believed each thought (0-100%).
3. **Emotions:** What emotions did you experience? Rate the intensity of each emotion (0-100%).
4. **Evidence For:** What evidence supports the automatic thought?
5. **Evidence Against:** What evidence contradicts the automatic thought?
6. **Alternative Thought:** Develop a more balanced and realistic thought.
7. **Re-rate Belief:** How much do you believe the automatic thought now (0-100%)?
8. **Re-rate Emotions:** How intense are your emotions now (0-100%)?

Example:
1. **Situation:** Received critical feedback from my boss.
2. **Automatic Thought:** "I'm going to get fired." (90%)
3. **Emotions:** Anxiety (85%), Sadness (70%)
4. **Evidence For:** Boss seemed unhappy, feedback was direct.
5. **Evidence Against:** I've received positive feedback before, I'm meeting most expectations, this is one area for improvement.
6. **Alternative Thought:** "This is an opportunity to learn and grow. I can address the feedback and improve my performance."
7. **Re-rate Belief:** 30%
8. **Re-rate Emotions:** Anxiety (40%), Sadness (30%)
    `,
    targetEmotions: ["Anxious", "Depressed", "Self-critical", "Worried"],
  },
  {
    id: "behavioral-experiment",
    title: "Behavioral Experiment",
    difficulty: "Intermediate",
    evidence: "Strong",
    category: "Cognitive Restructuring",
    description: "Test the validity of a negative thought through real-world experimentation.",
    instructions: `
1. **Identify the Thought:** What specific thought do you want to test?
2. **Predict the Outcome:** What do you expect will happen if the thought is true?
3. **Design the Experiment:** What will you do to test the thought?
4. **Conduct the Experiment:** Carry out the planned activity.
5. **Observe the Results:** What actually happened?
6. **Evaluate the Thought:** Did the results support or contradict the original thought?
7. **Develop a New Thought:** Based on the results, what's a more balanced perspective?

Example:
1. **Identify the Thought:** "If I speak up in meetings, people will think I'm stupid."
2. **Predict the Outcome:** People will roll their eyes, ignore me, or criticize my ideas.
3. **Design the Experiment:** In the next meeting, I will share one idea or opinion.
4. **Conduct the Experiment:** I shared my idea during the meeting.
5. **Observe the Results:** People listened attentively, asked clarifying questions, and built upon my idea.
6. **Evaluate the Thought:** The results contradicted my original thought. People were receptive and respectful.
7. **Develop a New Thought:** "Sharing my ideas can be valuable and contribute to the discussion."
    `,
    targetEmotions: ["Anxious", "Fearful", "Insecure", "Self-conscious"],
  },
  {
    id: "decatastrophizing",
    title: "Decatastrophizing",
    difficulty: "Beginner",
    evidence: "Moderate",
    category: "Cognitive Restructuring",
    description: "Challenge the 'what if' scenarios and worst-case thinking.",
    instructions: `
1. **Identify the Fear:** What is the specific catastrophic event you're worried about?
2. **Rate the Likelihood:** How likely is this event to actually happen (0-100%)?
3. **Imagine the Worst:** If the worst did happen, what would be so bad about it?
4. **Coping Strategies:** What resources or coping mechanisms would you have to deal with it?
5. **Focus on the Present:** What can you do right now to manage your anxiety?
6. **Challenge the Thought:** Is there a more realistic or balanced way to view the situation?

Example:
1. **Identify the Fear:** "What if I have a panic attack in public?"
2. **Rate the Likelihood:** 60%
3. **Imagine the Worst:** I'd feel embarrassed, people would stare, I might faint.
4. **Coping Strategies:** I can focus on my breathing, use a grounding technique, find a quiet place, or call a friend.
5. **Focus on the Present:** I'm safe right now, I'm breathing, I can feel my feet on the ground.
6. **Challenge the Thought:** Even if I had a panic attack, it would be temporary, and I've coped with them before. Most people wouldn't even notice or care.
    `,
    targetEmotions: ["Anxious", "Panicked", "Worried", "Overwhelmed"],
  },
  {
    id: "cognitive-restructuring-worksheet",
    title: "Cognitive Restructuring Worksheet",
    difficulty: "Beginner",
    evidence: "Strong",
    category: "Cognitive Restructuring",
    description: "A structured worksheet to identify, challenge, and reframe negative thoughts.",
    instructions: `
1. **Situation:** Briefly describe the situation or event that triggered the negative thought.
2. **Automatic Thought:** Write down the negative thought that came to mind.
3. **Evidence For:** List the evidence that supports the negative thought.
4. **Evidence Against:** List the evidence that contradicts the negative thought.
5. **Alternative Thought:** Write down a more balanced and realistic thought.
6. **Outcome:** How do you feel now after reframing the thought?

Example:
1. **Situation:** I didn't get a job I interviewed for.
2. **Automatic Thought:** "I'm not good enough, I'll never find a job."
3. **Evidence For:** I didn't get the job, the competition is tough.
4. **Evidence Against:** I have many skills and experiences, I've had successful interviews before, the right job is out there.
5. **Alternative Thought:** "This job wasn't the right fit, but I'll keep applying and find a better opportunity."
6. **Outcome:** I feel more hopeful and motivated to continue my job search.
    `,
    targetEmotions: ["Anxious", "Depressed", "Discouraged", "Hopeless"],
  },
  // Behavioral Activation
  {
    id: "activity-scheduling",
    title: "Activity Scheduling",
    difficulty: "Beginner",
    evidence: "Strong",
    category: "Behavioral Activation",
    description: "Plan and schedule activities to increase engagement and improve mood.",
    instructions: `
1. **Identify Activities:** List activities you used to enjoy or that give you a sense of accomplishment.
2. **Schedule Activities:** Plan specific times to engage in these activities throughout the week.
3. **Monitor Mood:** Track your mood before and after each activity.
4. **Adjust Schedule:** Modify the schedule based on your mood and energy levels.

Example:
1. **Identify Activities:** Reading, walking, listening to music, calling a friend.
2. **Schedule Activities:**
    - Monday: Walk for 30 minutes at 6:00 PM.
    - Wednesday: Call a friend at 7:00 PM.
    - Friday: Listen to music for 1 hour at 8:00 PM.
    - Saturday: Read for 1 hour at 10:00 AM.
3. **Monitor Mood:** Rate mood before and after each activity on a scale of 1-10.
4. **Adjust Schedule:** If walking improves mood significantly, schedule more walks.
    `,
    targetEmotions: ["Depressed", "Unmotivated", "Lethargic", "Bored"],
  },
  {
    id: "pleasant-activities",
    title: "Pleasant Activities List",
    difficulty: "Beginner",
    evidence: "Moderate",
    category: "Behavioral Activation",
    description: "Create a list of enjoyable activities to combat low mood and increase positive experiences.",
    instructions: `
1. **Brainstorm Activities:** List as many activities as you can think of that you find enjoyable or relaxing.
2. **Categorize Activities:** Group activities into categories (e.g., social, creative, physical, relaxing).
3. **Rate Enjoyment:** Rate each activity on a scale of 1-10 based on how much you enjoy it.
4. **Schedule Activities:** Choose a few activities from the list and schedule them into your week.
5. **Reflect on Experience:** After each activity, reflect on how it made you feel.

Example:
1. **Brainstorm Activities:**
    - Social: Meeting friends, calling family, joining a club.
    - Creative: Painting, writing, playing music.
    - Physical: Walking, swimming, dancing.
    - Relaxing: Taking a bath, reading, listening to music.
2. **Categorize Activities:** (See above)
3. **Rate Enjoyment:** Rate each activity on a scale of 1-10.
4. **Schedule Activities:** Schedule a walk with a friend and a relaxing bath this week.
5. **Reflect on Experience:** Note how each activity affected your mood and energy levels.
    `,
    targetEmotions: ["Depressed", "Sad", "Unmotivated", "Bored"],
  },
  {
    id: "goal-setting",
    title: "Goal Setting",
    difficulty: "Beginner",
    evidence: "Strong",
    category: "Behavioral Activation",
    description: "Set achievable goals to increase motivation and a sense of accomplishment.",
    instructions: `
1. **Identify Values:** What is important to you in life? What do you want to achieve?
2. **Set SMART Goals:**
    - Specific: What exactly do you want to achieve?
    - Measurable: How will you know when you've achieved it?
    - Achievable: Is it realistic and attainable?
    - Relevant: Does it align with your values?
    - Time-bound: When do you want to achieve it?
3. **Break Down Goals:** Divide large goals into smaller, manageable steps.
4. **Track Progress:** Monitor your progress and celebrate milestones.

Example:
1. **Identify Values:** Health, learning, connection.
2. **Set SMART Goals:**
    - Specific: Walk for 30 minutes, 3 times a week.
    - Measurable: Track the duration and frequency of walks.
    - Achievable: Start with shorter walks and gradually increase duration.
    - Relevant: Improves physical and mental health.
    - Time-bound: Achieve this within one month.
3. **Break Down Goals:**
    - Week 1: Walk for 15 minutes, 3 times.
    - Week 2: Walk for 20 minutes, 3 times.
    - Week 3: Walk for 25 minutes, 3 times.
    - Week 4: Walk for 30 minutes, 3 times.
4. **Track Progress:** Use a journal or app to record walks and mood.
    `,
    targetEmotions: ["Depressed", "Unmotivated", "Directionless", "Stuck"],
  },
  {
    id: "behavioral-activation-worksheet",
    title: "Behavioral Activation Worksheet",
    difficulty: "Beginner",
    evidence: "Strong",
    category: "Behavioral Activation",
    description: "A structured worksheet to plan and track activities that increase positive engagement.",
    instructions: `
1. **Activity:** Describe the activity you plan to engage in.
2. **Goal:** What do you hope to achieve by doing this activity?
3. **Schedule:** When and where will you do this activity?
4. **Anticipated Enjoyment:** How much do you expect to enjoy this activity (1-10)?
5. **Actual Enjoyment:** How much did you actually enjoy this activity (1-10)?
6. **Impact on Mood:** How did this activity affect your mood?

Example:
1. **Activity:** Go for a walk in the park.
2. **Goal:** Improve mood and get some exercise.
3. **Schedule:** Saturday at 10:00 AM.
4. **Anticipated Enjoyment:** 7
5. **Actual Enjoyment:** 8
6. **Impact on Mood:** Felt more relaxed and energized.
    `,
    targetEmotions: ["Depressed", "Unmotivated", "Lethargic", "Bored"],
  },
  // Exposure Techniques
  {
    id: "exposure-hierarchy",
    title: "Exposure Hierarchy",
    difficulty: "Intermediate",
    evidence: "Strong",
    category: "Exposure Techniques",
    description: "Create a list of feared situations and gradually expose yourself to them.",
    instructions: `
1. **Identify Fears:** List specific situations or stimuli that trigger anxiety or fear.
2. **Rate Anxiety:** Rate the level of anxiety associated with each item on a scale of 0-100.
3. **Create Hierarchy:** Arrange the items in order from least to most anxiety-provoking.
4. **Start Exposure:** Begin with the least anxiety-provoking item and gradually work your way up the hierarchy.
5. **Stay in Situation:** Remain in the situation until your anxiety decreases significantly.
6. **Repeat Exposure:** Repeat the exposure until you feel comfortable with the situation.

Example:
1. **Identify Fears:** Public speaking, social gatherings, heights.
2. **Rate Anxiety:** Rate each fear on a scale of 0-100.
3. **Create Hierarchy:**
    - 10: Thinking about public speaking.
    - 30: Preparing a speech.
    - 50: Practicing the speech in front of a mirror.
    - 70: Practicing the speech in front of a friend.
    - 90: Giving the speech to a small group.
    - 100: Giving the speech to a large audience.
4. **Start Exposure:** Begin by thinking about public speaking and gradually work your way up the hierarchy.
5. **Stay in Situation:** Remain in each situation until your anxiety decreases significantly.
6. **Repeat Exposure:** Repeat each exposure until you feel comfortable.
    `,
    targetEmotions: ["Anxious", "Fearful", "Phobic", "Avoidant"],
  },
  {
    id: "in-vivo-exposure",
    title: "In-Vivo Exposure",
    difficulty: "Intermediate",
    evidence: "Strong",
    category: "Exposure Techniques",
    description: "Directly face feared situations in real life to reduce anxiety.",
    instructions: `
1. **Identify Fear:** What specific situation or stimulus do you want to confront?
2. **Plan Exposure:** Choose a time and place to engage in the exposure.
3. **Engage in Exposure:** Directly face the feared situation.
4. **Stay in Situation:** Remain in the situation until your anxiety decreases.
5. **Repeat Exposure:** Repeat the exposure regularly until you feel comfortable.

Example:
1. **Identify Fear:** Fear of dogs.
2. **Plan Exposure:** Visit a park where dogs are present.
3. **Engage in Exposure:** Observe dogs from a distance.
4. **Stay in Situation:** Remain in the park until your anxiety decreases.
5. **Repeat Exposure:** Visit the park regularly and gradually get closer to the dogs.
    `,
    targetEmotions: ["Anxious", "Fearful", "Phobic", "Avoidant"],
  },
  {
    id: "imaginal-exposure",
    title: "Imaginal Exposure",
    difficulty: "Intermediate",
    evidence: "Moderate",
    category: "Exposure Techniques",
    description: "Repeatedly imagine feared situations to reduce anxiety.",
    instructions: `
1. **Identify Fear:** What specific situation or stimulus do you want to imagine?
2. **Create Script:** Write a detailed script describing the feared situation.
3. **Imagine Situation:** Close your eyes and vividly imagine the situation.
4. **Focus on Sensations:** Pay attention to your physical and emotional sensations.
5. **Repeat Exposure:** Repeat the imaginal exposure regularly until your anxiety decreases.

Example:
1. **Identify Fear:** Traumatic event.
2. **Create Script:** Write a detailed account of the traumatic event.
3. **Imagine Situation:** Close your eyes and vividly imagine the event.
4. **Focus on Sensations:** Pay attention to your physical and emotional sensations.
5. **Repeat Exposure:** Repeat the imaginal exposure regularly until your anxiety decreases.
    `,
    targetEmotions: ["Anxious", "Traumatized", "Fearful", "Distressed"],
  },
  {
    id: "exposure-therapy-worksheet",
    title: "Exposure Therapy Worksheet",
    difficulty: "Intermediate",
    evidence: "Strong",
    category: "Exposure Techniques",
    description: "A structured worksheet to plan and track exposure exercises.",
    instructions: `
1. **Fear:** What is the specific fear you are targeting?
2. **Exposure:** Describe the exposure exercise you will engage in.
3. **Anxiety Level:** Rate your anxiety level before, during, and after the exposure (0-100).
4. **Duration:** How long did you engage in the exposure?
5. **Outcome:** What did you learn from the exposure?

Example:
1. **Fear:** Social anxiety.
2. **Exposure:** Attend a social gathering.
3. **Anxiety Level:**
    - Before: 70
    - During: 80
    - After: 50
4. **Duration:** 2 hours.
5. **Outcome:** I was able to engage in conversations and felt less anxious over time.
    `,
    targetEmotions: ["Anxious", "Fearful", "Phobic", "Avoidant"],
  },
  // Mindfulness
  {
    id: "mindful-breathing",
    title: "Mindful Breathing",
    difficulty: "Beginner",
    evidence: "Strong",
    category: "Mindfulness",
    description: "Focus on your breath to anchor yourself in the present moment.",
    instructions: `
1. **Find a Quiet Place:** Sit or lie down in a comfortable position.
2. **Close Your Eyes:** Gently close your eyes.
3. **Focus on Breath:** Pay attention to the sensation of your breath entering and leaving your body.
4. **Notice Thoughts:** When your mind wanders, gently redirect your attention back to your breath.
5. **Continue Breathing:** Continue for 5-10 minutes.

Example:
1. **Find a Quiet Place:** Sit comfortably on a chair.
2. **Close Your Eyes:** Gently close your eyes.
3. **Focus on Breath:** Notice the rise and fall of your chest or abdomen.
4. **Notice Thoughts:** When you think about your to-do list, gently redirect your attention back to your breath.
5. **Continue Breathing:** Continue for 5-10 minutes.
    `,
    targetEmotions: ["Anxious", "Stressed", "Overwhelmed", "Distracted"],
  },
  {
    id: "body-scan-meditation",
    title: "Body Scan Meditation",
    difficulty: "Beginner",
    evidence: "Moderate",
    category: "Mindfulness",
    description: "Bring awareness to different parts of your body to increase present moment awareness.",
    instructions: `
1. **Find a Quiet Place:** Lie down in a comfortable position.
2. **Close Your Eyes:** Gently close your eyes.
3. **Focus on Body:** Bring your attention to different parts of your body, starting with your toes and working your way up to your head.
4. **Notice Sensations:** Pay attention to any sensations you feel in each part of your body.
5. **Acknowledge Sensations:** Acknowledge any sensations without judgment.
6. **Continue Scanning:** Continue scanning your body for 10-15 minutes.

Example:
1. **Find a Quiet Place:** Lie down on a yoga mat.
2. **Close Your Eyes:** Gently close your eyes.
3. **Focus on Body:** Start with your toes and gradually move your attention up your body.
4. **Notice Sensations:** Notice any tingling, warmth, or pressure in each part of your body.
5. **Acknowledge Sensations:** Acknowledge any sensations without judgment.
6. **Continue Scanning:** Continue scanning your body for 10-15 minutes.
    `,
    targetEmotions: ["Anxious", "Stressed", "Tense", "Disconnected"],
  },
  {
    id: "mindful-walking",
    title: "Mindful Walking",
    difficulty: "Beginner",
    evidence: "Moderate",
    category: "Mindfulness",
    description: "Pay attention to the sensations of walking to increase present moment awareness.",
    instructions: `
1. **Find a Quiet Place:** Choose a safe and quiet place to walk.
2. **Focus on Feet:** Pay attention to the sensation of your feet making contact with the ground.
3. **Notice Body:** Notice the movement of your body as you walk.
4. **Engage Senses:** Engage your senses and notice the sights, sounds, and smells around you.
5. **Continue Walking:** Continue walking for 10-15 minutes.

Example:
1. **Find a Quiet Place:** Walk in a park.
2. **Focus on Feet:** Pay attention to the sensation of your feet making contact with the ground.
3. **Notice Body:** Notice the movement of your legs and arms as you walk.
4. **Engage Senses:** Notice the trees, birds, and the smell of fresh air.
5. **Continue Walking:** Continue walking for 10-15 minutes.
    `,
    targetEmotions: ["Anxious", "Stressed", "Distracted", "Restless"],
  },
  {
    id: "mindfulness-worksheet",
    title: "Mindfulness Worksheet",
    difficulty: "Beginner",
    evidence: "Strong",
    category: "Mindfulness",
    description: "A structured worksheet to practice mindfulness in daily life.",
    instructions: `
1. **Situation:** Describe the situation you are in.
2. **Senses:** What do you see, hear, smell, taste, and touch?
3. **Thoughts:** What thoughts are going through your mind?
4. **Emotions:** What emotions are you experiencing?
5. **Action:** What action can you take to be more mindful in this situation?

Example:
1. **Situation:** Eating lunch.
2. **Senses:**
    - See: The colors of the food.
    - Hear: The sounds of chewing.
    - Smell: The aroma of the food.
    - Taste: The flavors of the food.
    - Touch: The texture of the food.
3. **Thoughts:** "I should be working."
4. **Emotions:** Guilt.
5. **Action:** Focus on enjoying the meal and let go of the guilt.
    `,
    targetEmotions: ["Anxious", "Stressed", "Distracted", "Overwhelmed"],
  },
  // Problem Solving
  {
    id: "problem-solving-worksheet",
    title: "Problem-Solving Worksheet",
    difficulty: "Beginner",
    evidence: "Strong",
    category: "Problem Solving",
    description: "A structured worksheet to identify and solve problems effectively.",
    instructions: `
1. **Identify the Problem:** Clearly define the problem you want to solve.
2. **Brainstorm Solutions:** List as many possible solutions as you can think of.
3. **Evaluate Solutions:** Evaluate the pros and cons of each solution.
4. **Choose a Solution:** Select the best solution based on your evaluation.
5. **Implement Solution:** Put the solution into action.
6. **Evaluate Outcome:** Evaluate the outcome of the solution and make adjustments if necessary.

Example:
1. **Identify the Problem:** Feeling overwhelmed with work.
2. **Brainstorm Solutions:**
    - Delegate tasks.
    - Prioritize tasks.
    - Ask for help.
    - Take breaks.
3. **Evaluate Solutions:** Evaluate the pros and cons of each solution.
4. **Choose a Solution:** Prioritize tasks.
5. **Implement Solution:** Create a to-do list and prioritize tasks based on importance and urgency.
6. **Evaluate Outcome:** Feeling less overwhelmed and more in control of work.
    `,
    targetEmotions: ["Stressed", "Overwhelmed", "Anxious", "Frustrated"],
  },
  {
    id: "define-the-problem",
    title: "Define the Problem",
    difficulty: "Beginner",
    evidence: "Moderate",
    category: "Problem Solving",
    description: "Clearly define the problem to find effective solutions.",
    instructions: `
1. **Describe the Problem:** Write a clear and concise description of the problem.
2. **Identify Causes:** What are the possible causes of the problem?
3. **Set Goals:** What do you want to achieve by solving the problem?
4. **Gather Information:** Collect relevant information about the problem.

Example:
1. **Describe the Problem:** Difficulty sleeping.
2. **Identify Causes:** Stress, anxiety, poor sleep hygiene.
3. **Set Goals:** Improve sleep quality and duration.
4. **Gather Information:** Track sleep patterns, identify stressors, research sleep hygiene tips.
    `,
    targetEmotions: ["Stressed", "Anxious", "Frustrated", "Irritable"],
  },
  {
    id: "brainstorm-solutions",
    title: "Brainstorm Solutions",
    difficulty: "Beginner",
    evidence: "Moderate",
    category: "Problem Solving",
    description: "Generate a list of potential solutions to a problem.",
    instructions: `
1. **State the Problem:** Clearly state the problem you want to solve.
2. **Generate Ideas:** List as many possible solutions as you can think of.
3. **Don't Judge:** Avoid criticizing or evaluating ideas during the brainstorming process.
4. **Be Creative:** Think outside the box and consider unconventional solutions.

Example:
1. **State the Problem:** Feeling lonely.
2. **Generate Ideas:**
    - Join a club.
    - Volunteer.
    - Call a friend.
    - Attend a social event.
    - Take a class.
3. **Don't Judge:** Avoid criticizing or evaluating ideas during the brainstorming process.
4. **Be Creative:** Think outside the box and consider unconventional solutions.
    `,
    targetEmotions: ["Lonely", "Isolated", "Sad", "Disconnected"],
  },
  {
    id: "evaluate-solutions",
    title: "Evaluate Solutions",
    difficulty: "Beginner",
    evidence: "Moderate",
    category: "Problem Solving",
    description: "Evaluate the pros and cons of each potential solution.",
    instructions: `
1. **List Solutions:** List the potential solutions you have brainstormed.
2. **Identify Pros:** What are the advantages of each solution?
3. **Identify Cons:** What are the disadvantages of each solution?
4. **Weigh Pros and Cons:** Consider the pros and cons of each solution and determine which is the most feasible and effective.

Example:
1. **List Solutions:**
    - Join a club.
    - Volunteer.
    - Call a friend.
    - Attend a social event.
    - Take a class.
2. **Identify Pros:**
    - Join a club: Meet new people with similar interests.
    - Volunteer: Help others and feel good about yourself.
    - Call a friend: Connect with someone you care about.
    - Attend a social event: Meet new people and have fun.
    - Take a class: Learn something new and meet new people.
3. **Identify Cons:**
    - Join a club: Requires time commitment.
    - Volunteer: Requires time commitment.
    - Call a friend: Friend may not be available.
    - Attend a social event: May feel awkward or uncomfortable.
    - Take a class: Requires time and money.
4. **Weigh Pros and Cons:** Consider the pros and cons of each solution and determine which is the most feasible and effective.
    `,
    targetEmotions: ["Confused", "Uncertain", "Stuck", "Overwhelmed"],
  },
  // Relaxation
  {
    id: "progressive-muscle-relaxation",
    title: "Progressive Muscle Relaxation",
    difficulty: "Beginner",
    evidence: "Strong",
    category: "Relaxation",
    description: "Tense and release different muscle groups to reduce tension and promote relaxation.",
    instructions: `
1. **Find a Quiet Place:** Lie down in a comfortable position.
2. **Close Your Eyes:** Gently close your eyes.
3. **Tense Muscles:** Tense a specific muscle group for 5-10 seconds.
4. **Release Muscles:** Release the tension and relax for 10-20 seconds.
5. **Repeat:** Repeat the process with different muscle groups, starting with your feet and working your way up to your head.

Example:
1. **Find a Quiet Place:** Lie down on a yoga mat.
2. **Close Your Eyes:** Gently close your eyes.
3. **Tense Muscles:** Tense your feet for 5-10 seconds.
4. **Release Muscles:** Release the tension and relax for 10-20 seconds.
5. **Repeat:** Repeat the process with different muscle groups, starting with your feet and working your way up to your head.
    `,
    targetEmotions: ["Anxious", "Stressed", "Tense", "Overwhelmed"],
  },
  {
    id: "deep-breathing-exercises",
    title: "Deep Breathing Exercises",
    difficulty: "Beginner",
    evidence: "Strong",
    category: "Relaxation",
    description: "Practice deep breathing techniques to calm your mind and body.",
    instructions: `
1. **Find a Quiet Place:** Sit or lie down in a comfortable position.
2. **Close Your Eyes:** Gently close your eyes.
3. **Inhale Deeply:** Inhale slowly and deeply through your nose, filling your lungs with air.
4. **Exhale Slowly:** Exhale slowly through your mouth, releasing all the air from your lungs.
5. **Repeat:** Repeat the process for 5-10 minutes.

Example:
1. **Find a Quiet Place:** Sit comfortably on a chair.
2. **Close Your Eyes:** Gently close your eyes.
3. **Inhale Deeply:** Inhale slowly and deeply through your nose, filling your lungs with air.
4. **Exhale Slowly:** Exhale slowly through your mouth, releasing all the air from your lungs.
5. **Repeat:** Repeat the process for 5-10 minutes.
    `,
    targetEmotions: ["Anxious", "Stressed", "Panicked", "Overwhelmed"],
  },
  {
    id: "guided-imagery",
    title: "Guided Imagery",
    difficulty: "Beginner",
    evidence: "Moderate",
    category: "Relaxation",
    description: "Use your imagination to create a peaceful and relaxing mental image.",
    instructions: `
1. **Find a Quiet Place:** Sit or lie down in a comfortable position.
2. **Close Your Eyes:** Gently close your eyes.
3. **Imagine a Scene:** Imagine a peaceful and relaxing scene, such as a beach, forest, or mountain.
4. **Engage Senses:** Engage your senses and imagine the sights, sounds, smells, and textures of the scene.
5. **Relax:** Allow yourself to relax and enjoy the peacefulness of the scene.

Example:
1. **Find a Quiet Place:** Lie down on a yoga mat.
2. **Close Your Eyes:** Gently close your eyes.
3. **Imagine a Scene:** Imagine a beach with white sand, blue water, and palm trees.
4. **Engage Senses:** Imagine the sound of the waves, the smell of the ocean, and the warmth of the sun on your skin.
5. **Relax:** Allow yourself to relax and enjoy the peacefulness of the scene.
    `,
    targetEmotions: ["Anxious", "Stressed", "Overwhelmed", "Scared"],
  },
  {
    id: "relaxation-techniques-worksheet",
    title: "Relaxation Techniques Worksheet",
    difficulty: "Beginner",
    evidence: "Strong",
    category: "Relaxation",
    description: "A structured worksheet to practice and track relaxation techniques.",
    instructions: `
1. **Technique:** Describe the relaxation technique you will practice.
2. **Duration:** How long will you practice the technique?
3. **Anxiety Level:** Rate your anxiety level before and after the technique (0-100).
4. **Outcome:** How did the technique affect your mood and relaxation level?

Example:
1. **Technique:** Deep breathing exercises.
2. **Duration:** 5 minutes.
3. **Anxiety Level:**
    - Before: 70
    - After: 30
4. **Outcome:** Felt more relaxed and calm.
    `,
    targetEmotions: ["Anxious", "Stressed", "Tense", "Overwhelmed"],
  },
  // Social Skills
  {
    id: "assertiveness-training",
    title: "Assertiveness Training",
    difficulty: "Intermediate",
    evidence: "Strong",
    category: "Social Skills",
    description: "Learn to express your needs and opinions in a clear and respectful manner.",
    instructions: `
1. **Identify Needs:** What are your needs and opinions in a specific situation?
2. **Express Needs:** Express your needs and opinions in a clear and respectful manner.
3. **Set Boundaries:** Set boundaries and say no when necessary.
4. **Handle Conflict:** Handle conflict in a constructive and assertive manner.

Example:
1. **Identify Needs:** Need to decline a request to work overtime.
2. **Express Needs:** "I appreciate the offer, but I'm unable to work overtime tonight."
3. **Set Boundaries:** "I'm not available to work overtime on weekdays."
4. **Handle Conflict:** If the person becomes upset, calmly reiterate your boundaries and explain your reasons.
    `,
    targetEmotions: ["Anxious", "Insecure", "Passive", "Resentful"],
  },
  {
    id: "active-listening",
    title: "Active Listening",
    difficulty: "Beginner",
    evidence: "Strong",
    category: "Social Skills",
    description: "Practice active listening skills to improve communication and build relationships.",
    instructions: `
1. **Pay Attention:** Focus on the speaker and avoid distractions.
2. **Show You're Listening:** Use nonverbal cues such as nodding and eye contact.
3. **Provide Feedback:** Paraphrase and summarize what the speaker has said.
4. **Defer Judgment:** Avoid interrupting or judging the speaker.
5. **Respond Appropriately:** Respond in a way that shows you understand and care about what the speaker has said.

Example:
1. **Pay Attention:** Focus on the speaker and avoid looking at your phone.
2. **Show You're Listening:** Nod and make eye contact with the speaker.
3. **Provide Feedback:** "So, you're saying that you're feeling stressed about your upcoming presentation?"
4. **Defer Judgment:** Avoid interrupting or judging the speaker.
5. **Respond Appropriately:** "I understand how you're feeling. Is there anything I can do to help?"
    `,
    targetEmotions: ["Anxious", "Insecure", "Isolated", "Misunderstood"],
  },
  {
    id: "social-skills-worksheet",
    title: "Social Skills Worksheet",
    difficulty: "Beginner",
    evidence: "Strong",
    category: "Social Skills",
    description: "A structured worksheet to practice and improve social skills.",
    instructions: `
1. **Situation:** Describe the social situation you want to improve.
2. **Goal:** What do you want to achieve in this situation?
3. **Skills:** What social skills do you need to use?
4. **Action:** What action will you take to use these skills?
5. **Outcome:** How did the situation turn out?

Example:
1. **Situation:** Attending a party.
2. **Goal:** Meet new people and have a good time.
3. **Skills:** Active listening, assertiveness, small talk.
4. **Action:** Introduce yourself to someone and ask them about their interests.
5. **Outcome:** Met several new people and had a pleasant conversation.
    `,
    targetEmotions: ["Anxious", "Insecure", "Isolated", "Awkward"],
  },
  // Grounding Techniques
  {
    id: "5-4-3-2-1-technique",
    title: "5-4-3-2-1 Grounding Technique",
    difficulty: "Beginner",
    evidence: "Moderate",
    category: "Grounding",
    description: "Use your five senses to anchor yourself to the present moment during anxiety or dissociation.",
    instructions: `
1. Find a comfortable position and take a few deep breaths
2. Look around you and name (aloud or silently):
   - 5 things you can SEE
   - 4 things you can FEEL/TOUCH (e.g., texture of your clothes, the chair)
   - 3 things you can HEAR
   - 2 things you can SMELL (or like the smell of)
   - 1 thing you can TASTE (or like the taste of)

3. Take your time with each step, really focusing on each sense
4. Notice how your body feels before and after the exercise
5. Repeat if needed until you feel more grounded in the present

Example:
SEE: Window, lamp, book, plant, picture frame
FEEL: Soft sweater, smooth table surface, cool air, chair beneath me
HEAR: Birds outside, refrigerator humming, distant traffic
SMELL: Coffee, hand lotion
TASTE: Mint gum

This technique works by redirecting your focus to your immediate environment and sensory experiences, pulling you away from distressing thoughts or feelings of unreality.
    `,
    targetEmotions: ["Anxious", "Panicked", "Dissociated", "Overwhelmed", "Traumatized"],
  },
  {
    id: "object-focus",
    title: "Object Focus Exercise",
    difficulty: "Beginner",
    evidence: "Moderate",
    category: "Grounding",
    description: "Intensely focus on a single object to anchor yourself to the present moment.",
    instructions: `
1. Choose any object in your immediate environment (a pen, stone, leaf, etc.)
2. Hold it in your hands if possible
3. Examine it in great detail for 2-5 minutes, as if you're a scientist seeing it for the first time
4. Notice:
   - Color variations and patterns
   - Texture and how it feels against your skin
   - Weight and temperature
   - Any sounds it makes when you handle it
   - Any smell it might have
   - Shape and dimensions
   - How light reflects off it

5. If your mind wanders, gently bring your attention back to the object
6. When finished, notice how your body and mind feel compared to before

Example with a stone:
"This stone is primarily gray with flecks of white and black. The surface is smooth on one side but rough on the other. It's cool to touch and feels heavy for its size. When I run my finger across it, it makes a faint scratching sound. It has an irregular oval shape with one flatter side..."

This exercise works by focusing your attention completely on something concrete and external, interrupting rumination and bringing you into the present moment.
    `,
    targetEmotions: ["Anxious", "Dissociated", "Overwhelmed", "Distracted", "Ruminating"],
  },
  {
    id: "mental-grounding",
    title: "Mental Grounding Exercises",
    difficulty: "Beginner",
    evidence: "Moderate",
    category: "Grounding",
    description: "Use mental exercises to redirect attention away from distress and into the present moment.",
    instructions: `
Choose from these mental grounding exercises when you feel anxious, dissociated, or overwhelmed:

1. Categories Game:
   - Pick a category (e.g., fruits, animals, countries)
   - Name as many items in that category as you can
   - Try to reach at least 10 items

2. Counting Backwards:
   - Start from 100
   - Count backwards by 7 (100, 93, 86...)
   - Focus on the mental calculation

3. Memory Description:
   - Recall a favorite memory in vivid detail
   - Describe it to yourself as if explaining a movie scene
   - Include sensory details and emotions

4. Fact Statements:
   - State simple facts about your current situation:
   - "Today is [day]"
   - "I am in [location]"
   - "The season is [season]"
   - "My name is [name]"
   - "I am wearing [description]"

5. ABC Game:
   - Go through the alphabet
   - For each letter, name something that starts with that letter
   - Choose a specific category to make it more challenging

These exercises work by engaging your cognitive functions, which helps interrupt automatic negative thoughts and brings your awareness to the present moment.
    `,
    targetEmotions: ["Anxious", "Dissociated", "Panicked", "Overwhelmed", "Traumatized"],
  },
  {
    id: "physical-grounding",
    title: "Physical Grounding Techniques",
    difficulty: "Beginner",
    evidence: "Moderate",
    category: "Grounding",
    description: "Use physical sensations to reconnect with your body and the present moment.",
    instructions: `
Choose from these physical grounding techniques when you feel disconnected, anxious, or overwhelmed:

1. Temperature Change:
   - Hold an ice cube in your hand
   - Splash cold water on your face
   - Hold a warm mug between your hands
   - The intense sensation helps bring you into the present

2. Progressive Muscle Tension:
   - Tense each muscle group for 5 seconds, then release
   - Start with your feet and work up to your face
   - Focus on the sensation of tension and release

3. Wall Push:
   - Stand facing a wall
   - Push against it with your hands as if trying to move it
   - Focus on the pressure and resistance
   - Hold for 10-15 seconds, then release

4. Rhythmic Movement:
   - Tap your feet in an alternating pattern
   - Drum your fingers on a surface
   - Rock gently back and forth
   - Focus on the rhythm and sensation

5. Textured Objects:
   - Keep a small textured object in your pocket (stress ball, stone, fabric)
   - Hold and manipulate it when feeling disconnected
   - Focus on the sensations it creates

6. Strong Sensations:
   - Bite into a lemon or lime
   - Smell something with a strong scent (essential oil, coffee beans)
   - Suck on a strong mint
   - The intense sensation interrupts dissociation

Remember to breathe normally during these exercises. Physical grounding works by using strong sensations to redirect your focus to your body and the present moment.
    `,
    targetEmotions: ["Dissociated", "Anxious", "Panicked", "Traumatized", "Overwhelmed"],
  },
  {
    id: "self-soothing-five-senses",
    title: "Self-Soothing with the Five Senses",
    difficulty: "Beginner",
    evidence: "Moderate",
    category: "Grounding",
    description: "Create a toolkit of soothing experiences for each sense to use during distress.",
    instructions: `
1. Create a personal self-soothing kit with items that comfort each of your senses:

Vision (what you can see):
- Photos of loved ones or beautiful places
- A small artwork or postcard
- A snow globe or kaleidoscope
- Videos of nature scenes or cute animals

Sound (what you can hear):
- Calming music playlist
- Nature sounds recording
- A small bell or wind chime
- Guided meditation audio

Touch (what you can feel):
- Soft fabric or stress ball
- Smooth stone or worry beads
- Warm blanket
- Cool face cloth

Smell (what you can smell):
- Lavender sachet or essential oil
- Scented candle
- Coffee beans
- Favorite lotion

Taste (what you can taste):
- Mint or favorite hard candy
- Herbal tea bags
- Dark chocolate piece
- Cinnamon stick

2. When distressed:
   - Choose one or more items from your kit
   - Focus completely on the sensory experience
   - Describe to yourself what you're experiencing in detail
   - Notice how your body responds

3. Practice regularly, not just during distress

Example self-soothing sequence:
"I'm feeling overwhelmed, so I'll wrap myself in my soft blanket (touch), look at photos from my beach vacation (vision), sip chamomile tea (taste), apply lavender oil to my wrist (smell), and listen to ocean waves (sound)."

This technique works by activating your senses in pleasant ways, which can interrupt distress and trigger your body's relaxation response.
    `,
    targetEmotions: ["Anxious", "Overwhelmed", "Distressed", "Agitated", "Traumatized"],
  },
  // Additional Cognitive Restructuring exercises
  {
    id: "socratic-questioning",
    title: "Socratic Questioning",
    difficulty: "Intermediate",
    evidence: "Strong",
    category: "Cognitive Restructuring",
    description: "Use systematic questioning to examine the evidence and logic behind negative thoughts.",
    instructions: `
1. Identify a troubling thought, belief, or assumption
2. Ask yourself these Socratic questions:

Evidence questions:
- What evidence supports this thought?
- What evidence contradicts this thought?
- Am I basing this on facts or feelings?
- Am I making any assumptions?

Alternative perspective questions:
- Is there another way of looking at this situation?
- What would I tell a friend who had this thought?
- If someone else was in this situation, what would I think?

Implication questions:
- What's the worst that could happen?
- What's the best that could happen?
- What's most likely to happen?
- If the worst happened, how could I cope?

Usefulness questions:
- Is this thought helpful?
- What would be a more helpful thought?
- What's the effect of thinking this way?

3. Write down your answers to each question
4. Based on your answers, develop a more balanced perspective

Example:
Original thought: "I'll definitely fail this interview."

Evidence questions:
- Evidence for: I'm nervous, I stumbled in my last interview
- Evidence against: I've prepared well, I have relevant experience, I've succeeded in interviews before
- Based on: Mostly feelings of anxiety, not facts
- Assumptions: That one mistake ruins an entire interview

Alternative perspective:
- I'd tell a friend that being nervous is normal and doesn't mean failure
- If someone else was nervous, I'd see it as normal human behavior

Implications:
- Worst case: I don't get this job and need to continue searching
- Best case: I do well and get the job
- Most likely: I'll do fine in some parts and could improve in others
- Coping: If I don't get it, I'll ask for feedback and apply elsewhere

Usefulness:
- This thought increases my anxiety and might create a self-fulfilling prophecy
- A more helpful thought: "I've prepared well and will do my best"

Balanced perspective: "While I'm feeling nervous, that's normal and doesn't mean I'll fail. I've prepared well and have succeeded in the past. Even if this interview doesn't go perfectly, it's not the end of the world."
    `,
    targetEmotions: ["Anxious", "Depressed", "Self-critical", "Worried", "Pessimistic"],
  },
  {
    id: "cost-benefit-analysis",
    title: "Cost-Benefit Analysis",
    difficulty: "Intermediate",
    evidence: "Strong",
    category: "Cognitive Restructuring",
    description: "Evaluate the advantages and disadvantages of holding a particular thought or belief.",
    instructions: `
1. Identify a persistent thought, belief, or behavior that's troubling you
2. Draw a table with four quadrants:
   - Benefits of maintaining this thought/belief/behavior
   - Costs of maintaining this thought/belief/behavior
   - Benefits of changing this thought/belief/behavior
   - Costs of changing this thought/belief/behavior

3. Fill in each quadrant with as many items as you can think of
4. Review the completed table and reflect on what it reveals
5. Consider whether the benefits outweigh the costs
6. Use this insight to decide whether and how to change your thinking

Example for the belief "I must be perfect at everything I do":

Benefits of maintaining:
- Motivates me to work hard
- I produce high-quality work
- I avoid criticism from others
- I feel proud when I succeed

Costs of maintaining:
- Constant anxiety and stress
- Never feeling satisfied with my work
- Avoiding tasks where I might not excel
- Burnout and exhaustion
- Harsh self-criticism when I make mistakes

Benefits of changing:
- Reduced anxiety and stress
- More enjoyment of activities
- Willingness to try new things
- Better work-life balance
- Self-compassion when I make mistakes

Costs of changing:
- Might produce lower quality work sometimes
- Might receive criticism
- Initial discomfort with new way of thinking

Reflection: Looking at this analysis, I can see that while perfectionism drives me to achieve, it comes at a significant cost to my wellbeing and actually limits my growth by making me avoid challenges. The benefits of adopting a more balanced perspective seem to outweigh the costs.
    `,
    targetEmotions: ["Anxious", "Perfectionistic", "Self-critical", "Stressed", "Overwhelmed"],
  },
  // Additional Mindfulness exercise
  {
    id: "loving-kindness-meditation",
    title: "Loving-Kindness Meditation",
    difficulty: "Intermediate",
    evidence: "Strong",
    category: "Mindfulness",
    description: "Cultivate feelings of goodwill, kindness, and warmth toward yourself and others.",
    instructions: `
1. Find a comfortable position and take a few deep breaths
2. Begin by focusing on your breath for 1-2 minutes to center yourself
3. Bring to mind someone who loves you unconditionally (a mentor, friend, pet)
4. Notice the feelings of warmth and care that arise
5. Now direct loving-kindness toward yourself by silently repeating these phrases:
   - "May I be safe and protected"
   - "May I be healthy and strong"
   - "May I be happy and at ease"
   - "May I be peaceful and free from suffering"

6. As you repeat each phrase, try to genuinely wish these things for yourself
7. After a few minutes, extend these wishes to others in expanding circles:
   - A loved one: "May [name] be safe and protected..."
   - A neutral person (someone you neither like nor dislike)
   - A difficult person (someone with whom you have conflict)
   - All beings everywhere

8. Spend 2-3 minutes on each person or group
9. If difficult emotions arise, acknowledge them with kindness and return to the phrases
10. End by returning focus to yourself and taking a few deep breaths

Tips:
- It's normal if this feels awkward or forced at first
- You can modify the phrases to ones that feel meaningful to you
- The goal isn't to manufacture feelings but to set a sincere intention
- Regular practice (10-15 minutes daily) gradually increases your capacity for compassion

This meditation helps reduce negative emotions toward yourself and others while cultivating positive ones like compassion, empathy, and connection.
    `,
    targetEmotions: ["Self-critical", "Angry", "Resentful", "Isolated", "Judgmental", "Depressed"],
  },
  // Additional Relaxation exercise
  {
    id: "visualization-safe-place",
    title: "Safe Place Visualization",
    difficulty: "Beginner",
    evidence: "Moderate",
    category: "Relaxation",
    description: "Create and visit a mental sanctuary where you feel completely safe, calm, and at peace.",
    instructions: `
1. Find a quiet, comfortable place where you won't be disturbed
2. Close your eyes and take several slow, deep breaths
3. Imagine a place where you feel completely safe and peaceful
   - This can be real or imaginary
   - It could be a beach, forest, mountain, cozy room, etc.

4. Build this place in your mind using all your senses:
   - What do you see? (Colors, shapes, light, movement)
   - What do you hear? (Natural sounds, music, silence)
   - What do you feel? (Temperature, textures, air on your skin)
   - What do you smell? (Fragrances, fresh air, food)
   - What do you taste? (If applicable)

5. Explore your safe place:
   - Look around and notice details
   - Move through the space
   - Find your favorite spot to rest

6. Feel the sense of safety and peace this place provides
7. Create a word or gesture that can quickly bring this place to mind
8. When ready, slowly return your awareness to the present
9. Open your eyes while maintaining the feeling of calm

Example:
"My safe place is a small cabin in the mountains. I see warm golden light coming through windows, a comfortable chair by a fireplace, and snow-capped peaks outside. I hear the crackling fire and distant birdsong. I feel the soft blanket around me and warmth from the fire. I smell pine trees and brewing tea. I taste a hint of honey from my tea. When I'm here, I feel completely safe and at peace."

Use this visualization whenever you feel stressed, anxious, or overwhelmed. With practice, you'll be able to quickly access the calming feelings of your safe place.
    `,
    targetEmotions: ["Anxious", "Stressed", "Overwhelmed", "Scared", "Unsafe", "Traumatized"],
  },
  // Additional Social Skills exercise
  {
    id: "difficult-conversations",
    title: "Navigating Difficult Conversations",
    difficulty: "Advanced",
    evidence: "Strong",
    category: "Social Skills",
    description: "Learn to approach challenging conversations with confidence, clarity, and respect.",
    instructions: `
1. Prepare for the conversation:
   - Clarify your purpose: What specific outcome do you want?
   - Identify your emotions and manage them beforehand
   - Consider the other person's perspective and possible reactions
   - Choose an appropriate time and private setting

2. Start effectively:
   - Begin with appreciation or common ground
   - State your intention for a positive outcome
   - Use "I" statements to express your perspective
   - Be specific about the situation, not the person

3. During the conversation:
   - Listen actively without interrupting
   - Ask open-ended questions to understand their perspective
   - Acknowledge their feelings and viewpoints
   - Stay focused on the issue, not personality
   - Look for areas of agreement
   - Take breaks if emotions escalate

4. Use this framework for expressing concerns:
   - Situation: Describe the specific situation objectively
   - Behavior: Address the specific behavior, not the person
   - Impact: Explain the impact on you or others
   - Request: Clearly state what you'd like to happen

5. Work toward resolution:
   - Brainstorm solutions together
   - Be willing to compromise
   - Agree on specific actions and follow-up
   - Express appreciation for their willingness to engage

6. After the conversation:
   - Reflect on what went well and what you learned
   - Follow through on any commitments
   - Acknowledge progress and improvements

Example:
Situation: A colleague consistently interrupts you in meetings

Preparation: Clarify that you want equal speaking time, not to embarrass them. Plan to speak privately after a meeting.

Opening: "I value working with you and appreciate your enthusiasm in meetings. I'd like to talk about something that would help us collaborate even better."

Expressing concern: "In yesterday's meeting (situation), when I was presenting my section, you jumped in several times before I finished my points (behavior). This made it difficult for me to complete my thoughts and left me feeling frustrated (impact). I'd appreciate if you could let me finish my points before adding your thoughts (request)."

Working toward resolution: "How could we both make sure our ideas are heard in meetings?"
    `,
    targetEmotions: ["Anxious", "Frustrated", "Angry", "Intimidated", "Resentful", "Avoidant"],
  },
  // Additional Behavioral Activation exercise
  {
    id: "values-based-action",
    title: "Values-Based Action Planning",
    difficulty: "Intermediate",
    evidence: "Strong",
    category: "Behavioral Activation",
    description: "Identify your core values and create an action plan to live in alignment with them.",
    instructions: `
1. Identify your core values by considering:
   - What matters most to you in life?
   - What kind of person do you want to be?
   - What would you want people to remember about you?
   - When have you felt most fulfilled?

2. Select 3-5 core values from this list (or add your own):
   - Family
   - Friendship
   - Health
   - Personal growth
   - Creativity
   - Achievement
   - Spirituality
   - Community
   - Learning
   - Adventure
   - Compassion
   - Independence
   - Security
   - Honesty
   - Humor

3. For each value, rate:
   - How important is this value to you? (1-10)
   - How well are you currently living this value? (1-10)
   - The gap between importance and current living

4. For values with the largest gaps, create SMART goals:
   - Specific: What exactly will you do?
   - Measurable: How will you track progress?
   - Achievable: Is this realistic with your resources?
   - Relevant: How does this connect to your value?
   - Time-bound: When will you do this?

5. Break each goal into small, concrete actions
6. Schedule these actions in your calendar
7. Track your progress and how the actions affect your mood
8. Review and adjust your plan weekly

Example:
Value: Health (Importance: 9, Current: 4, Gap: 5)

SMART Goal: "I will walk for 30 minutes, 3 days per week for the next month to improve my physical health."

Actions:
- Schedule walks for Monday, Wednesday, and Saturday at 7am
- Prepare walking clothes the night before
- Find a podcast to listen to during walks
- Track walks and energy levels in journal

This exercise helps you identify what truly matters to you and take concrete steps to align your daily actions with your core values, which increases sense of purpose and fulfillment.
    `,
    targetEmotions: ["Unmotivated", "Directionless", "Empty", "Depressed", "Stuck", "Unfulfilled"],
  },
]

// Helper function to get exercises by category
export function getExercisesByCategory(category: CategoryType): CBTExercise[] {
  return cbtExercises.filter((exercise) => exercise.category === category)
}

// Helper function to get all categories
export function getAllCategories(): CategoryType[] {
  const categories = new Set<CategoryType>()
  cbtExercises.forEach((exercise) => categories.add(exercise.category))
  return Array.from(categories)
}

// Helper function to get recommended exercises based on emotions
export function getRecommendedExercises(emotions: string[]): CBTExercise[] {
  if (!emotions || emotions.length === 0) {
    // Return a default set of beginner exercises if no emotions are provided
    return cbtExercises.filter((exercise) => exercise.difficulty === "Beginner").slice(0, 5)
  }

  // Find exercises that target the user's emotions
  const recommended = cbtExercises.filter((exercise) =>
    exercise.targetEmotions?.some((emotion) => emotions.includes(emotion)),
  )

  // If we have too few recommendations, add some beginner exercises
  if (recommended.length < 3) {
    const beginnerExercises = cbtExercises
      .filter((exercise) => exercise.difficulty === "Beginner" && !recommended.includes(exercise))
      .slice(0, 5 - recommended.length)

    return [...recommended, ...beginnerExercises]
  }

  return recommended
}

// Helper function to get category info
export function getCategoryInfo(category: CategoryType) {
  return categoryInfo[category]
}

// Helper function to get all categories with their info
export function getAllCategoriesWithInfo() {
  return Object.values(categoryInfo)
}
