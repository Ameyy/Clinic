import { MedicalService, Testimonial, BlogPost, DoctorInfo } from '../types';

export const DOCTOR_INFO: DoctorInfo = {
  name: 'Dr. Ananya Sharma',
  title: 'Senior Consultant Internist & Preventive Cardiometabolic Specialist',
  degrees: 'MD (Internal Medicine), DNB, FICP, DipIBLM',
  specialties: [
    'Board Certified in Internal Medicine (AIIMS, New Delhi)',
    'Fellow of the Indian College of Physicians (FICP)',
    'Certified in International Lifestyle Medicine (DipIBLM)',
    'Cardiometabolic Risk & Precision Lipidology Specialist',
  ],
  clinicName: 'Aura Health & Vance Integrative Clinic',
  address: 'Plot 42, 100 Feet Road, Indiranagar',
  cityStateZip: 'Bengaluru, Karnataka 560038',
  phone: '+91 80 4920 8800',
  email: 'concierge@auramedicine.in',
  emergencyNotice: 'If you are facing a life-threatening medical emergency or severe acute chest discomfort, please immediately call 112 or 108, or report to the nearest emergency casualty center.',
  currencySymbol: '₹',
  currencyCode: 'INR',
  hours: [
    { dayRange: 'Monday – Thursday', time: '8:30 AM – 6:00 PM' },
    { dayRange: 'Friday', time: '8:30 AM – 4:00 PM' },
    { dayRange: 'Saturday (Pan-India Telehealth & Urgent)', time: '9:00 AM – 2:00 PM' },
    { dayRange: 'Sunday', time: 'Closed (Emergency On-Call Triage)' },
  ],
  insurances: [
    'Star Health & Allied Insurance (Cashless / Reimbursement)',
    'HDFC ERGO Health Insurance',
    'Care Health Insurance (Religare)',
    'ICICI Lombard Complete Health Insurance',
    'Bajaj Allianz Health Guard',
    'Niva Bupa Health Insurance (Max Bupa)',
    'Direct Cashless TPA & UPI / Credit Card Options',
  ],
};

