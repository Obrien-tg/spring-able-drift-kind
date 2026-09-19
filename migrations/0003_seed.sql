-- Shared class catalogue. Visible to every signed-in family.

insert into subjects (slug, name, description, blurb, grades)
select * from (values
  ('mathematics', 'Mathematics', 'Numbers, fractions, times tables, and problem solving.', 'Build number confidence with visual, step-by-step lessons.', 'Grades 1–7'),
  ('english', 'English', 'Reading, spelling, writing, and comprehension.', 'Grow fluent readers and cheerful writers.', 'Grades 1–7'),
  ('science', 'Science', 'Living things, weather, magnets, and how the world works.', 'Curious questions, careful observing, real experiments.', 'Grades 1–7'),
  ('creative-arts', 'Creative Arts', 'Drawing, colour, music, and making.', 'Express ideas with colour, line, and story.', 'Grades 1–7')
) as v(slug, name, description, blurb, grades)
where not exists (select 1 from subjects s where s.slug = v.slug);

insert into materials (title, description, content, subject_id, material_type, difficulty, grade_level, estimated_minutes, created_by)
select v.title, v.description, v.content, s.id, v.material_type, v.difficulty, v.grade_level, v.estimated_minutes, 'catalog'
from (
  values
  (
    'Counting & Place Value',
    'See how tens and ones sit together, with grouping games.',
    E'Place value tells us what a digit is worth because of where it sits.\n\nIn 34, the 3 means 3 tens (30) and the 4 means 4 ones.\n\nTry this: grab 24 beans. Make groups of ten. How many full tens do you have? How many leftovers?\n\nYou should see 2 tens and 4 ones. That is 24.\n\nChallenge: write three numbers that have 5 tens. What is the smallest? What is the largest?',
    'mathematics', 'worksheet', 'beginner', '1-2', 20
  ),
  (
    'Fun with Fractions',
    'Share pizza, chocolate, and story time into equal parts.',
    E'A fraction shows part of a whole.\n\nThe top number (numerator) is how many parts you have. The bottom number (denominator) is how many equal parts make the whole.\n\n1/2 is one of two equal parts — half a sandwich.\n1/4 is one of four equal parts — a slice of a square cake cut twice.\n\nWhich is bigger, 1/2 or 1/3? Picture a chocolate bar. Two equal pieces vs three equal pieces. One of the two pieces is larger.\n\nPractice:\n1. Colour 1/4 of a window with four panes.\n2. If a pizza has 8 slices and you eat 3, you ate 3/8.\n3. Draw 1/2 and 2/4. Are they equal?',
    'mathematics', 'worksheet', 'beginner', '4-5', 25
  ),
  (
    'Times Tables Adventure',
    'Skip-count into the 2s, 5s, and 10s, then mix them up.',
    E'Multiplication is skip-counting in equal jumps.\n\n2 × 4 means four jumps of 2: 2, 4, 6, 8.\n5 × 3 means three jumps of 5: 5, 10, 15.\n10 × 6 is 60 — just write a zero after the 6.\n\nA pattern: any number times 1 stays itself. Any number times 0 is 0.\n\nTry saying the 5 times table while clapping. Then mix two facts: 2 × 7 and 5 × 7. What do you notice?\n\nChallenge: 6 groups of 4 stickers. How many stickers in all?',
    'mathematics', 'game', 'beginner', '3-4', 20
  ),
  (
    'The Clever Owl Story',
    'A short reading passage with thinking questions.',
    E'Read the story, then answer in full sentences.\n\nOllie the owl lived in a yellowwood tree beside a quiet stream. Each afternoon he opened a small notebook and wrote one kind thing he had noticed: a beetle carrying a leaf, a child sharing a pencil, the way the light turned the water gold.\n\nOne windy Tuesday the notebook blew into the reeds. A girl named Lindiwe found it, dried the pages in the sun, and walked it back to the tree. Ollie blinked his slow owl blink and wrote a new line: “Kindness has wings too.”\n\nQuestions:\n1. Where did Ollie live?\n2. What did he write in the notebook?\n3. How did Lindiwe help?\n4. What do you think “kindness has wings” means?',
    'english', 'reading', 'beginner', '3-4', 25
  ),
  (
    'Spelling Superstars',
    'Short-vowel families and a dictation you can do at home.',
    E'Short vowel sounds are the quick sounds in cat, bed, sit, hot, and sun.\n\nWord families:\n-at: cat, hat, mat, sat\n-en: hen, pen, ten\n-ig: big, dig, pig\n-ot: cot, hot, pot\n-un: bun, fun, sun\n\nA spelling trick: say the word slowly, tap one finger per sound, then write the letters that match.\n\nHome dictation (a parent can read these aloud):\n1. The big pig sat in the sun.\n2. Ten hens ran to the pen.\n3. A hot pot is not for fun.\n\nWrite each sentence, then check together.',
    'english', 'worksheet', 'beginner', '1-2', 20
  ),
  (
    'Story Builders',
    'Plan a four-sentence story with a beginning, middle, and end.',
    E'Every short story needs a who, a where, a problem, and a fix.\n\nUse this frame:\n1. One day, ______ wanted to ______.\n2. Then, something went wrong: ______.\n3. So they tried ______.\n4. At last, ______.\n\nExample:\nOne day, Sipho wanted to fly a kite. Then the string tangled in a thorn tree. So he asked his sister to lift him. At last the kite danced over the hill.\n\nWrite your own four sentences. Add one feeling word (brave, giggly, proud, calm).\n\nBonus: draw the moment the problem gets solved.',
    'english', 'assignment', 'intermediate', '2-3', 30
  ),
  (
    'Plants Need Sunlight',
    'A simple investigation you can run on a windowsill.',
    E'Plants make food from light, air, and water. The green parts catch sunlight.\n\nTry this (two days):\n1. Take two similar leaves or two bean seedlings.\n2. Leave one in a bright window.\n3. Cover the other with a cup so it stays dark.\n4. Water both the same amount.\n5. Check colour and firmness the next day.\n\nThe dark plant cannot make as much food, so it often looks paler or droopy.\n\nWords to know: sunlight, water, soil, leaf, energy.\n\nDraw both plants and label light, water, and leaf.',
    'science', 'worksheet', 'beginner', '3-4', 25
  ),
  (
    'The Water Cycle',
    'Follow a drop of water from cloud to tap and back again.',
    E'Water is a traveller.\n\nEvaporation: the sun warms puddles and they turn into invisible vapour.\nCondensation: vapour cools high up and becomes tiny cloud droplets.\nPrecipitation: droplets join and fall as rain, hail, or snow.\nCollection: water gathers in rivers, dams, soil, and the sea — then the journey starts again.\n\nIn South Africa we look after every drop. Turning off a dripping tap keeps more water in the cycle for plants, animals, and people.\n\nTrace a drop: dam → vapour → cloud → rain → river → dam.\n\nQuestion: why do clothes dry faster on a sunny, windy day?',
    'science', 'reading', 'beginner', '4-5', 20
  ),
  (
    'Colour Mixing Lab',
    'Mix primary colours and name the new ones you invent.',
    E'Red, yellow, and blue are primary colours. You cannot mix other colours to make them — but they make almost everything else.\n\nRed + yellow = orange\nYellow + blue = green\nBlue + red = purple\n\nAdd a little white and the colour goes paler (a tint). Add a tiny bit of its opposite and it calms down.\n\nStudio task:\n1. Paint three primary dots.\n2. Mix two pairs and name the new colours.\n3. Paint a small fruit still life using only mixtures, no extra tubes.\n\nTalk about how the colour feels: warm like a peach, or cool like mint leaves.',
    'creative-arts', 'worksheet', 'beginner', '1-3', 25
  )
) as v(title, description, content, slug, material_type, difficulty, grade_level, estimated_minutes)
join subjects s on s.slug = v.slug
where not exists (select 1 from materials m where m.title = v.title);

