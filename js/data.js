/* Bulamu Hospital Masaka - shared data
   TODO: all department/doctor/news content below is realistic placeholder copy —
   replace with verified details from Bulamu Hospital before launch. */
window.BULAMU_DATA = {
  DEPARTMENTS: [
    {id:'emergency',name:'Emergency & Trauma',tag:'Open 24/7',icon:'fa-truck-medical',
      desc:'Masaka sits on the busy Kampala–Mbarara highway, and our Emergency Unit is built for it. With resuscitation bays, a dedicated trauma team and direct access to theatre, we stabilise and treat everything from road accidents to severe malaria — day and night.',
      services:['24/7 triage & resuscitation','Road traffic accident & trauma care','Ambulance across Greater Masaka','Short-stay observation ward','Snakebite & poisoning protocols'],
      hours:'Open 24 hours, every day',lead:'Dr. Joan Nakalembe',loc:'Ground floor · Casualty wing'},
    {id:'medicine',name:'General Medicine & OPD',tag:'Walk-in',icon:'fa-stethoscope',
      desc:'From malaria and typhoid to diabetes and hypertension, our physicians handle the full range of adult medical conditions — with chronic disease clinics every weekday morning.',
      services:['Adult outpatient consultations','Diabetes & hypertension clinic','HIV care & adherence support','Chronic cough & TB screening','Nutrition counselling'],
      hours:'Mon–Sat · 8:00 AM – 8:00 PM',lead:'Dr. Sarah Nabukenya',loc:'First floor · Outpatient block'},
    {id:'surgery',name:'Surgery',tag:'Theatre & day-care',icon:'fa-user-doctor',
      desc:'Modern theatres and a surgical team skilled in everything from appendicectomy to hernia repair — with day-care procedures so you can sleep at home the same night.',
      services:['General & abdominal surgery','Day-care minor procedures','Hernia & lump excisions','Post-operative follow-up clinic','Elective surgery bookings'],
      hours:'Elective Mon–Sat · Emergency 24/7',lead:'Dr. Emmanuel Wasswa',loc:'Theatre suite · East wing'},
    {id:'paediatrics',name:'Paediatrics & Immunisation',tag:'Children first',icon:'fa-baby',
      desc:'Children are not small adults. Our paediatric team runs a dedicated children’s ward, newborn care, and evening immunisation clinics that fit around working parents.',
      services:['General paediatric outpatients','Newborn & premature baby care','Immunisation (EPI schedule)','Growth & nutrition clinic','Paediatric emergency cover'],
      hours:'Mon–Sat · 8:00 AM – 8:00 PM',lead:'Dr. Peter Kiggundu',loc:'First floor · Children’s wing'},
    {id:'maternity',name:'Maternity & Gynaecology',tag:'Deliveries 24/7',icon:'fa-person-pregnant',
      desc:'From the first antenatal visit to the first cry, we walk with mothers the whole way — safe deliveries, honest advice and private maternity rooms with a companion bed.',
      services:['Antenatal & postnatal clinics','Normal deliveries & C-sections','Family planning services','Cervical cancer screening','Ultrasound for expectant mothers'],
      hours:'Clinics Mon–Sat · Deliveries 24/7',lead:'Dr. Grace Nabbosa',loc:'Maternity wing · West block'},
    {id:'ortho',name:'Orthopaedics & Physiotherapy',tag:'Rehab included',icon:'fa-bone',
      desc:'Bones, joints and everything that moves them. Fracture care, joint injections and a physiotherapy programme to get you walking again — stronger than before.',
      services:['Fracture & plaster clinic','Joint injections & aspirations','Physiotherapy & rehabilitation','Sports injury assessment','Walk-in X-ray & splinting'],
      hours:'Mon–Sat · 9:00 AM – 6:00 PM',lead:'Dr. Robert Muwanga',loc:'Ground floor · West wing'},
    {id:'imaging',name:'Laboratory & Imaging',tag:'Same-day results',icon:'fa-microscope',
      desc:'Answers, the same day. A fully equipped laboratory plus digital X-ray and ultrasound in our imaging suite — with results sent to your phone by SMS.',
      services:['Full haematology & chemistry','Microbiology & cultures','Digital X-ray','Obstetric & general ultrasound','Same-day results by SMS'],
      hours:'Mon–Sat · 7:30 AM – 9:00 PM',lead:'Dr. Aisha Namale',loc:'First floor · Diagnostics centre'},
    {id:'dental',name:'Dental Clinic',tag:'Walk-in',icon:'fa-tooth',
      desc:'Comprehensive dental care in a modern surgery — from routine cleanings and fillings to extractions and dentures, with gentle children’s appointments on Saturday mornings.',
      services:['Check-ups & scaling','Fillings & extractions','Dentures & crowns','Teeth cleaning & polishing','Children’s dental clinic'],
      hours:'Mon–Sat · 8:30 AM – 6:00 PM',lead:'Dr. Daniel Lubega',loc:'Ground floor · Outpatient block'}
  ],
  DOCTORS: [
    {name:'Dr. Sarah Nabukenya',role:'Chief Medical Officer · Internal Medicine',cat:'med',dept:'medicine',days:'Mon – Fri',seed:'buladoc1'},
    {name:'Dr. Emmanuel Wasswa',role:'General & Emergency Surgery',cat:'surg',dept:'surgery',days:'Mon – Thu',seed:'buladoc2'},
    {name:'Dr. Grace Nabbosa',role:'Obstetrics & Gynaecology',cat:'wc',dept:'maternity',days:'Tue – Sat',seed:'buladoc3'},
    {name:'Dr. Peter Kiggundu',role:'Paediatrics & Child Health',cat:'wc',dept:'paediatrics',days:'Mon – Sat',seed:'buladoc4'},
    {name:'Dr. Aisha Namale',role:'Radiology & Medical Imaging',cat:'med',dept:'imaging',days:'Mon – Fri',seed:'buladoc5'},
    {name:'Dr. Robert Muwanga',role:'Orthopaedics & Physiotherapy',cat:'surg',dept:'ortho',days:'Wed – Sun',seed:'buladoc6'},
    {name:'Dr. Joan Nakalembe',role:'Emergency Medicine',cat:'em',dept:'emergency',days:'Rotational shifts',seed:'buladoc7'},
    {name:'Dr. Daniel Lubega',role:'Dental Surgery',cat:'surg',dept:'dental',days:'Mon – Sat',seed:'buladoc8'},
    {name:'Dr. Henry Ssenyonga',role:'General Medicine · Chronic Disease Clinic',cat:'med',dept:'medicine',days:'Mon – Sat',seed:'buladoc9'}
  ],
  ARTICLES: [
    {tag:'Announcement',date:'12 June 2025',title:'Our new digital X-ray & ultrasound suite is open',seed:'bula-news1',
      lead:'Sharper imaging with same-day reports — and expectant mothers can now have their scans without leaving the hospital.',
      body:['After months of installation and testing, our upgraded imaging suite is fully operational on the first floor. The new digital X-ray unit and modern ultrasound machine produce significantly sharper images, helping our clinicians reach a diagnosis faster.','Walk-in patients are welcome for routine imaging, and results are ready the same day in most cases. Every scan is reviewed by our radiographer and partnering radiologist each weekday.','To celebrate the launch, antenatal ultrasound scans are discounted by 20% for the month of June — no appointment needed between 9 AM and 4 PM.']},
    {tag:'Community',date:'28 May 2025',title:'Free blood pressure & diabetes screening at Masaka main market',seed:'bula-news2',
      lead:'One in three Ugandan adults lives with high blood pressure — often without knowing. Get checked for free.',
      body:['High blood pressure and diabetes quietly affect one in three Ugandan adults — often without any symptoms at all. On Saturday 28 June, from 8 AM to 2 PM, our outreach team will offer free blood pressure, blood sugar and BMI screening at the main market grounds.','No registration is needed. Every participant receives a personal risk profile and, where needed, a follow-up appointment at the hospital. The first 200 participants also receive a free doctor’s consultation.','Bring a friend, a parent or a boda rider you know. The earlier we find it, the easier it is to treat.']},
    {tag:'Milestone',date:'9 May 2025',title:'Bulamu Hospital accredited for nursing internship training',seed:'bula-news3',
      lead:'Official recognition by the Uganda Nurses and Midwives Council — and fresh energy on our wards.',
      body:['We are proud to announce that Bulamu Hospital has been accredited by the Uganda Nurses and Midwives Council as an internship training centre, recognising the standard of mentorship on our wards and maternity unit.','The accreditation means newly qualified nurses and midwives will complete part of their training here, mentored by our senior nursing team — strengthening care and bringing fresh energy to the hospital.','The first cohort of interns joins us this July. Watch this space.']},
    {tag:'Outreach',date:'21 April 2025',title:'Mobile clinic reaches 1,200 residents in Rakai and Lwengo',seed:'bula-news4',
      lead:'Immunisation, antenatal checks and referrals brought to the village — the first of four outreach camps this year.',
      body:['Our mobile clinic team spent three days in Rakai and Lwengo districts, reaching more than 1,200 residents with free immunisation, antenatal checks, deworming and health education.','Thirty-two patients who needed further care were referred to the hospital and have already been seen by our doctors. Transport was arranged for those who could not travel.','The outreach programme runs four times a year, funded in part by the hospital’s community fund. Next stop: Bukomansimbi in September.']}
  ],
  GALLERY: [
    {seed:'bulamu-g1',w:600,h:800,cap:'Main entrance & gardens'},
    {seed:'bulamu-g2',w:600,h:440,cap:'Reception and triage desk'},
    {seed:'bulamu-g3',w:600,h:720,cap:'Operating theatre'},
    {seed:'bulamu-g4',w:600,h:520,cap:'Private maternity room'},
    {seed:'bulamu-g5',w:600,h:820,cap:'Laboratory bench work'},
    {seed:'bulamu-g6',w:600,h:460,cap:'Children’s ward'},
    {seed:'bulamu-g7',w:600,h:700,cap:'Pharmacy counter'},
    {seed:'bulamu-g8',w:600,h:560,cap:'Ambulance on standby'}
  ]
};