export const MEDICAL_SERVICES: MedicalService[] = [
  {
    id: 'comprehensive-annual',
    name: 'Comprehensive Preventive Health Assessment',
    category: 'preventive',
    durationMinutes: 75,
    price: 3500,
    badge: 'Most Popular',
    imageUrl: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800',
    recommendedFor: 'Adults seeking in-depth baseline evaluation, early risk detection, and proactive longevity planning.',
    description: 'An unhurried clinical deep-dive including extended physical examination, advanced cardiovascular risk score, hormonal baseline review, and personalized 12-month care roadmap.',
    includedItems: [
      '75-minute one-on-one session with Dr. Ananya Sharma',
      'Advanced biometric analysis & body composition',
      'Order & review of comprehensive functional bloodwork',
      'Personalized Indian nutrition, sleep & exercise protocol',
      'Direct secure portal messaging for 30 days',
    ],
  },
  {
    id: 'cardiometabolic-consult',
    name: 'Cardiovascular & Metabolic Risk Deep-Dive',
    category: 'cardiology',
    durationMinutes: 60,
    price: 2800,
    badge: 'Specialty Focus',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    recommendedFor: 'Patients with family history of heart disease, elevated cholesterol/ApoB, pre-diabetes, or hypertension.',
    description: 'Targeted assessment analyzing advanced lipid fractions (ApoB, Lp(a)), insulin sensitivity, vascular inflammation, and coronary calcium scan interpretation.',
    includedItems: [
      'ApoB, Lp(a) & particle number interpretation',
      'Vascular stiffness & resting arterial analysis',
      'Non-statin & precision pharmacotherapy options',
      'Continuous Glucose Monitor (CGM) consultation',
    ],
  },
  {
    id: 'longevity-hormone',
    name: 'Metabolic Longevity & Cellular Health',
    category: 'longevity',
    durationMinutes: 60,
    price: 3000,
    imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800',
    recommendedFor: 'Individuals experiencing mid-life energy dips, brain fog, metabolic plateau, or seeking cellular health optimization.',
    description: 'Evidence-based protocols focusing on mitochondrial function, hormonal harmony (thyroid, adrenal, sex hormones), and cellular longevity biomarkers.',
    includedItems: [
      'Comprehensive endocrine & metabolic review',
      'Mitochondrial function & nutrient status assay review',
      'Sarcopenia prevention & lean mass optimization plan',
      'Supplement safety audit and streamlining',
    ],
  },
  {
    id: 'telehealth-consult',
    name: 'Virtual Care & Follow-Up Consultation',
    category: 'telehealth',
    durationMinutes: 30,
    price: 1500,
    badge: 'Pan-India Video',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    recommendedFor: 'Patients across India seeking expert second opinions, routine follow-ups, or comprehensive lab reviews.',
    description: 'Encrypted, compliant telehealth visit from the convenience of your home or office. Perfect for routine check-ins, lab debriefs, and digital prescriptions.',
    includedItems: [
      'High-definition secure video consultation',
      'Lab result debrief and titration adjustments',
      'Same-day digital prescriptions sent via WhatsApp / Email',
      'Written visit summary uploaded to patient portal',
    ],
  },
  {
    id: 'acute-primary-care',
    name: 'Acute Primary Care & Urgent Health Visit',
    category: 'preventive',
    durationMinutes: 40,
    price: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
    recommendedFor: 'Current and new patients experiencing non-emergency illness, respiratory infections, migraine flare-ups, or seasonal fever.',
    description: 'Same-day or next-day prompt clinical evaluation with targeted diagnosis, on-site rapid testing guidance, and fast symptomatic relief.',
    includedItems: [
      'Focused physical examination',
      'Rapid diagnostic ordering (CBC, viral panel, CRP, imaging)',
      'Immediate treatment plan & prescription coordination',
      '48-hour follow-up clinical message check-in',
    ],
  },
  {
    id: 'executive-wellness',
    name: 'Executive Longevity & Performance Physical',
    category: 'longevity',
    durationMinutes: 120,
    price: 6500,
    badge: 'Premier',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    recommendedFor: 'Professionals and leaders demanding peak cognitive clarity, cardiovascular resilience, and zero-compromise preventive vigilance.',
    description: 'Our most thorough evaluation: includes resting metabolic rate evaluation, cognitive stamina screening, advanced genomics review, and concierge follow-up.',
    includedItems: [
      '2 full hours with Dr. Ananya Sharma in private clinic suite',
      'VO2 max & cardiorespiratory fitness guidance',
      'Full genomic & biological age score integration',
      'Dedicated concierge nurse coordination for 90 days',
    ],
  },
];