insert into assignments (title, description, instructions, material_id, due_at, max_score, created_by)
select v.title, v.description, v.instructions, m.id, now() + v.days * interval '1 day', 100, 'catalog'
from (
  values
  ('Fractions checkpoint', 'Show what you know about equal parts.', 'Complete the three practice questions in Fun with Fractions. Write your answers in full sentences and draw one picture.', 'Fun with Fractions', 7),
  ('Owl story response', 'Prove you understood the reading.', 'Answer all four questions from The Clever Owl Story in complete sentences.', 'The Clever Owl Story', 5),
  ('Windowsill plant log', 'Run the sunlight investigation.', 'Do the two-day plant test and write what you saw on day 1 and day 2.', 'Plants Need Sunlight', 10)
) as v(title, description, instructions, material_title, days)
join materials m on m.title = v.material_title
where not exists (select 1 from assignments a where a.title = v.title);

insert into rooms (name, kind)
select 'Class Lounge', 'class'
where not exists (select 1 from rooms where kind = 'class');

insert into announcements (title, body, created_by)
select 'Welcome to PG Tutoring Hub',
       'I am so glad you are here. Start with a lesson in the hub, try a practice game, and send me a note in the Class Lounge whenever you get stuck. Families, you can follow along from your parent dashboard.',
       'catalog'
where not exists (select 1 from announcements);

insert into messages (room_id, sender_id, sender_name, content)
select r.id, 'catalog', 'Ollie the Owl',
       'Hoot hoot — welcome to the Class Lounge. Ask a question, share a win, or just say hello. Patience and I are listening.'
from rooms r
where r.kind = 'class'
  and not exists (select 1 from messages);
