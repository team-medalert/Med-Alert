// Med-Alert Medicine Dictionary
const MEDICINE_DICTIONARY = [
  {
    "name": "Crocin (Paracetamol)",
    "uses": "Relieves mild to moderate pain (e.g. headache, muscle aches) and reduces fever.",
    "dosage": "Consult your doctor first",
    "effects": "Analgesic and antipyretic effect; inhibits prostaglandin production in the brain.",
    "sideEffects": "Nausea, rash, headache; excessive use may cause liver damage."
  },
  {
    "name": "Calpol (Paracetamol)",
    "uses": "Alleviates fever and pain in adults and children (often used for childhood fever).",
    "dosage": "Consult your doctor first",
    "effects": "Acts on the brain’s heat-regulating centre and pain pathways to reduce fever and pain.",
    "sideEffects": "Drowsiness, nausea, rash; overdose risk includes severe liver injury."
  },
  {
    "name": "Dolo 650 (Paracetamol)",
    "uses": "Commonly used for high fever, aches, and pains (e.g. colds, headaches).",
    "dosage": "Consult your doctor first",
    "effects": "Central nervous system analgesic and antipyretic effect, by inhibiting COX enzymes.",
    "sideEffects": "Stomach upset, allergic skin reaction; large doses can be hepatotoxic."
  },
  {
    "name": "Combiflam (Ibuprofen + Paracetamol)",
    "uses": "Relieves pain, inflammation and fever, such as for headaches, backache or arthritis.",
    "dosage": "Consult your doctor first",
    "effects": "Combines NSAID action (ibuprofen) and antipyretic (paracetamol) effects to reduce pain and inflammation.",
    "sideEffects": "Gastrointestinal upset, heartburn; risk of gastric irritation and dizziness."
  },
  {
    "name": "Brufen (Ibuprofen)",
    "uses": "Treats pain, swelling and fever in conditions like menstrual cramps, dental pain, and arthritis.",
    "dosage": "Consult your doctor first",
    "effects": "Non-steroidal anti-inflammatory that blocks COX enzymes to reduce prostaglandin synthesis.",
    "sideEffects": "Stomach pain, nausea, or heartburn; may increase bleeding tendency."
  },
  {
    "name": "Ibugesic (Ibuprofen)",
    "uses": "Used for relief of pain, inflammation and fever (e.g. after injuries or surgery).",
    "dosage": "Consult your doctor first",
    "effects": "NSAID that reduces inflammatory chemicals, thus easing pain and swelling.",
    "sideEffects": "Gastrointestinal discomfort (indigestion), headache, dizziness."
  },
  {
    "name": "Ecosprin (Aspirin)",
    "uses": "Mild pain relief and fever reduction; used low-dose as blood thinner in heart disease.",
    "dosage": "Consult your doctor first",
    "effects": "Inhibits prostaglandins and prevents platelet aggregation (anti-inflammatory and anti-platelet).",
    "sideEffects": "Gastric irritation, indigestion, or tinnitus; increased bleeding risk (especially in elderly)."
  },
  {
    "name": "Wosprin (Aspirin)",
    "uses": "Similar to other aspirin brands; used for pain, inflammation, fever, and as an anti-platelet.",
    "dosage": "Consult your doctor first",
    "effects": "Analgesic and anti-inflammatory by COX inhibition; also reduces clotting by platelet inhibition.",
    "sideEffects": "Ulcer risk, nausea, ringing in ears; caution in combination with other blood thinners."
  },
  {
    "name": "Naprosyn (Naproxen)",
    "uses": "Relieves pain and inflammation in arthritis, gout, dysmenorrhea (cramps), and musculoskeletal injuries.",
    "dosage": "Consult your doctor first",
    "effects": "NSAID that inhibits inflammatory mediators (prostaglandins) to reduce pain and swelling.",
    "sideEffects": "Heartburn, headache, stomach upset; dizziness or drowsiness may occur."
  },
  {
    "name": "Voveran (Diclofenac)",
    "uses": "Used for pain and inflammation from arthritis, injury, or acute pain (e.g. migraines, period pain).",
    "dosage": "Consult your doctor first",
    "effects": "NSAID that blocks prostaglandin synthesis in inflamed tissues, reducing pain and swelling.",
    "sideEffects": "Stomach upset, nausea, headache; may cause increased blood pressure or swelling in some cases."
  },
  {
    "name": "Augmentin (Amoxicillin + Clavulanic acid)",
    "uses": "Broad-spectrum antibiotic for respiratory, urinary tract, skin, and ear infections.",
    "dosage": "Consult your doctor first",
    "effects": "Beta-lactam antibiotic (amoxicillin) with a beta-lactamase inhibitor (clavulanic acid) to overcome resistant bacteria.",
    "sideEffects": "Diarrhoea, nausea, skin rash; overgrowth of opportunistic yeast infection (candida)."
  },
  {
    "name": "Clavam (Amoxicillin + Clavulanic acid)",
    "uses": "Similar to Augmentin: treats sinus, chest, urinary and skin infections caused by bacteria.",
    "dosage": "Consult your doctor first",
    "effects": "Combination antibiotic with extended range (blocks bacterial cell-wall synthesis and beta-lactamase enzyme).",
    "sideEffects": "Stomach upset, diarrhoea, vomiting, and allergic skin reactions."
  },
  {
    "name": "Azithral (Azithromycin)",
    "uses": "Effective for respiratory infections (bronchitis, pneumonia), ear infections and some STIs.",
    "dosage": "Consult your doctor first",
    "effects": "Macrolide antibiotic that inhibits bacterial protein synthesis.",
    "sideEffects": "Abdominal pain, nausea, diarrhoea; occasional abnormal liver function tests."
  },
  {
    "name": "Cifran (Ciprofloxacin)",
    "uses": "Treats severe bacterial infections of urinary tract, gastrointestinal tract, joints, and respiratory system.",
    "dosage": "Consult your doctor first",
    "effects": "Fluoroquinolone that inhibits bacterial DNA gyrase, preventing DNA replication.",
    "sideEffects": "Nausea, headache, dizziness; may cause tendon irritation or photosensitivity."
  },
  {
    "name": "Ciplox (Ciprofloxacin)",
    "uses": "Similar to Cifran: broad infections including typhoid, urinary and chest infections.",
    "dosage": "Consult your doctor first",
    "effects": "Same as Cifran (fluoroquinolone antibiotic blocking bacterial DNA processes).",
    "sideEffects": "Gastrointestinal upset, dizziness, rash; caution: tendon damage or nerve issues in rare cases."
  },
  {
    "name": "Monocef (Cefixime)",
    "uses": "Oral cephalosporin for pharyngitis, otitis media, bronchitis and gonorrhoea.",
    "dosage": "Consult your doctor first",
    "effects": "Third-generation cephalosporin that inhibits bacterial cell wall synthesis.",
    "sideEffects": "Nausea, diarrhoea, headache; possible allergic reactions in penicillin-allergic patients."
  },
  {
    "name": "Zinnat (Cefuroxime)",
    "uses": "Treats sinusitis, respiratory infections, skin infections and Lyme disease.",
    "dosage": "Consult your doctor first",
    "effects": "Second-generation cephalosporin antibiotic that prevents cell wall formation in bacteria.",
    "sideEffects": "Stomach upset, diarrhoea, dizziness; rash or allergy in sensitive individuals."
  },
  {
    "name": "Metrogyl (Metronidazole)",
    "uses": "Treats anaerobic bacterial infections and protozoal infections (e.g. amoebiasis, giardiasis).",
    "dosage": "Consult your doctor first",
    "effects": "Disrupts microbial DNA in anaerobes and parasites.",
    "sideEffects": "Metallic taste, nausea, dry mouth; headache or neuropathy with prolonged use."
  },
  {
    "name": "Flagyl (Metronidazole)",
    "uses": "Similar to Metrogyl: used for amoebic dysentery, gynecological infections, and dental infections.",
    "dosage": "Consult your doctor first",
    "effects": "Same mechanism as Metrogyl (DNA strand breakage in anaerobic pathogens).",
    "sideEffects": "Vomiting, diarrhoea, metallic taste, and peripheral neuropathy with long-term use."
  },
  {
    "name": "Doxicip (Doxycycline)",
    "uses": "Broad antibacterial: used for acne, respiratory infections, malaria prophylaxis, and some STIs.",
    "dosage": "Consult your doctor first",
    "effects": "Tetracycline antibiotic that inhibits protein synthesis in bacteria.",
    "sideEffects": "Photosensitivity (sunburn risk), dizziness, upset stomach; tooth discolouration in children."
  },
  {
    "name": "Dalacin (Clindamycin)",
    "uses": "Used for skin and soft tissue infections, osteomyelitis, and some anaerobic infections.",
    "dosage": "Consult your doctor first",
    "effects": "Lincosamide antibiotic that inhibits bacterial protein synthesis.",
    "sideEffects": "Severe diarrhoea (colitis risk), nausea, rash; risk of antibiotic-associated colitis."
  },
  {
    "name": "ZyClara (Clarithromycin)",
    "uses": "Treats respiratory tract infections (bronchitis, pneumonia) and skin infections.",
    "dosage": "Consult your doctor first",
    "effects": "Macrolide antibiotic that binds to bacterial ribosomes and stops protein production.",
    "sideEffects": "Bitter taste, gastrointestinal upset; may cause liver enzyme changes or metallic taste."
  },
  {
    "name": "Cetzine (Cetirizine)",
    "uses": "Treats allergy symptoms such as sneezing, runny nose, hives and itching.",
    "dosage": "Consult your doctor first",
    "effects": "Second-generation antihistamine that blocks histamine (H1) receptors to reduce allergic symptoms.",
    "sideEffects": "Mild drowsiness, dry mouth; less sedating than older antihistamines."
  },
  {
    "name": "Allegra (Fexofenadine)",
    "uses": "Used for relief of hay fever, allergic rhinitis, and urticaria (hives).",
    "dosage": "Consult your doctor first",
    "effects": "Non-sedating antihistamine that blocks H1 receptors.",
    "sideEffects": "Headache, nausea, sometimes fatigue; minimal sedation risk."
  },
  {
    "name": "Montair (Montelukast)",
    "uses": "Treats allergic rhinitis and prevents exercise-induced bronchospasm (asthma adjunct).",
    "dosage": "Consult your doctor first",
    "effects": "Leukotriene receptor antagonist that reduces inflammation and bronchoconstriction.",
    "sideEffects": "Headache, abdominal pain; occasional mood changes or nightmares in some patients."
  },
  {
    "name": "Xyzal (Levocetirizine)",
    "uses": "Manages allergy symptoms (similar to cetirizine, but may be given in a single daily dose).",
    "dosage": "Consult your doctor first",
    "effects": "Active enantiomer of cetirizine; blocks H1 histamine receptors to relieve allergy symptoms.",
    "sideEffects": "Slight sedation possible, headache, dry mouth."
  },
  {
    "name": "Otrivin (Xylometazoline)",
    "uses": "Topical nasal decongestant for relief of nasal congestion due to colds or allergies.",
    "dosage": "Consult your doctor first",
    "effects": "Alpha-adrenergic agonist that constricts nasal blood vessels to reduce swelling and congestion.",
    "sideEffects": "Temporary stinging or dryness in the nose; rebound congestion with prolonged use."
  },
  {
    "name": "Glycomet (Metformin)",
    "uses": "First-line medication for type 2 diabetes to lower blood glucose levels.",
    "dosage": "Consult your doctor first",
    "effects": "Reduces hepatic glucose production and improves insulin sensitivity.",
    "sideEffects": "Gastrointestinal upset (diarrhoea, nausea); vitamin B12 deficiency possible with long-term use."
  },
  {
    "name": "Glycomet-GP (Metformin + Glimepiride)",
    "uses": "Combination for type 2 diabetes where diet and single therapy are insufficient.",
    "dosage": "Consult your doctor first",
    "effects": "Metformin plus sulfonylurea (increases insulin release from pancreas).",
    "sideEffects": "Risk of hypoglycaemia (due to sulfonylurea), weight gain; GI upset from metformin."
  },
  {
    "name": "Amaryl (Glimepiride)",
    "uses": "Lowers blood sugar in type 2 diabetes, usually as add-on therapy.",
    "dosage": "Consult your doctor first",
    "effects": "Sulfonylurea that stimulates insulin secretion from pancreas.",
    "sideEffects": "Hypoglycaemia (especially if fasting), weight gain; skin allergy reactions."
  },
  {
    "name": "Diamicron (Gliclazide)",
    "uses": "Controls blood sugar in type 2 diabetes (especially in overweight patients).",
    "dosage": "Consult your doctor first",
    "effects": "Sulfonylurea class (stimulates insulin release).",
    "sideEffects": "Hypoglycaemia, dizziness; nausea or abdominal discomfort."
  },
  {
    "name": "Micronase (Glipizide)",
    "uses": "Adjunct to diet and exercise in type 2 diabetes.",
    "dosage": "Consult your doctor first",
    "effects": "Stimulates insulin secretion (sulfonylurea).",
    "sideEffects": "Risk of low blood sugar; mild stomach upset or rash."
  },
  {
    "name": "Basen (Voglibose)",
    "uses": "Used with diet to improve glycaemic control in type 2 diabetes.",
    "dosage": "Consult your doctor first",
    "effects": "Alpha-glucosidase inhibitor; delays carbohydrate absorption from intestine.",
    "sideEffects": "Flatulence, abdominal bloating or diarrhoea."
  },
  {
    "name": "Galvus (Vildagliptin)",
    "uses": "Adjunct for type 2 diabetes to improve glycaemic control (often with metformin).",
    "dosage": "Consult your doctor first",
    "effects": "DPP-4 inhibitor; prolongs incretin activity to increase insulin and decrease glucagon.",
    "sideEffects": "Headache, dizziness; rare skin reactions."
  },
  {
    "name": "Oseni (Pioglitazone + Sitagliptin)",
    "uses": "Dual therapy for type 2 diabetes when single agents insufficient.",
    "dosage": "Consult your doctor first",
    "effects": "Pioglitazone improves insulin sensitivity; sitagliptin enhances incretin levels.",
    "sideEffects": "Fluid retention (pioglitazone) causing weight gain; mild hypoglycaemia risk."
  },
  {
    "name": "Mixtard 30 (Insulin Premix 30%/70%)",
    "uses": "Mixed insulin preparation for type 1 or type 2 diabetes requiring insulin therapy.",
    "dosage": "Consult your doctor first",
    "effects": "Combined rapid- and intermediate-acting insulin for baseline and mealtime control.",
    "sideEffects": "Hypoglycaemia (especially if meals are delayed), weight gain."
  },
  {
    "name": "Lantus (Insulin Glargine)",
    "uses": "Long-acting insulin to control blood sugar in type 1 and type 2 diabetes.",
    "dosage": "Consult your doctor first",
    "effects": "Provides a steady, peakless insulin level over 24 hours.",
    "sideEffects": "Hypoglycaemia, weight gain; injection site reactions."
  },
  {
    "name": "Basalog (Insulin Glargine)",
    "uses": "Same use as Lantus (biosimilar long-acting insulin).",
    "dosage": "Consult your doctor first",
    "effects": "Similar steady 24-hour insulin effect (glargine insulin analogue).",
    "sideEffects": "Similar to Lantus (risk of hypoglycaemia, weight gain)."
  },
  {
    "name": "Novorapid (Insulin Aspart)",
    "uses": "Rapid-acting insulin for mealtime glucose control in diabetes.",
    "dosage": "Consult your doctor first",
    "effects": "Fast-acting insulin that starts working within minutes to control post-meal glucose rise.",
    "sideEffects": "Hypoglycaemia (if dose exceeds need), injection site irritation."
  },
  {
    "name": "Actrapid (Regular Human Insulin)",
    "uses": "Short-acting insulin (can be used in emergency high glucose or meal coverage).",
    "dosage": "Consult your doctor first",
    "effects": "Human insulin that begins working within about 30 minutes, lasting ~8 hours.",
    "sideEffects": "Hypoglycaemia, weight gain; allergy is rare but possible."
  },
  {
    "name": "Amlodac (Amlodipine)",
    "uses": "Lowers blood pressure and treats chest pain (angina).",
    "dosage": "Consult your doctor first",
    "effects": "Calcium channel blocker; relaxes blood vessels to reduce cardiac workload.",
    "sideEffects": "Swelling (oedema), flushing, headache; dizziness when standing up."
  },
  {
    "name": "Losar (Losartan)",
    "uses": "Treats hypertension and protects kidneys in diabetes.",
    "dosage": "Consult your doctor first",
    "effects": "Angiotensin II receptor blocker (ARB) that dilates blood vessels.",
    "sideEffects": "Dizziness, cough (rare), hyperkalaemia (elevated potassium)."
  },
  {
    "name": "Lopressor (Metoprolol)",
    "uses": "Beta-blocker for hypertension, angina, and heart rhythm disorders.",
    "dosage": "Consult your doctor first",
    "effects": "Reduces heart rate and cardiac output by blocking β₁ receptors.",
    "sideEffects": "Fatigue, slow pulse, cold extremities; may cause dizziness or sleep disturbance."
  },
  {
    "name": "Crizal (Carvedilol)",
    "uses": "Treats heart failure and high blood pressure.",
    "dosage": "Consult your doctor first",
    "effects": "Non-selective β-blocker with α-blocking effects, lowering heart rate and blood pressure.",
    "sideEffects": "Dizziness, weight gain, fatigue; may cause low blood pressure or slow heart rate."
  },
  {
    "name": "Clopitab (Clopidogrel)",
    "uses": "Anti-platelet agent to prevent blood clots (used after stents, stroke prevention).",
    "dosage": "Consult your doctor first",
    "effects": "Inhibits platelet aggregation by blocking ADP receptors on platelets.",
    "sideEffects": "Bleeding (nosebleeds, easy bruising), diarrhoea; rare allergic reactions."
  },
  {
    "name": "Acitrom (Warfarin)",
    "uses": "Oral anticoagulant for atrial fibrillation, deep vein thrombosis, etc.",
    "dosage": "Consult your doctor first",
    "effects": "Inhibits vitamin K-dependent clotting factors, reducing blood clotting.",
    "sideEffects": "Bleeding risk, skin necrosis (rare); many drug and food interactions."
  },
  {
    "name": "Eliquis (Apixaban)",
    "uses": "Oral anticoagulant for stroke prevention in atrial fibrillation, DVT/PE treatment.",
    "dosage": "Consult your doctor first",
    "effects": "Direct Factor Xa inhibitor, preventing clot formation.",
    "sideEffects": "Increased bleeding (especially GI); anaemia (rare)."
  },
  {
    "name": "Nitrocontin (Nitroglycerin, transdermal)",
    "uses": "Chronic angina prophylaxis (prevents chest pain episodes).",
    "dosage": "Consult your doctor first",
    "effects": "Releases nitric oxide, dilating coronary vessels and reducing heart workload.",
    "sideEffects": "Headache, lightheadedness, skin irritation at patch site."
  },
  {
    "name": "Atorva (Atorvastatin)",
    "uses": "Lowers cholesterol to reduce risk of heart attack and stroke.",
    "dosage": "Consult your doctor first",
    "effects": "HMG-CoA reductase inhibitor that reduces LDL cholesterol production.",
    "sideEffects": "Muscle aches, liver enzyme elevation; rarely, muscle breakdown (rhabdomyolysis)."
  },
  {
    "name": "Cardizem (Diltiazem)",
    "uses": "Treats hypertension, angina, and certain abnormal heart rhythms.",
    "dosage": "Consult your doctor first",
    "effects": "Calcium channel blocker (benzothiazepine class) that lowers heart rate and relaxes blood vessels.",
    "sideEffects": "Constipation, dizziness, headache; may cause oedema or bradycardia."
  },
  {
    "name": "Stenorm (Nebivolol)",
    "uses": "Treats hypertension; can improve heart function in heart failure.",
    "dosage": "Consult your doctor first",
    "effects": "β₁ blocker with additional nitric oxide–mediated vasodilation.",
    "sideEffects": "Fatigue, headache, nausea; may cause slow heart rate or sexual dysfunction."
  },
  {
    "name": "Norace (Ramipril)",
    "uses": "ACE inhibitor used for hypertension and heart failure.",
    "dosage": "Consult your doctor first",
    "effects": "Blocks angiotensin-converting enzyme, reducing angiotensin II and lowering blood pressure.",
    "sideEffects": "Dry cough, dizziness, high potassium; angioedema (rare but serious)."
  },
  {
    "name": "Tenormin (Atenolol)",
    "uses": "Beta-blocker for high blood pressure and angina.",
    "dosage": "Consult your doctor first",
    "effects": "Selective β₁ blocker reducing heart rate and output.",
    "sideEffects": "Fatigue, slow pulse, cold hands; can cause dizziness or depression."
  },
  {
    "name": "PAN (Pantoprazole)",
    "uses": "Proton pump inhibitor for gastro-oesophageal reflux, ulcers, and heartburn.",
    "dosage": "Consult your doctor first",
    "effects": "Blocks gastric proton pumps, reducing stomach acid secretion.",
    "sideEffects": "Diarrhoea, abdominal pain, flatulence; long-term use can reduce vitamin B12 absorption."
  },
  {
    "name": "PAN-D (Pantoprazole + Domperidone)",
    "uses": "Combines acid reflux relief with anti-nausea; for GERD with nausea symptoms.",
    "dosage": "Consult your doctor first",
    "effects": "Pantoprazole reduces acid, domperidone improves gastric motility and reduces vomiting.",
    "sideEffects": "Side effects from both drugs (see PAN and Domperidone)."
  },
  {
    "name": "Domstal (Domperidone)",
    "uses": "Anti-emetic for nausea and vomiting (e.g. from gastritis or migraine).",
    "dosage": "Consult your doctor first",
    "effects": "Dopamine antagonist that accelerates gastric emptying.",
    "sideEffects": "Dry mouth, abdominal cramps; rare prolonged use may affect heart rhythm."
  },
  {
    "name": "Mesacol (Mesalazine)",
    "uses": "Treats mild to moderate inflammatory bowel disease (ulcerative colitis).",
    "dosage": "Consult your doctor first",
    "effects": "Anti-inflammatory agent acting locally in the gut to reduce inflammation.",
    "sideEffects": "Headache, nausea, abdominal pain; occasional kidney effects (monitoring needed)."
  },
  {
    "name": "Razo (Lansoprazole)",
    "uses": "Acid reflux, gastritis, and ulcer therapy (alternative PPI to pantoprazole).",
    "dosage": "Consult your doctor first",
    "effects": "Proton pump inhibitor, similar to pantoprazole, lowering stomach acid.",
    "sideEffects": "Similar to pantoprazole: headache, diarrhoea, abdominal pain."
  },
  {
    "name": "Liv-52 (Herbal Liver Supplement)",
    "uses": "Ayurvedic hepatoprotective used in liver disease support (e.g. hepatitis, fatty liver).",
    "dosage": "Consult your doctor first",
    "effects": "Herbal formula believed to improve liver detoxification and regeneration (unproven mechanism).",
    "sideEffects": "Generally well tolerated; may cause mild stomach upset or allergic reaction in sensitive individuals."
  },
  {
    "name": "Hepamerz (L‑Ornithine L‑Aspartate)",
    "uses": "Used as liver supplement in hepatic encephalopathy and chronic liver disease.",
    "dosage": "Consult your doctor first",
    "effects": "Amino acids that help lower blood ammonia levels, supporting liver detoxification.",
    "sideEffects": "Generally mild; occasional gastrointestinal discomfort."
  },
  {
    "name": "Udiliv (Ursodeoxycholic acid)",
    "uses": "Treats certain liver disorders (cholestasis, gallstone dissolution in special cases).",
    "dosage": "Consult your doctor first",
    "effects": "Reduces cholesterol absorption and improves bile flow.",
    "sideEffects": "Diarrhoea, abdominal discomfort; rash is rare."
  },
  {
    "name": "Ondem (Ondansetron)",
    "uses": "Prevents nausea and vomiting (e.g. chemotherapy, post-op).",
    "dosage": "Consult your doctor first",
    "effects": "5‑HT₃ receptor antagonist that blocks emetic signals in the brain.",
    "sideEffects": "Headache, constipation, fatigue; dizziness in some patients."
  },
  {
    "name": "Duphalac (Lactulose)",
    "uses": "Osmotic laxative for constipation; also used in hepatic encephalopathy.",
    "dosage": "Consult your doctor first",
    "effects": "Draws water into colon (constipation relief) and reduces blood ammonia absorption.",
    "sideEffects": "Abdominal cramps, gas, diarrhoea if dose is too high."
  },
  {
    "name": "Gelusil (Antacid)",
    "uses": "Relief of heartburn, acid indigestion and upset stomach.",
    "dosage": "Consult your doctor first",
    "effects": "Neutralizes excess stomach acid with magnesium and aluminium compounds.",
    "sideEffects": "Chalky taste, constipation (aluminium) or diarrhoea (magnesium)."
  },
  {
    "name": "Sanospas (Dicyclomine)",
    "uses": "Antispasmodic for intestinal cramps and irritable bowel symptoms.",
    "dosage": "Consult your doctor first",
    "effects": "Anticholinergic that relaxes smooth muscle in the gut.",
    "sideEffects": "Dry mouth, blurred vision, drowsiness; avoid in glaucoma or urinary retention."
  },
  {
    "name": "Ventolin (Salbutamol)",
    "uses": "Quick relief inhaler for acute asthma or COPD symptoms (wheezing, shortness of breath).",
    "dosage": "Consult your doctor first",
    "effects": "Short-acting β₂ agonist that relaxes airway muscles, easing bronchospasm.",
    "sideEffects": "Tremor, nervousness, headache, fast heartbeat; throat irritation."
  },
  {
    "name": "Atrovent (Ipratropium)",
    "uses": "Bronchodilator inhaler for chronic obstructive airway diseases (COPD, asthma adjunct).",
    "dosage": "Consult your doctor first",
    "effects": "Anticholinergic that relaxes bronchial smooth muscle and reduces mucus secretion.",
    "sideEffects": "Dry mouth, cough, blurry vision if sprayed in eyes; constipation (rare)."
  },
  {
    "name": "Foracort (Budesonide + Formoterol)",
    "uses": "Combination inhaler for maintenance treatment of asthma and COPD.",
    "dosage": "Consult your doctor first",
    "effects": "Budesonide (steroid) reduces airway inflammation; formoterol is long-acting bronchodilator.",
    "sideEffects": "Oral thrush (rinse mouth after use), hoarseness; tremor or palpitations from formoterol."
  },
  {
    "name": "Seroflo (Salmeterol + Fluticasone)",
    "uses": "Inhaler for persistent asthma and COPD (maintenance therapy).",
    "dosage": "Consult your doctor first",
    "effects": "Fluticasone (steroid) + salmeterol (long-acting bronchodilator) improve breathing over time.",
    "sideEffects": "Thrush in mouth, cough; headache, possible tremor."
  },
  {
    "name": "Budecort (Budesonide)",
    "uses": "Steroid inhaler for asthma control (daily maintenance).",
    "dosage": "Consult your doctor first",
    "effects": "Inhaled corticosteroid that reduces airway inflammation.",
    "sideEffects": "Oral candidiasis (thrush), throat irritation; hoarseness with long-term use."
  },
  {
    "name": "Spiriva (Tiotropium)",
    "uses": "Once-daily inhaler for long-term management of COPD.",
    "dosage": "Consult your doctor first",
    "effects": "Long-acting anticholinergic bronchodilator.",
    "sideEffects": "Dry mouth, constipation, urinary retention; blurred vision (rare)."
  },
  {
    "name": "Uniphyllin (Theophylline)",
    "uses": "Oral bronchodilator for asthma/COPD (when inhalers are insufficient).",
    "dosage": "Consult your doctor first",
    "effects": "Phosphodiesterase inhibitor that relaxes airway smooth muscles.",
    "sideEffects": "Nausea, headache, insomnia; possible arrhythmias or seizures at high levels."
  },
  {
    "name": "Ambrodil (Ambroxol)",
    "uses": "Mucolytic cough syrup for respiratory congestion.",
    "dosage": "Consult your doctor first",
    "effects": "Thins mucus secretions in the airways to ease cough.",
    "sideEffects": "Nausea, vomiting; occasional allergic skin reactions."
  },
  {
    "name": "Combivent (Salbutamol + Ipratropium)",
    "uses": "Combined bronchodilator inhaler for COPD or severe asthma episodes.",
    "dosage": "Consult your doctor first",
    "effects": "Short-acting β₂ agonist (salbutamol) + anticholinergic (ipratropium) for dual bronchodilation.",
    "sideEffects": "Increased heart rate, dry mouth, tremor; risk of throat irritation."
  },
  {
    "name": "Dart (Deriphylline)",
    "uses": "Oral bronchodilator for asthma and COPD (when others are inadequate).",
    "dosage": "Consult your doctor first",
    "effects": "Combination of etophylline and theophylline; relaxes bronchial muscles.",
    "sideEffects": "Nausea, headache, restlessness; dizziness or palpitations."
  },
  {
    "name": "Zoloft (Sertraline)",
    "uses": "SSRI antidepressant for depression, anxiety disorders, PTSD.",
    "dosage": "Consult your doctor first",
    "effects": "Selective serotonin reuptake inhibitor increases serotonin in the brain.",
    "sideEffects": "Sexual dysfunction, nausea, insomnia or drowsiness; headache."
  },
  {
    "name": "Prozac (Fluoxetine)",
    "uses": "SSRI for depression, obsessive-compulsive disorder, panic attacks.",
    "dosage": "Consult your doctor first",
    "effects": "Inhibits reuptake of serotonin, enhancing mood regulation.",
    "sideEffects": "Insomnia, dry mouth, loss of appetite; increased sweating."
  },
  {
    "name": "Lexapro (Escitalopram)",
    "uses": "SSRI antidepressant for depression and anxiety.",
    "dosage": "Consult your doctor first",
    "effects": "Blocks serotonin reuptake, improving mood and anxiety symptoms.",
    "sideEffects": "Drowsiness, fatigue, headache; sometimes nausea or sexual side effects."
  },
  {
    "name": "Effexor (Venlafaxine)",
    "uses": "SNRI for major depression, generalized anxiety, panic disorder.",
    "dosage": "Consult your doctor first",
    "effects": "Inhibits reuptake of serotonin and norepinephrine.",
    "sideEffects": "Increased blood pressure, sweating, insomnia; nausea."
  },
  {
    "name": "Amitone (Amitriptyline)",
    "uses": "TCA used for chronic pain, depression, migraine prevention, insomnia.",
    "dosage": "Consult your doctor first",
    "effects": "Inhibits reuptake of serotonin and noradrenaline, with strong anticholinergic effects.",
    "sideEffects": "Dry mouth, constipation, weight gain; sedation or blurred vision."
  },
  {
    "name": "Lorans (Lorazepam)",
    "uses": "Benzodiazepine for anxiety relief, insomnia, seizures.",
    "dosage": "Consult your doctor first",
    "effects": "Enhances GABA neurotransmission, causing sedative and anxiolytic effect.",
    "sideEffects": "Drowsiness, confusion; tolerance/dependence risk with long-term use."
  },
  {
    "name": "Alprax (Alprazolam)",
    "uses": "Short-acting benzodiazepine for acute anxiety and panic attacks.",
    "dosage": "Consult your doctor first",
    "effects": "Similar to lorazepam (GABA potentiation).",
    "sideEffects": "Drowsiness, memory impairment; risk of dependence."
  },
  {
    "name": "Clonoz (Clonazepam)",
    "uses": "Benzodiazepine for seizure disorders and panic disorder.",
    "dosage": "Consult your doctor first",
    "effects": "Potentiates GABA, reducing neuronal excitability.",
    "sideEffects": "Dizziness, fatigue, coordination problems; dependency risk."
  },
  {
    "name": "Risperdal (Risperidone)",
    "uses": "Atypical antipsychotic for schizophrenia, bipolar mania, irritability in autism.",
    "dosage": "Consult your doctor first",
    "effects": "Dopamine and serotonin antagonist, reducing psychotic symptoms.",
    "sideEffects": "Weight gain, drowsiness; extrapyramidal symptoms (tremor or stiffness)."
  },
  {
    "name": "Zyprexa (Olanzapine)",
    "uses": "Antipsychotic for schizophrenia and bipolar disorder.",
    "dosage": "Consult your doctor first",
    "effects": "Blocks dopamine and serotonin receptors.",
    "sideEffects": "Significant weight gain, sedation; metabolic changes (glucose intolerance)."
  },
  {
    "name": "Tegretol (Carbamazepine)",
    "uses": "Mood stabilizer/anticonvulsant for seizures and bipolar mania.",
    "dosage": "Consult your doctor first",
    "effects": "Reduces nerve impulse transmission (blocks sodium channels).",
    "sideEffects": "Dizziness, drowsiness; nausea, low sodium (monitoring needed)."
  },
  {
    "name": "Levera (Levetiracetam)",
    "uses": "Antiepileptic drug for seizures.",
    "dosage": "Consult your doctor first",
    "effects": "Modulates neurotransmitter release (exact mechanism unclear).",
    "sideEffects": "Fatigue, irritability, dizziness; coordination problems."
  },
  {
    "name": "Gabantin (Gabapentin)",
    "uses": "Neuropathic pain and seizure medication.",
    "dosage": "Consult your doctor first",
    "effects": "Modulates GABA synthesis; reduces nerve hyperexcitability.",
    "sideEffects": "Drowsiness, weight gain; peripheral oedema."
  },
  {
    "name": "Lyrica (Pregabalin)",
    "uses": "Treats neuropathic pain and fibromyalgia.",
    "dosage": "Consult your doctor first",
    "effects": "Binds calcium channels, reducing neurotransmitter release.",
    "sideEffects": "Dizziness, sleepiness; oedema."
  },
  {
    "name": "Valparin (Valproate)",
    "uses": "Anticonvulsant for epilepsy and mood stabilizer for bipolar disorder.",
    "dosage": "Consult your doctor first",
    "effects": "Increases GABA availability, stabilizing electrical activity.",
    "sideEffects": "Nausea, tremor, weight gain; liver toxicity (monitoring needed)."
  },
  {
    "name": "Donex (Donepezil)",
    "uses": "Alzheimer’s disease cognitive symptoms (mild–moderate).",
    "dosage": "Consult your doctor first",
    "effects": "Cholinesterase inhibitor (increases acetylcholine in the brain).",
    "sideEffects": "Diarrhoea, insomnia, muscle cramps; nausea."
  },
  {
    "name": "Memox (Memantine)",
    "uses": "Moderate–severe Alzheimer’s (often with donepezil).",
    "dosage": "Consult your doctor first",
    "effects": "NMDA receptor antagonist, modulates glutamate.",
    "sideEffects": "Dizziness, headache, constipation; confusion in some."
  },
  {
    "name": "Imitrex (Sumatriptan)",
    "uses": "Acute migraine headaches (with or without aura).",
    "dosage": "Consult your doctor first",
    "effects": "Selective serotonin receptor agonist, constricts cranial blood vessels.",
    "sideEffects": "Tingling, warm sensation; chest tightness, nausea."
  },
  {
    "name": "Syndopa (Levodopa + Carbidopa)",
    "uses": "Parkinson’s disease symptoms (rigidity, tremor).",
    "dosage": "Consult your doctor first",
    "effects": "Dopamine precursor (levodopa) plus decarboxylase inhibitor (carbidopa).",
    "sideEffects": "Nausea, low blood pressure (when standing), involuntary movements (dyskinesia)."
  },
  {
    "name": "Largactil (Chlorpromazine)",
    "uses": "Older antipsychotic and antiemetic (used for psychosis or severe nausea).",
    "dosage": "Consult your doctor first",
    "effects": "Typical antipsychotic (blocks dopamine receptors).",
    "sideEffects": "Sedation, low blood pressure; movement disorders (tremors)."
  },
  {
    "name": "Lithium (Carbolith)",
    "uses": "Mood stabilizer for bipolar disorder.",
    "dosage": "Consult your doctor first",
    "effects": "Exact mechanism unknown (modulates neurotransmission).",
    "sideEffects": "Tremor, thirst, frequent urination; thyroid and kidney effects (monitoring needed)."
  },
  {
    "name": "Clozaril (Clozapine)",
    "uses": "Treatment-resistant schizophrenia.",
    "dosage": "Consult your doctor first",
    "effects": "Atypical antipsychotic with strong anti-dopamine and anti-serotonin effects.",
    "sideEffects": "Agranulocytosis (requires blood tests), sedation, weight gain."
  },
  {
    "name": "Seroquel (Quetiapine)",
    "uses": "Bipolar mania, depression adjunct, and schizophrenia.",
    "dosage": "Consult your doctor first",
    "effects": "Atypical antipsychotic (blocks multiple neurotransmitters).",
    "sideEffects": "Sleepiness, weight gain; orthostatic hypotension."
  },
  {
    "name": "Imovane (Zopiclone)",
    "uses": "Short-term insomnia (sleep disorder).",
    "dosage": "Consult your doctor first",
    "effects": "Sedative-hypnotic (enhances GABA).",
    "sideEffects": "Drowsiness next day, bitter taste; risk of dependence with prolonged use."
  },
  {
    "name": "Zopicon (Zolpidem)",
    "uses": "Short-term treatment of insomnia.",
    "dosage": "Consult your doctor first",
    "effects": "Non-benzodiazepine hypnotic (GABAergic) to induce sleep.",
    "sideEffects": "Daytime drowsiness, dizziness; mild tolerance with chronic use."
  },
  {
    "name": "Thyronorm (Levothyroxine)",
    "uses": "Replacement hormone for hypothyroidism.",
    "dosage": "Consult your doctor first",
    "effects": "Synthetic thyroxine (T₄) hormone to normalize metabolic rate.",
    "sideEffects": "Overdose causes palpitations, weight loss, tremor; doses must be adjusted carefully."
  },
  {
    "name": "Neomercazole (Carbimazole)",
    "uses": "Treats hyperthyroidism (Graves’ disease).",
    "dosage": "Consult your doctor first",
    "effects": "Thionamide that inhibits thyroid hormone production.",
    "sideEffects": "Rash, joint pain; rarely, bone marrow suppression (requires blood monitoring)."
  },
  {
    "name": "Wysolone (Prednisolone)",
    "uses": "Oral corticosteroid for adrenal insufficiency, asthma, inflammation.",
    "dosage": "Consult your doctor first",
    "effects": "Mimics cortisol, reduces inflammation and immune response.",
    "sideEffects": "Weight gain, high blood sugar, osteoporosis; long-term use causes Cushingoid features."
  },
  {
    "name": "Florinef (Fludrocortisone)",
    "uses": "Mineralocorticoid replacement in Addison’s disease.",
    "dosage": "Consult your doctor first",
    "effects": "Mimics aldosterone to maintain salt balance and blood pressure.",
    "sideEffects": "Fluid retention, high blood pressure; low potassium levels."
  },
  {
    "name": "Desmopressin (DDAVP)",
    "uses": "Treats diabetes insipidus and nocturnal enuresis.",
    "dosage": "Consult your doctor first",
    "effects": "Synthetic vasopressin analog, concentrates urine and reduces urine output.",
    "sideEffects": "Headache, hyponatraemia (low blood sodium) with excess water intake."
  },
  {
    "name": "Calcirol (Calcitriol)",
    "uses": "Active vitamin D for hypocalcaemia (e.g. renal failure).",
    "dosage": "Consult your doctor first",
    "effects": "Increases intestinal absorption of calcium and phosphate.",
    "sideEffects": "Hypercalcaemia (nausea, weakness) if overdosed."
  },
  {
    "name": "Fosamax (Alendronate)",
    "uses": "Treats osteoporosis in postmenopausal women and men.",
    "dosage": "Consult your doctor first",
    "effects": "Bisphosphonate that inhibits bone resorption.",
    "sideEffects": "Gastrointestinal irritation, heartburn; rare jaw osteonecrosis (with long-term use)."
  },
  {
    "name": "Evista (Raloxifene)",
    "uses": "Prevents and treats osteoporosis in postmenopausal women.",
    "dosage": "Consult your doctor first",
    "effects": "Selective oestrogen receptor modulator that strengthens bone.",
    "sideEffects": "Hot flashes, leg cramps; risk of blood clots."
  },
  {
    "name": "Genotropin (Somatropin)",
    "uses": "Human growth hormone for GH deficiency (children and adults).",
    "dosage": "Consult your doctor first",
    "effects": "Stimulates growth and metabolism (pituitary hormone).",
    "sideEffects": "Injection site pain, fluid retention; rare antibodies to GH."
  },
  {
    "name": "Pregnyl (hCG)",
    "uses": "Ovulation induction in fertility treatment; cryptorchidism in boys.",
    "dosage": "Consult your doctor first",
    "effects": "Mimics LH surge to trigger ovulation or testicular descent.",
    "sideEffects": "Ovarian hyperstimulation, injection site reactions; headache."
  },
  {
    "name": "Betnovate (Betamethasone)",
    "uses": "Potent corticosteroid cream/ointment for inflammatory skin conditions (eczema, psoriasis).",
    "dosage": "Consult your doctor first",
    "effects": "Anti-inflammatory steroid that suppresses skin immune response.",
    "sideEffects": "Skin thinning with prolonged use, stretch marks; burning sensation on application."
  },
  {
    "name": "Locoid (Hydrocortisone)",
    "uses": "Mild steroid cream for eczema, dermatitis, and insect bite relief.",
    "dosage": "Consult your doctor first",
    "effects": "Low-potency corticosteroid for anti-inflammatory effect on skin.",
    "sideEffects": "Minimal (at recommended use); potential thinning if overused."
  },
  {
    "name": "Dermovate (Clobetasol)",
    "uses": "Very potent steroid for severe psoriasis or eczema (short term).",
    "dosage": "Consult your doctor first",
    "effects": "Very strong anti-inflammatory steroid to reduce severe inflammation.",
    "sideEffects": "Thinning of skin, burning sensation; adrenal suppression if overused."
  },
  {
    "name": "Protopic (Tacrolimus)",
    "uses": "Calcineurin inhibitor for eczema (atopic dermatitis) in sensitive areas.",
    "dosage": "Consult your doctor first",
    "effects": "Suppresses local immune response (no steroid) to reduce rash.",
    "sideEffects": "Burning or itching at application site; slight risk of skin infections."
  },
  {
    "name": "Elidel (Pimecrolimus)",
    "uses": "Calcineurin inhibitor for mild to moderate atopic dermatitis (eczema).",
    "dosage": "Consult your doctor first",
    "effects": "Similar to tacrolimus; reduces inflammation without steroids.",
    "sideEffects": "Skin burning, headache; may cause slight rash at application."
  },
  {
    "name": "Differin (Adapalene)",
    "uses": "Topical retinoid for acne (comedonal acne).",
    "dosage": "Consult your doctor first",
    "effects": "Modulates skin cell turnover to prevent acne lesions.",
    "sideEffects": "Skin dryness, irritation, photosensitivity; redness."
  },
  {
    "name": "Kleris (Calcipotriol + Betamethasone)",
    "uses": "Combination lotion for psoriasis plaques.",
    "dosage": "Consult your doctor first",
    "effects": "Calcipotriol (vitamin D analog) plus steroid to normalize skin cell growth.",
    "sideEffects": "Mild irritation, itching; skin thinning from steroid component."
  },
  {
    "name": "Isotrex (Isotretinoin)",
    "uses": "Oral vitamin A derivative for severe cystic acne (under specialist care).",
    "dosage": "Consult your doctor first",
    "effects": "Reduces oil gland size and inflammation, preventing acne formation.",
    "sideEffects": "Dry skin, chapped lips; birth defects if taken in pregnancy."
  },
  {
    "name": "Nizoral (Ketoconazole)",
    "uses": "Antifungal shampoo/cream for dandruff and fungal skin infections.",
    "dosage": "Consult your doctor first",
    "effects": "Antifungal that disrupts cell membranes of yeast (fungus).",
    "sideEffects": "Skin irritation, itching; rarely, hair texture change."
  },
  {
    "name": "Canesten (Clotrimazole)",
    "uses": "Antifungal cream for yeast infections (skin folds, jock itch, ringworm).",
    "dosage": "Consult your doctor first",
    "effects": "Antifungal that inhibits fungal growth by disrupting cell membranes.",
    "sideEffects": "Local irritation or rash at application site."
  },
  {
    "name": "Loprox (Ciclopirox)",
    "uses": "Treats fungal infections of the skin and nails (e.g., athlete's foot, ringworm).",
    "dosage": "Consult your doctor first",
    "effects": "Chelates metal ions to inhibit fungal enzymes and disrupt cell membrane synthesis.",
    "sideEffects": "Mild burning, redness, or itching at application site."
  },
  {
    "name": "Mupimet (Mupirocin)",
    "uses": "Treats bacterial skin infections (e.g., impetigo, folliculitis, minor cuts).",
    "dosage": "Consult your doctor first",
    "effects": "Topical antibiotic that inhibits bacterial protein synthesis by binding to isoleucyl t-RNA synthetase.",
    "sideEffects": "Local burning, stinging, or pain at application site."
  },
  {
    "name": "Sporanox (Itraconazole)",
    "uses": "Treats systemic and superficial fungal infections (e.g., blastomycosis, histoplasmosis, nail infections).",
    "dosage": "Consult your doctor first",
    "effects": "Inhibits fungal cytochrome P450-dependent enzyme lanosterol 14-alpha-demethylase, blocking ergosterol synthesis.",
    "sideEffects": "Nausea, diarrhoea, headache, abdominal pain."
  },
  {
    "name": "Diflucan (Fluconazole)",
    "uses": "Treats vaginal, oral, and oesophageal yeast infections, and fungal meningitis.",
    "dosage": "Consult your doctor first",
    "effects": "Triazole antifungal that selectively inhibits fungal sterol synthesis, disrupting membranes.",
    "sideEffects": "Headache, rash, stomach pain, dizziness."
  },
  {
    "name": "Fungisome (Amphotericin B)",
    "uses": "Treats severe, life-threatening systemic fungal infections and visceral leishmaniasis.",
    "dosage": "Consult your doctor first",
    "effects": "Polyene antifungal that binds to ergosterol in fungal cell membranes, creating pores and causing leakage.",
    "sideEffects": "Fever, chills, low blood pressure, kidney impairment, nausea."
  },
  {
    "name": "Grisovin (Griseofulvin)",
    "uses": "Treats fungal infections of the skin, hair, and nails (ringworm) when topical treatment is ineffective.",
    "dosage": "Consult your doctor first",
    "effects": "Binds to microtubular proteins, disrupting fungal mitotic spindle and inhibiting mitosis.",
    "sideEffects": "Headache, fatigue, dizziness, hives, sensitivity to light."
  },
  {
    "name": "Vfend (Voriconazole)",
    "uses": "Treats serious invasive fungal infections (e.g., invasive aspergillosis, serious Candida infections).",
    "dosage": "Consult your doctor first",
    "effects": "Inhibits fungal lanosterol 14-alpha-demethylase, disrupting cell membrane integrity.",
    "sideEffects": "Visual disturbances, fever, rash, vomiting, elevated liver enzymes."
  },
  {
    "name": "Terbinaforce (Terbinafine)",
    "uses": "Treats fungal nail infections and tinea infections of the skin (e.g., athlete's foot, jock itch).",
    "dosage": "Consult your doctor first",
    "effects": "Allylamine antifungal that inhibits squalene epoxidase, blocking ergosterol synthesis and causing squalene accumulation.",
    "sideEffects": "Headache, diarrhoea, indigestion, rash, taste disturbance."
  },
  {
    "name": "Abzorb (Clotrimazole powder)",
    "uses": "Prevents and treats fungal skin infections, reducing sweat irritation and itching.",
    "dosage": "Consult your doctor first",
    "effects": "Broad-spectrum imidazole antifungal that alters cell membrane permeability of fungi.",
    "sideEffects": "Local skin irritation, itching, dryness."
  },
  {
    "name": "Mycamine (Micafungin)",
    "uses": "Treats and prevents Candida infections (oesophageal candidiasis, stem cell transplant prophylaxis).",
    "dosage": "Consult your doctor first",
    "effects": "Echinocandin antifungal that inhibits the synthesis of beta-1,3-D-glucan, an essential component of fungal cell walls.",
    "sideEffects": "Nausea, headache, vomiting, fever, liver function abnormalities."
  },
  {
    "name": "Zovirax (Acyclovir)",
    "uses": "Treats herpes simplex virus (cold sores, genital herpes) and varicella-zoster (shingles, chickenpox).",
    "dosage": "Consult your doctor first",
    "effects": "DNA polymerase inhibitor that selectively terminates viral DNA chain elongation.",
    "sideEffects": "Headache, nausea, diarrhoea, malaise."
  },
  {
    "name": "Valtrex (Valacyclovir)",
    "uses": "Treats herpes zoster (shingles), genital herpes, and cold sores in children and adults.",
    "dosage": "Consult your doctor first",
    "effects": "Prodrug of acyclovir with better bioavailability; converted to acyclovir to inhibit viral DNA synthesis.",
    "sideEffects": "Headache, nausea, abdominal pain, dizziness."
  },
  {
    "name": "Tamiflu (Oseltamivir)",
    "uses": "Prevents and treats influenza A and B (flu) infections.",
    "dosage": "Consult your doctor first",
    "effects": "Neuraminidase inhibitor that prevents release of new virus particles from infected cells.",
    "sideEffects": "Nausea, vomiting, headache, pain."
  },
  {
    "name": "Hepcinat (Sofosbuvir)",
    "uses": "Chronic hepatitis C virus (HCV) infection in combination with other agents.",
    "dosage": "Consult your doctor first",
    "effects": "Nucleotide analogue NS5B polymerase inhibitor that blocks HCV replication.",
    "sideEffects": "Fatigue, headache, nausea, insomnia."
  },
  {
    "name": "Dynavir (Tenofovir)",
    "uses": "Treats chronic hepatitis B virus (HBV) and manages HIV-1 infection (with other antiretrovirals).",
    "dosage": "Consult your doctor first",
    "effects": "Nucleotide reverse transcriptase inhibitor (NRTI) that blocks viral replication.",
    "sideEffects": "Nausea, diarrhoea, fatigue, renal impairment, bone density decrease."
  },
  {
    "name": "Entavir (Entecavir)",
    "uses": "Treats chronic hepatitis B virus (HBV) infection with active viral replication.",
    "dosage": "Consult your doctor first",
    "effects": "Guanosine nucleoside analogue that inhibits HBV polymerase.",
    "sideEffects": "Headache, fatigue, dizziness, nausea."
  },
  {
    "name": "Retrovir (Zidovudine)",
    "uses": "Prevents mother-to-child transmission of HIV; treats HIV-1 infection in combination.",
    "dosage": "Consult your doctor first",
    "effects": "Nucleoside reverse transcriptase inhibitor (NRTI) that halts viral DNA chain assembly.",
    "sideEffects": "Anaemia, neutropenia, headache, nausea, insomnia."
  },
  {
    "name": "Isentress (Raltegravir)",
    "uses": "Treats HIV-1 infection in combination with other antiretroviral agents.",
    "dosage": "Consult your doctor first",
    "effects": "Integrase strand transfer inhibitor (INSTI) that prevents HIV DNA integration into host genome.",
    "sideEffects": "Insomnia, headache, nausea, fatigue, muscle weakness."
  },
  {
    "name": "Daklinza (Daclatasvir)",
    "uses": "Chronic hepatitis C virus (HCV) infection in combination with sofosbuvir.",
    "dosage": "Consult your doctor first",
    "effects": "NS5A inhibitor that blocks viral RNA replication and virion assembly.",
    "sideEffects": "Headache, fatigue, nausea, diarrhoea."
  },
  {
    "name": "Viraday (Efavirenz + Emtricitabine + Tenofovir)",
    "uses": "Complete single-tablet regimen for treating HIV-1 infection in adults.",
    "dosage": "Consult your doctor first",
    "effects": "Combines non-nucleoside reverse transcriptase inhibitor (NNRTI) and NRTIs to suppress viral load.",
    "sideEffects": "Dizziness, vivid dreams, rash, fatigue, headache."
  },
  {
    "name": "Limcee (Vitamin C)",
    "uses": "Treats and prevents scurvy, boosts immunity, and promotes wound healing and iron absorption.",
    "dosage": "Consult your doctor first",
    "effects": "Antioxidant that plays an essential role in collagen synthesis and tissue repair.",
    "sideEffects": "Heartburn, stomach cramps, nausea, or diarrhoea (at high doses)."
  },
  {
    "name": "Shelcal (Calcium + Vitamin D3)",
    "uses": "Prevents and treats calcium deficiency, osteoporosis, osteomalacia, and pregnancy calcium needs.",
    "dosage": "Consult your doctor first",
    "effects": "Calcium carbonate provides elemental calcium for bones; Vitamin D3 enhances calcium absorption.",
    "sideEffects": "Constipation, gas, bloating, or hypercalcemia (excess calcium)."
  },
  {
    "name": "Neurobion Forte (Vitamin B-complex)",
    "uses": "Treats vitamin B deficiencies, diabetic neuropathy, neuritis, and improves nerve health.",
    "dosage": "Consult your doctor first",
    "effects": "Combines Vitamins B1, B2, B3, B5, B6, and B12 to support nerve function and cell metabolism.",
    "sideEffects": "Mild diarrhoea, excessive urination, or skin itching (rare)."
  },
  {
    "name": "Autrin (Iron + Folic acid)",
    "uses": "Treats iron deficiency anaemia, nutritional anaemia, and supports red blood cell production.",
    "dosage": "Consult your doctor first",
    "effects": "Provides ferrous fumarate for iron replenishment and folic acid for DNA synthesis in red blood cells.",
    "sideEffects": "Dark stools, constipation, nausea, or stomach upset."
  },
  {
    "name": "Becosules (Vitamin B-complex + Vitamin C)",
    "uses": "Relieves mouth ulcers, physical fatigue, and supports skin and hair health during illness.",
    "dosage": "Consult your doctor first",
    "effects": "Replaces water-soluble vitamins lost during stress or infection, acting as co-factors for enzymes.",
    "sideEffects": "Bright yellow urine (due to riboflavin), mild stomach upset."
  },
  {
    "name": "Evion 400 (Vitamin E)",
    "uses": "Nourishes skin and hair, reduces muscle cramps, and acts as an antioxidant supplement.",
    "dosage": "Consult your doctor first",
    "effects": "Lipid-soluble antioxidant that protects cell membranes from oxidative damage.",
    "sideEffects": "Nausea, fatigue, headache, or blurred vision (rare)."
  },
  {
    "name": "Tayo (Vitamin D3)",
    "uses": "Treats severe Vitamin D deficiency, supports bone density, and enhances immune function.",
    "dosage": "Consult your doctor first",
    "effects": "Cholecalciferol (Vitamin D3) regulates calcium and phosphorus homeostasis in the body.",
    "sideEffects": "Weakness, metallic taste, nausea, or kidney stones (if overdosed)."
  },
  {
    "name": "Zincovit (Multivitamins + Minerals + Zinc)",
    "uses": "Nutritional supplement for recovery after illness, boosting immunity, and daily wellness.",
    "dosage": "Consult your doctor first",
    "effects": "Provides essential vitamins, trace minerals, and zinc to support overall metabolism and immune response.",
    "sideEffects": "Stomach irritation, metallic taste, or nausea."
  },
  {
    "name": "Revital H (Ginseng + Multivitamins)",
    "uses": "Reduces physical exhaustion, improves mental alertness, and maintains energy levels.",
    "dosage": "Consult your doctor first",
    "effects": "Ginseng extract acts as an adaptogen; multivitamins and minerals replenish daily nutritional requirements.",
    "sideEffects": "Insomnia, headache, stomach upset."
  },
  {
    "name": "Orofer XT (Iron + Folic Acid)",
    "uses": "Treats iron deficiency anaemia, especially during pregnancy and lactation.",
    "dosage": "Consult your doctor first",
    "effects": "Ferrous ascorbate provides highly bioavailable iron, while folic acid supports neural tube development.",
    "sideEffects": "Constipation, diarrhoea, dark stools, or abdominal discomfort."
  }
];

// Support both ES module and global script loading
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MEDICINE_DICTIONARY };
} else if (typeof exports !== 'undefined') {
  exports.MEDICINE_DICTIONARY = MEDICINE_DICTIONARY;
}