export const PATIENT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    patientName: 'Vikramaditya Singhania',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    date: '2 weeks ago',
    condition: 'Cardiovascular Risk & ApoB Optimization',
    category: 'cardiology',
    reviewText:
      'After my father suffered a heart attack at 52, I spent years anxious despite "normal" routine lipid profiles. Dr. Ananya Sharma ordered advanced lipid fractions that immediately pinpointed elevated Lp(a) and ApoB. Her calm, thorough, evidence-backed strategy helped me reduce particle counts by 42% in six months without severe side effects. She truly listens.',
    verified: true,
    avatarBg: 'bg-emerald-700',
  },
  {
    id: 'test-2',
    patientName: 'Pooja Venkatesh',
    location: 'Indiranagar, Bengaluru',
    rating: 5,
    date: '1 month ago',
    condition: 'Insulin Resistance & Chronic Fatigue',
    category: 'longevity',
    reviewText:
      'I was tired of 5-minute OPD consultations where doctors dismissed my fatigue as simple stress. Dr. Sharma gave me a full 75 minutes on my first visit. She guided me through continuous glucose monitoring, optimized my thyroid markers, and created an Indian meal plan suited to my vegetarian diet. My energy and mental focus are completely restored.',
    verified: true,
    avatarBg: 'bg-teal-700',
  },
  {
    id: 'test-3',
    patientName: 'Rajesh K. Mehta',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    date: '3 weeks ago',
    condition: 'Telehealth Second Opinion & Hypertension',
    category: 'telehealth',
    reviewText:
      'The pan-India telehealth system was seamless—no complicated app installs, just a clean encrypted link. Dr. Sharma reviewed my home BP monitor readings, adjusted medication timing based on circadian chronotherapy, and normalized my numbers within ten days. World-class clinical acumen.',
    verified: true,
    avatarBg: 'bg-slate-700',
  },
  {
    id: 'test-4',
    patientName: 'Dr. Srinivas Rao',
    location: 'Hyderabad, Telangana',
    rating: 5,
    date: 'Last month',
    condition: 'Comprehensive Annual Assessment',
    category: 'preventive',
    reviewText:
      'As a surgeon myself, I am very selective about who manages my personal health. Dr. Ananya Sharma is among the most astute internists in India. Her command over preventive cardiology, ApoB literature, and personalized metabolic medicine is exceptional.',
    verified: true,
    avatarBg: 'bg-stone-700',
  },
  {
    id: 'test-5',
    patientName: 'Meera Nambiar',
    location: 'Koramangala, Bengaluru',
    rating: 5,
    date: '2 months ago',
    condition: 'Perimenopause & Endocrine Balance',
    category: 'longevity',
    reviewText:
      'Dr. Sharma took my sleep disturbances and brain fog seriously when others brushed them aside. Her personalized bio-identical hormone support and targeted nutrition protocol made a tremendous difference to my daily well-being within four weeks.',
    verified: true,
    avatarBg: 'bg-cyan-800',
  },
  {
    id: 'test-6',
    patientName: 'Arjun Deshmukh',
    location: 'Pune, Maharashtra',
    rating: 5,
    date: '3 months ago',
    condition: 'Metabolic Syndrome & Fatty Liver Reversal',
    category: 'preventive',
    reviewText:
      'The clinic ambience in Indiranagar is serene and peaceful—miles ahead of noisy hospital waiting rooms. The intake process was effortless. Dr. Sharma helped me reverse Grade 1 fatty liver and reduce visceral fat over 5 months. Outstanding doctor.',
    verified: true,
    avatarBg: 'bg-emerald-800',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'metabolic-biomarkers-beyond-cholesterol',
    title: 'The 5 Metabolic Biomarkers That Matter Far More Than Standard Cholesterol for South Asians',
    excerpt:
      'Why basic lipid tests miss up to 50% of at-risk Indian patients, and how testing ApoB, fasting insulin, and Lipoprotein(a) transforms early prevention.',
    category: 'Cardiology',
    readTime: '6 min read',
    publishedAt: 'September 14, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    author: {
      name: 'Dr. Ananya Sharma, MD',
      role: 'Internal Medicine & Preventive Cardiometabolic Care',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    },
    tags: ['Cardiology', 'ApoB', 'South Asian Risk', 'Metabolism'],
    keyTakeaways: [
      'South Asians have a 3 to 4 times higher genetic propensity for premature coronary artery disease, often with elevated Lipoprotein(a).',
      'ApoB measures the exact particle number of atherogenic lipoproteins, proving vastly superior to conventional LDL-C calculations.',
      'Fasting insulin identifies insulin resistance up to 8–10 years before fasting blood glucose crosses the pre-diabetic threshold.',
      'Comprehensive annual evaluations should begin at age 25–30 for individuals with Indian ethnic background and family history.',
    ],
    citationNote: 'Referencing Cardiological Society of India (CSI) consensus statements and the National Lipid Association guidelines.',
    content: [
      'In conventional health checkups across India, patients are frequently reassured when standard total cholesterol looks "normal," only to suffer unexpected cardiovascular events in their 40s. The core clinical issue is relying on aggregate mass metrics rather than atherogenic particle counts.',
      'South Asian populations present distinct phenotypes: smaller, denser LDL particles, higher triglyceride-to-HDL ratios, and significantly elevated Lipoprotein(a) [Lp(a)]. Standard lipid panels calculate the mass of cholesterol inside lipoproteins, but what actually drives endothelial penetration is the absolute number of particles. Apolipoprotein B (ApoB) provides a precise 1-to-1 count of all plaque-forming particles.',
      'Equally important is visceral insulin resistance. In the "thin-fat" Indian phenotype, individuals can develop visceral adiposity and hepatic steatosis even with a normal BMI. By checking fasting insulin alongside HOMA-IR and hs-CRP, we can intervene years before irreversible vascular damage occurs.',
      'Through tailored dietary strategies, exercise targeting mitochondrial biogenesis, and modern pharmacotherapy, we can drastically reduce lifetime cardiovascular risk.',
    ],
  },
  {
    id: 'blog-2',
    slug: 'circadian-biology-blood-pressure-timing',
    title: 'Circadian Biology in Clinical Practice: Why Meal & Medication Timing Matters',
    excerpt:
      'Emerging chronobiology demonstrates that when you eat dinner and when you take antihypertensives directly influences nocturnal blood pressure dipping and vascular elasticity.',
    category: 'Lifestyle Medicine',
    readTime: '5 min read',
    publishedAt: 'September 02, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    author: {
      name: 'Dr. Ananya Sharma, MD',
      role: 'Internal Medicine & Preventive Cardiometabolic Care',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    },
    tags: ['Chronobiology', 'Hypertension', 'Circadian Rhythms', 'Sleep Quality'],
    keyTakeaways: [
      'Healthy blood pressure should dip 10%–20% during sleep; non-dippers experience triple the long-term cardiovascular risk.',
      'Late dinners high in refined carbs and sodium keep peripheral vascular resistance elevated throughout the night.',
      'Under physician supervision, adjusting specific antihypertensives to the evening can restore physiological nocturnal dipping.',
      'Morning sunlight exposure within 45 minutes of waking aligns the suprachiasmatic nucleus master circadian clock.',
    ],
    citationNote: 'Published insights supported by European Heart Journal and Indian hypertension clinical trials.',
    content: [
      'Every organ system in the human body possesses peripheral molecular clocks synchronized by the master pacemaker in our hypothalamus. Blood pressure follows a predictable 24-hour sinusoidal wave, dropping significantly during restorative sleep.',
      'In our clinical practice, we frequently uncover "non-dipping" patterns using 24-hour ambulatory blood pressure monitoring. When your arteries remain under high pressure while you sleep, your heart and kidneys are denied their natural recovery window.',
      'Simple chronobiological adjustments can produce profound clinical benefits. Consuming the majority of caloric intake earlier in the biological day and closing your kitchen at least 3 hours before sleep prevents insulin-driven renal sodium retention overnight.',
      'Health is not solely about what biochemical compounds you ingest, but how they align with your diurnal rhythm. Syncing sleep, natural light, and meal windows forms the cornerstone of preventive vitality.',
    ],
  },
  {
    id: 'blog-3',
    slug: 'zone-2-cardio-and-mitochondrial-health',
    title: 'Zone 2 Training: Reversing Vascular Stiffness & Enhancing Cellular Energy',
    excerpt:
      'High-intensity gym sessions get all the hype, but sustainable Zone 2 aerobic base building is what revitalizes lactate clearance, capillary density, and mitochondrial health.',
    category: 'Metabolism & Longevity',
    readTime: '7 min read',
    publishedAt: 'August 24, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800',
    author: {
      name: 'Dr. Ananya Sharma, MD',
      role: 'Internal Medicine & Preventive Cardiometabolic Care',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    },
    tags: ['Exercise Medicine', 'Zone 2', 'Mitochondria', 'Longevity'],
    keyTakeaways: [
      'Zone 2 is a conversational aerobic pace burning predominantly fatty acids through cellular oxidative phosphorylation.',
      'It stimulates mitochondrial biogenesis, increasing both the number and efficiency of cellular powerhouses.',
      'Significantly improves vascular compliance, lowering resting heart rate and central arterial stiffness.',
      'Aim for 150–180 minutes of Zone 2 training per week, split into 3 to 4 dedicated sessions.',
    ],
    citationNote: 'Supported by clinical exercise physiology guidelines and longevity research.',
    content: [
      'Many patients assume exercise only "counts" if they leave feeling exhausted. However, from a cellular longevity standpoint, chronic high-intensity workouts without an aerobic foundation can elevate stress hormones and autonomic strain.',
      'Zone 2 exercise represents the highest metabolic work rate you can sustain while keeping blood lactate levels below 2.0 mmol/L. At this threshold, Type I slow-twitch muscle fibers utilize oxygen to oxidize fatty acids for fuel. This stimulates your cells to grow new mitochondria and eliminate dysfunctional ones via mitophagy.',
      'In our clinic, we help patients determine their physiological Zone 2 heart rate range. The practical test is simple: you should be able to speak full sentences comfortably without gasping, but unable to sing.',
      'Committing to 45 minutes of brisk incline walking, outdoor cycling, or steady swimming 3–4 times per week improves resting endothelial elasticity and supports lasting metabolic health.',
    ],
  },
  {
    id: 'blog-4',
    slug: 'navigating-hormone-shifts-clarity-vitality',
    title: 'Navigating Perimenopause & Midlife Hormone Shifts: An Indian Doctor’s Perspective',
    excerpt:
      'Dispelling fear around hormone transitions and providing evidence-based nutrition, sleep, and medical options for managing hot flashes, mood, and bone density.',
    category: 'Preventive Care',
    readTime: '8 min read',
    publishedAt: 'August 11, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    author: {
      name: 'Dr. Ananya Sharma, MD',
      role: 'Internal Medicine & Preventive Cardiometabolic Care',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    },
    tags: ['Women Health', 'Hormones', 'Perimenopause', 'Bone Health'],
    keyTakeaways: [
      'Perimenopause can begin 7–10 years before menopause, marked by estrogen fluctuations and declining progesterone.',
      'Transdermal bio-identical estradiol and micronized progesterone provide an established, safer cardiovascular and bone profile when indicated.',
      'Strength training is crucial for preserving bone mineral density and insulin-sensitive muscle mass.',
      'Adequate protein (1.2–1.5 g/kg) and targeted micronutrient support notably enhance sleep continuity.',
    ],
    citationNote: 'Concurring with Indian Menopause Society (IMS) and International Menopause Society consensus guidelines.',
    content: [
      'For years, midlife hormonal health was accompanied by silent suffering or outdated fears. Today, clinical evidence confirms that timely, personalized hormone support initiated within the first decade of menopausal transition provides remarkable quality of life and bone protection.',
      'Common early symptoms include nocturnal awakenings with heart palpitations, unexpected mood fluctuations, changes in body composition, and brain fog during work. These are biochemical signals of declining ovarian feedback loops.',
      'In our practice, we assess your complete cardiovascular risk, breast imaging history, and metabolic baseline. When indicated, bio-identical regimens promote restorative sleep and emotional equilibrium.',
      'Combined with resistance training to stimulate bone remodeling and adequate micronutrient support, midlife should be a chapter of energized vitality.',
    ],
  },
  {
    id: 'blog-5',
    slug: 'gut-microbiome-endothelial-inflammation',
    title: 'The Gut-Heart Axis: How Indian Dietary Diversity Protects Your Arteries',
    excerpt:
      'Discover how short-chain fatty acids (SCFAs) generated by gut microbes fermenting traditional fiber and spices signal your blood vessels to regulate blood pressure.',
    category: 'Preventive Care',
    readTime: '6 min read',
    publishedAt: 'July 28, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800',
    author: {
      name: 'Dr. Ananya Sharma, MD',
      role: 'Internal Medicine & Preventive Cardiometabolic Care',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    },
    tags: ['Gut Health', 'Microbiome', 'Indian Diet', 'Inflammation'],
    keyTakeaways: [
      'Microbial fermentation of prebiotic fiber produces butyrate, acetate, and propionate, which relax vascular endothelial tone.',
      'A compromised intestinal barrier allows bacterial endotoxins (LPS) into circulation, triggering low-grade vascular inflammation.',
      'Traditional Indian whole grains, millets (ragi, jowar), pulses, and seasonal vegetables provide optimal prebiotic substrates.',
      'Turmeric (curcumin), ginger, and polyphenol-rich spices foster beneficial microbial species like Akkermansia muciniphila.',
    ],
    citationNote: 'Journal of the American Heart Association (JAHA) and Indian gut-vascular physiology reviews.',
    content: [
      'We tend to think of cardiovascular disease as an isolated plumbing problem. Yet cardiovascular tissue exists in constant biochemical crosstalk with the trillions of microbes residing in your digestive tract.',
      'When beneficial gut bacteria ferment soluble fibers from millets, lentils, seeds, and vegetables, they synthesize Short-Chain Fatty Acids (SCFAs). These molecules enter circulation and bind to vascular receptors, promoting vasodilation and suppressing vascular inflammation.',
      'In contrast, ultra-processed packaged snacks and refined flours degrade the protective mucosal layer. Endotoxins can translocate across the gut wall, triggering toll-like receptor cascades that accelerate arterial plaque deposition.',
      'In our clinical protocol, we emphasize diverse plant foods—millets, lentils, greens, spices, and fermented foods—to nourish your vascular and metabolic allies.',
    ],
  },
];

