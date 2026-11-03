/* js/data/blogs.js · Owner Part 5 · Detail records for the 8 blog articles (merged at runtime with SITE.blogIndex by slug) · Depends on: nothing (read by blog.js, blog-details.js) */
window.BLOGS = [
  {
    id: 'blg-001', slug: 'knee-pain-warning-signs', tags: ['knee pain', 'arthritis', 'early diagnosis'], views: 1840,
    summary: 'Seven warning signs that knee pain needs a specialist, why early examination protects your cartilage, and when to seek same-day care.',
    keyTakeaways: ['Pain lasting beyond three weeks deserves an examination.', 'Locking, giving way and night pain are never normal.', 'Early care can often avoid or delay joint replacement.'],
    content: [
      { type: 'p', text: 'Almost everyone in Chattogram has finished a long day of walking through Agrabad or climbing a footbridge with a sore knee. Most of that soreness fades within days. Some of it does not, and that is the pain worth listening to.' },
      { type: 'h2', text: 'The seven signals worth acting on' },
      { type: 'ol', items: ['Pain that lasts longer than three weeks despite rest and simple painkillers.', 'Swelling that returns after every walk, prayer or flight of stairs.', 'A knee that gives way or buckles, especially on uneven pavement.', 'Locking or catching, as if something is stuck inside the joint.', 'Morning stiffness lasting more than half an hour.', 'Pain at night or at rest, when the joint should be quiet.', 'A visible change in shape, such as a developing bow-leg or a knee that no longer straightens fully.'] },
      { type: 'h2', text: 'Why waiting costs more than checking' },
      { type: 'p', text: 'Cartilage has very little ability to heal. A small tear or early wear that is **treated early** can often be managed with physiotherapy, weight control and activity changes. The same knee, left for years, may need a joint replacement. Squatting, sitting cross-legged and long hours at a desk all load the knee differently, so a specialist looks at how you live, not only at the X-ray.' },
      { type: 'callout', tone: 'tip', title: 'While you wait for your appointment', text: 'Avoid deep squatting, use a handrail on stairs, and apply a cold pack for ten minutes after activity. Do not take painkillers every day without medical advice.' },
      { type: 'h2', text: 'When to see a doctor' },
      { type: 'p', text: 'Book a consultation if any one of the seven signals persists. Seek **same-day care** if the knee is hot, red and swollen with a fever, or if you cannot bear weight after a fall or road accident.' },
      { type: 'quote', text: 'A knee does not need to be severely damaged before it deserves an examination. The best outcomes begin with a conversation, not a crisis.', cite: 'Dr. Nabila Rahman' }
    ],
    relatedSlugs: ['acl-tear-surgery-or-rehab', 'arthroscopy-recovery-week-by-week'], serviceSlugs: ['knee-replacement', 'sports-medicine-rehab']
  },
  {
    id: 'blg-002', slug: 'acl-tear-surgery-or-rehab', tags: ['ACL', 'ligament', 'return to sport'], views: 2310,
    summary: 'How age, activity, stability and associated injuries decide whether a torn ACL is best treated with rehabilitation or reconstruction.',
    keyTakeaways: ['Not every torn ACL needs surgery.', 'A knee that keeps giving way usually needs reconstruction.', 'Rehabilitation matters just as much after surgery.'],
    content: [
      { type: 'p', text: 'A twist on the football ground or a bad landing during a cricket match, a pop, and a knee that swells within hours: this is the classic story of an ACL tear. The next question is always the same. Do I need surgery?' },
      { type: 'h2', text: 'What decides the answer' },
      { type: 'ul', items: ['Age and activity: pivoting sports such as football, kabaddi and badminton put the knee at greater risk.', 'Stability: does the knee give way during ordinary walking, or only during sport?', 'Other damage: a torn meniscus or a second ligament often tips the balance towards surgery.', 'Goals: a student athlete and an office worker may reasonably choose differently.'] },
      { type: 'h2', text: 'When rehabilitation alone works' },
      { type: 'p', text: 'Many people with a stable knee and modest sporting demands do well with a structured programme of **strengthening, balance and neuromuscular training**, usually over three to six months. It avoids surgical risk and gets you moving quickly.' },
      { type: 'h2', text: 'When surgery is the better road' },
      { type: 'p', text: 'If the knee keeps giving way, or you want to return to cutting and jumping sports, **arthroscopic reconstruction** replaces the torn ligament through small incisions. Rehabilitation still matters: surgery restores the structure, but the muscles must be retrained.' },
      { type: 'callout', tone: 'warning', title: 'Do not delay a locked knee', text: 'A knee that is stuck and will not straighten may have a displaced meniscus tear. Seek an orthopaedic opinion within days, not months.' },
      { type: 'h2', text: 'When to see a doctor' },
      { type: 'p', text: 'See a specialist within a week of any twisting injury with swelling, and sooner if you cannot walk. An examination and MRI give a clear picture, and the decision is then yours to make with full information. Results vary between individuals.' }
    ],
    relatedSlugs: ['knee-pain-warning-signs', 'weekend-footballers-injury-prevention'], serviceSlugs: ['acl-ligament-reconstruction', 'sports-medicine-rehab']
  },
  {
    id: 'blg-003', slug: 'arthroscopy-recovery-week-by-week', tags: ['arthroscopy', 'physiotherapy', 'recovery'], views: 1520,
    summary: 'A realistic week-by-week timeline for recovery after knee or shoulder arthroscopy, from the first walk to a gradual return to sport.',
    keyTakeaways: ['Small cuts do not mean instant recovery.', 'Daily short physiotherapy beats one long weekly session.', 'Return to sport is guided by strength tests, not the calendar alone.'],
    content: [
      { type: 'p', text: 'Keyhole surgery means small cuts, not instant recovery. Patients often expect to walk out and return to normal life within days. A realistic timeline helps you plan work, travel and family commitments, from Eid holidays to office deadlines.' },
      { type: 'h2', text: 'The first two weeks' },
      { type: 'p', text: 'Expect swelling, mild to moderate pain and tiredness. Most people go home within 24 hours. Keep the limb **elevated**, use ice as advised and begin gentle movements on day one. Stitches usually come out around day 12 to 14.' },
      { type: 'h2', text: 'Weeks three to twelve' },
      { type: 'ol', items: ['Weeks 3–4: walking without crutches (knee) or reducing sling use (shoulder), guided by your surgeon.', 'Weeks 5–8: strengthening begins, with a physiotherapist adjusting the load every week.', 'Weeks 9–12: low-impact work such as cycling and swimming, and a return to desk work or light duties.'] },
      { type: 'h2', text: 'Months four to nine' },
      { type: 'p', text: 'Running, sport-specific drills and heavier work are introduced gradually. A ligament graft needs time to mature, so a **return to football or cricket** is usually considered after about nine months for knee ligament surgery, once strength tests are satisfactory.' },
      { type: 'callout', tone: 'tip', title: 'Do the exercises you dislike', text: 'Physiotherapy is where recovery is won. Short daily sessions are better than one long weekly effort, and missed sessions are the most common reason for slow progress.' },
      { type: 'h2', text: 'When to see a doctor' },
      { type: 'p', text: 'Call the clinic if you develop a fever, increasing redness, a wound that leaks, severe calf pain or swelling, or pain that worsens after day three despite medicines. Recovery speed varies with the procedure, your age and general health.' }
    ],
    relatedSlugs: ['acl-tear-surgery-or-rehab', 'shoulder-pain-at-night'], serviceSlugs: ['shoulder-arthroscopy', 'acl-ligament-reconstruction']
  },
  {
    id: 'blg-004', slug: 'shoulder-pain-at-night', tags: ['rotator cuff', 'sleep', 'frozen shoulder'], views: 1270,
    summary: 'Why shoulder pain worsens at night, which sleeping positions help, and when persistent pain needs a specialist assessment.',
    keyTakeaways: ['Night pain is a common early sign of rotator cuff trouble.', 'Sleeping on your back or unaffected side often helps.', 'Diabetes raises the risk of a frozen shoulder.'],
    content: [
      { type: 'p', text: 'If lying on your side wakes you at three in the morning, your shoulder may be telling you something. Night pain is one of the most common reasons people with shoulder problems finally see a specialist.' },
      { type: 'h2', text: 'Why it hurts more at night' },
      { type: 'p', text: 'Lying down removes the pull of gravity that gently spaces the joint, and inflamed tendons are squeezed under the bony roof of the shoulder. Fewer distractions at night also make pain more noticeable. Common causes are **rotator cuff tendinopathy or tears**, bursitis, frozen shoulder and arthritis.' },
      { type: 'h2', text: 'Sleeping positions that help' },
      { type: 'ul', items: ['Sleep on your back with a small pillow under the affected elbow.', 'If you prefer your side, lie on the unaffected shoulder and hug a pillow.', 'Avoid sleeping with the arm stretched above your head.', 'Keep the fan or air conditioner from blowing directly on the shoulder, as cold can increase stiffness.'] },
      { type: 'h2', text: 'Who is at risk in Bangladesh' },
      { type: 'p', text: 'Long hours on laptops and phones, carrying heavy bags on one shoulder, lifting at building sites and playing cricket or badminton all strain the rotator cuff. Diabetes raises the chance of a **frozen shoulder**, so keep your blood sugar well controlled.' },
      { type: 'callout', tone: 'warning', title: 'Shoulder pain with chest symptoms', text: 'Pain spreading to the jaw or left arm with sweating or breathlessness may be a heart problem. Seek emergency care immediately.' },
      { type: 'h2', text: 'When to see a doctor' },
      { type: 'p', text: 'See a specialist if night pain lasts beyond two weeks, if you cannot lift the arm, or if weakness appears after a fall. An ultrasound or MRI shows whether a tear is present, and many cases improve without surgery.' }
    ],
    relatedSlugs: ['slipped-disc-vs-muscle-strain', 'arthroscopy-recovery-week-by-week'], serviceSlugs: ['shoulder-arthroscopy', 'sports-medicine-rehab']
  },
  {
    id: 'blg-005', slug: 'slipped-disc-vs-muscle-strain', tags: ['sciatica', 'back pain', 'disc'], views: 980,
    summary: 'How to tell a slipped disc from a simple muscle strain, what helps at home, and which red-flag symptoms need urgent attention.',
    keyTakeaways: ['Pain shooting below the knee suggests nerve involvement.', 'Gentle activity beats prolonged bed rest.', 'Leg weakness or bladder changes are emergencies.'],
    content: [
      { type: 'p', text: 'A long motorbike ride, a week of lifting during Eid travel or years in an office chair can all end the same way: a stiff, painful back. Most back pain is muscle strain and improves in days. A slipped disc behaves differently.' },
      { type: 'h2', text: 'Telling the two apart' },
      { type: 'ul', items: ['Muscle strain: aching across the lower back, worse with movement, better with rest and warmth, rarely below the knee.', 'Slipped disc: sharp or electric pain shooting down one leg, often with tingling or numbness in the foot.', 'Coughing, sneezing or bending forwards often triggers disc pain.', 'Disc pain may persist at night, while strain eases when you lie flat.'] },
      { type: 'h2', text: 'What helps at home' },
      { type: 'p', text: 'For the first two days, stay gently active rather than resting in bed. Short walks, **heat packs** and light stretching work better than bed rest. Check your desk height, keep your phone at eye level and break up long sitting every thirty minutes.' },
      { type: 'callout', tone: 'warning', title: 'Red flags: get urgent help', text: 'Weakness in a leg, numbness around the groin, or loss of control of the bladder or bowel needs emergency assessment within hours.' },
      { type: 'h2', text: 'When to see a doctor' },
      { type: 'p', text: 'See a spine specialist if leg pain continues beyond four to six weeks, if pain wakes you at night, or if your back pain followed an accident. Most disc problems improve without surgery. Operations such as microdiscectomy are reserved for those who do not settle or who develop weakness.' }
    ],
    relatedSlugs: ['shoulder-pain-at-night', 'fracture-first-aid-first-hour'], serviceSlugs: ['spine-disc-care', 'sports-medicine-rehab']
  },
  {
    id: 'blg-006', slug: 'weekend-footballers-injury-prevention', tags: ['football', 'warm-up', 'prevention'], views: 760,
    summary: 'A ten-minute warm-up routine and practical advice on grounds, boots and hydration to prevent ankle and knee injuries in weekend footballers.',
    keyTakeaways: ['A ten-minute warm-up genuinely lowers injury risk.', 'Match your boots to the ground, not the other way round.', 'Tired muscles protect joints poorly, so hydrate and eat well.'],
    content: [
      { type: 'p', text: 'Friday-evening matches on a hard, uneven ground are a Bangladeshi tradition. They are also where many ankle sprains and knee twists happen, often to people who have sat at a desk all week and then sprint with no preparation.' },
      { type: 'h2', text: 'A ten-minute warm-up that works' },
      { type: 'ol', items: ['Two minutes of brisk walking or light jogging.', 'Leg swings, hip circles and walking lunges, ten repetitions each.', 'Single-leg balance for thirty seconds on each side.', 'Gentle jumps and landings with soft, bent knees.', 'Three build-up sprints at half speed, then three at three-quarter speed.'] },
      { type: 'h2', text: 'Choose the ground and the shoes' },
      { type: 'p', text: 'Long studs on a dry, hard pitch grip too well and twist the knee. Use flat or **moulded boots** on hard grounds, replace worn shoes, and avoid playing on flooded or cracked surfaces during the monsoon.' },
      { type: 'callout', tone: 'tip', title: 'Hydrate and eat before you play', text: 'Tired muscles protect joints poorly. Drink water through the day and have a light meal two hours before a match, especially during Ramadan evenings.' },
      { type: 'h2', text: 'When to see a doctor' },
      { type: 'p', text: 'Rest, ice and gentle compression suit a mild sprain. See an orthopaedic doctor if you cannot take four steps, if the joint looks deformed, or if swelling has not improved after three days. Playing on through pain often turns a three-week injury into a three-month one.' },
      { type: 'quote', text: 'Warm up as if you are paid to play. Your knees will thank you at forty.', cite: 'Dr. Nabila Rahman' }
    ],
    relatedSlugs: ['acl-tear-surgery-or-rehab', 'knee-pain-warning-signs'], serviceSlugs: ['sports-medicine-rehab', 'acl-ligament-reconstruction']
  },
  {
    id: 'blg-007', slug: 'growing-pains-or-something-more', tags: ['children', 'limp', 'growth'], views: 640,
    summary: 'How parents can tell harmless growing pains from limping, one-sided or daytime pain that deserves a paediatric orthopaedic review.',
    keyTakeaways: ['True growing pains affect both legs and settle by morning.', 'A limp or one-sided pain should always be checked.', 'Early treatment of clubfoot and hip dysplasia is simpler and gentler.'],
    content: [
      { type: 'p', text: 'It is two in the morning and your child is crying about aching legs. Night-time pain is common in children between three and twelve, and most of the time it is harmless. Still, a few features should never be brushed aside.' },
      { type: 'h2', text: 'What growing pains look like' },
      { type: 'ul', items: ['Aching in both legs, usually in the calves, thighs or behind the knees.', 'Pain that comes in the evening or at night and is gone by morning.', 'A child who runs and plays normally the next day.', 'Relief from massage, warmth and a little reassurance.'] },
      { type: 'h2', text: 'Signs it may be something more' },
      { type: 'ol', items: ['A limp or refusing to walk.', 'Pain in one leg only, or pain that is present during the daytime.', 'Swelling, redness or warmth over a joint.', 'Fever, weight loss or unusual tiredness along with pain.', 'Visible differences such as in-turned feet beyond age five or uneven leg length.'] },
      { type: 'callout', tone: 'tip', title: 'Flat feet are often normal', text: 'Most toddlers have flat feet that develop an arch by age six to eight. Pain, stiffness or uneven shoe wear is the reason to have them checked.' },
      { type: 'h2', text: 'When to see a doctor' },
      { type: 'p', text: 'Book a paediatric orthopaedic review for any limp lasting more than a few days, and the same day if your child has a fever with joint pain. Early assessment of conditions such as clubfoot or hip dysplasia allows the **simplest and gentlest** treatment. Bring your child’s growth records and vaccination card to the visit.' }
    ],
    relatedSlugs: ['fracture-first-aid-first-hour', 'weekend-footballers-injury-prevention'], serviceSlugs: ['paediatric-orthopaedics']
  },
  {
    id: 'blg-008', slug: 'fracture-first-aid-first-hour', tags: ['first aid', 'fracture', 'accident'], views: 890,
    summary: 'A calm, step-by-step guide to the first hour after a suspected fracture, including what families should avoid and when to go to an emergency department.',
    keyTakeaways: ['Keep the injured part still and the person calm.', 'Never push a bone back or let it be tightly bandaged.', 'Every suspected fracture needs an X-ray.'],
    content: [
      { type: 'p', text: 'Road accidents, falls from rooftops and slips on wet monsoon stairs: bone injuries happen suddenly. What a family does in the first sixty minutes can change the outcome, and calm, simple steps matter more than speed alone.' },
      { type: 'h2', text: 'The first hour, step by step' },
      { type: 'ol', items: ['Stay calm and make the area safe. Do not move the person unless there is danger from traffic or fire.', 'Call for help and note the time of the injury.', 'Keep the injured part still. Support it in the position found, using a rolled newspaper or folded cloth as a splint.', 'Control bleeding with firm pressure using a clean cloth.', 'Apply a cold pack wrapped in cloth to reduce swelling, never directly on the skin.', 'Give nothing to eat or drink, in case surgery is needed.'] },
      { type: 'h2', text: 'What not to do' },
      { type: 'ul', items: ['Do not try to straighten a bent limb or push a bone back.', 'Do not allow massage or very tight bandaging by an untrained person.', 'Do not move a person with a suspected neck or back injury.', 'Do not delay transport while waiting for a more comfortable vehicle.'] },
      { type: 'callout', tone: 'warning', title: 'Open wound or numb limb', text: 'If bone is visible, the limb is pale, cold or numb, or there is a head or spine injury, go to an emergency department immediately and use the emergency line on this website.' },
      { type: 'h2', text: 'When to see a doctor' },
      { type: 'p', text: 'Every suspected fracture needs an X-ray and examination, even if the person can still move the limb. Early fixation often shortens recovery and lowers the risk of infection and stiffness. Children need prompt review too, as their growth plates can be affected.' }
    ],
    relatedSlugs: ['slipped-disc-vs-muscle-strain', 'growing-pains-or-something-more'], serviceSlugs: ['fracture-trauma']
  }
];