export const CLINIC_FACILITIES = [
  {
    title: 'Consultation & Longevity Suite',
    description: 'Unhurried, private clinical lounge designed for comprehensive discussions and in-depth history reviews.',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    badge: 'Private Care',
  },
  {
    title: 'Precision Biomarkers & Diagnostic Room',
    description: 'On-site bio-impedance body composition, 12-lead ECG, resting metabolic assessment, and certified phlebotomy draws.',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    badge: 'Advanced Tech',
  },
  {
    title: 'Encrypted Telehealth Command Desk',
    description: 'Dedicated studio equipped with high-speed fiber optics for secure, pan-India virtual consultations.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    badge: 'Virtual Care',
  },
  {
    title: 'Tranquil Welcome Lounge',
    description: 'Serene botanical atmosphere with zero crowd waiting, certified organic herbal infusions, and calm acoustics.',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    badge: 'Patient First',
  },
];

export const CLINICAL_TEAM = [
  {
    name: 'Dr. Ananya Sharma, MD, DNB, FICP',
    role: 'Lead Physician & Founder',
    specialty: 'Internal Medicine, Cardiometabolic Prevention & Longevity',
    education: 'AIIMS New Delhi • Fellowship in Preventive Cardiology',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    badge: 'Chief Medical Officer',
  },
  {
    name: 'Dr. Rohan Kulkarni, MD, DM',
    role: 'Senior Consultant Cardiologist',
    specialty: 'Preventive Cardiology & Advanced Echocardiography',
    education: 'CMC Vellore • Post-Doctoral Fellowship in Preventive Cardiology',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    badge: 'Cardiology Partner',
  },
  {
    name: 'Kavita Sundaram, M.Sc, RD, CDE',
    role: 'Clinical Metabolic Dietitian',
    specialty: 'Precision Indian Nutrition, CGM Titration & Gut Health',
    education: 'NIN Hyderabad • Certified Diabetes Educator',
    image: 'https://images.unsplash.com/photo-1594824813629-9e8557997970?auto=format&fit=crop&q=80&w=600',
    badge: 'Nutrition Lead',
  },
];

export const FREQUENTLY_ASKED_QUESTIONS = [
  {
    question: 'How do appointments work with Dr. Ananya Sharma?',
    answer:
      'We offer both in-person consultations at our Indiranagar clinic in Bengaluru and encrypted high-definition video visits across India. Initial preventive consultations last 60–75 minutes, ensuring comprehensive time to evaluate your detailed health history, lifestyle factors, family risk, and lab biomarkers.',
  },
  {
    question: 'What health insurance policies do you support?',
    answer:
      'We facilitate cashless and reimbursement claims with major Indian health insurers including Star Health, HDFC ERGO, Care Health, ICICI Lombard, Bajaj Allianz, and Niva Bupa. Detailed itemized medical receipts and clinical consultation summaries are provided for seamless claim processing.',
  },
  {
    question: 'Can I book a consultation if I live outside Bengaluru?',
    answer:
      'Yes, we provide secure, high-definition pan-India telehealth consultations for patients residing across Mumbai, Delhi NCR, Hyderabad, Chennai, Pune, and other cities. Digital prescriptions and lab requisitions are delivered directly to your portal and email.',
  },
  {
    question: 'What should I prepare for my first consultation?',
    answer:
      'Please bring or upload any recent lab reports, lipid profiles, HbA1c results, or ECGs from the past 12 months, along with a list of your current prescriptions and supplements. Our secure digital intake portal makes sharing records simple.',
  },
  {
    question: 'What is your rescheduling or cancellation policy?',
    answer:
      'Because Dr. Sharma dedicates 60 to 75 minutes per patient, we request at least 24 hours notice for rescheduling. You can easily manage or reschedule your appointment anytime through the "My Visits" section on our website.',
  },
];
