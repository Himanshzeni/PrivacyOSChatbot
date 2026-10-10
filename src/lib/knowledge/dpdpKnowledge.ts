export interface LegalKnowledgeItem {
  section: string;
  topic: string;
  topicHindi?: string;
  topicHinglish?: string;
  citation: string;
  summary: string;
  summaryHindi?: string;
  summaryHinglish?: string;
  keywords: string[];
  keywordsHindi?: string[];
  keywordsHinglish?: string[];
}

/**
 * Official Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023)
 * & The Digital Personal Data Protection Rules, 2025 (G.S.R. 846(E) dated 13 November 2025)
 * Published in The Gazette of India (Extraordinary, Part II, Section 3, Sub-section (i))
 * Source Document: "Government DPDP/Govt. DPDP.pdf" (Trilingual Representation: English, हिन्दी, Hinglish)
 */
export const APPROVED_DPDP_KNOWLEDGE: LegalKnowledgeItem[] = [
  // 1. Act Overview & Preamble
  {
    section: "Act Overview & Preamble",
    topic: "Enactment, Objective & Legislative Authority",
    topicHindi: "अधिनियम का उद्देश्य, प्रस्तावना और विधायी अधिकार",
    topicHinglish: "DPDP Act ka Overview, Purpose aur Legislative Authority",
    citation: "Source: The Gazette of India, Extraordinary, Part II, Sec. 1 (Act No. 22 of 2023, 11 August 2023)",
    summary:
      "The Digital Personal Data Protection Act, 2023 was enacted by the Parliament of India and received Presidential assent on 11 August 2023. The Act provides for the processing of digital personal data in a manner that recognises both the right of individuals to protect their personal data and the need to process such personal data for lawful purposes.",
    summaryHindi:
      "डिजिटल वैयक्तिक डेटा संरक्षण अधिनियम, 2023 (DPDP Act) भारत की संसद द्वारा पारित और 11 अगस्त 2023 को राष्ट्रपति की स्वीकृति प्राप्त अधिनियम है। इसका उद्देश्य नागरिकों के व्यक्तिगत डेटा की सुरक्षा के अधिकार को मान्यता देना और साथ ही वैधानिक उद्देश्यों के लिए डेटा के प्रसंस्करण को विनियमित करना है।",
    summaryHinglish:
      "Digital Personal Data Protection Act 2023 (DPDP Act) Indian Parliament dwara pass kiya gaya statutory law hai jise 11 August 2023 ko Presidential assent mila. Iska main objective individuals ke digital personal data ko protect karna aur business/state ke lawful processing needs ko balance karna hai.",
    keywords: ["act", "gazette", "preamble", "dpdp", "dpdpa", "parliament", "assent", "law", "meity", "act 22 of 2023"],
    keywordsHindi: ["अधिनियम", "राजपत्र", "प्रस्तावना", "डीपीडीपी", "संसद", "कानून", "उद्देश्य"],
    keywordsHinglish: ["dpdp act kya hai", "dpdp overview", "dpdp law", "parliament assent", "kanoon"],
  },

  // 2. Section 2 & Rule 2: Statutory Definitions
  {
    section: "Section 2 & Rule 2",
    topic: "Statutory Definitions (Data Fiduciary, Principal, Processor, Child, Consent Manager)",
    topicHindi: "वैधानिक परिभाषाएँ (डेटा फिड्यूशरी, डेटा प्रिंसिपल, डेटा प्रोसेसर, बालक, सहमति प्रबंधक)",
    topicHinglish: "Statutory Definitions (Data Fiduciary, Data Principal, Child, Consent Manager)",
    citation: "Source: DPDP Act 2023 Section 2 & DPDP Rules 2025 Rule 2 (Gazette Notification G.S.R. 846(E))",
    summary:
      "Key definitions: 1) 'Data Principal' means the individual to whom personal data relates (and in case of a child, includes parents/lawful guardian). 2) 'Data Fiduciary' means any entity/person who determines the purpose and means of processing personal data. 3) 'Data Processor' processes on behalf of a Fiduciary. 4) 'Child' means an individual who has not completed 18 years of age. 5) 'Consent Manager' is a company registered with the Board acting as single point of contact to give, manage, review, and withdraw consent.",
    summaryHindi:
      "प्रमुख परिभाषाएँ: 1) 'डेटा प्रिंसिपल' वह व्यक्ति है जिससे व्यक्तिगत डेटा संबंधित है (बालक के मामले में माता-पिता/अभिभावक)। 2) 'डेटा फिड्यूशरी' वह व्यक्ति या संस्था है जो डेटा प्रसंस्करण के उद्देश्य और साधन तय करती है। 3) 'डेटा प्रोसेसर' वह है जो फिड्यूशरी की ओर से डेटा प्रोसेस करता है। 4) 'बालक' 18 वर्ष से कम आयु का व्यक्ति है। 5) 'सहमति प्रबंधक' बोर्ड के साथ पंजीकृत संस्था है जो सहमति देने, प्रबंधित करने और वापस लेने का एकल मंच प्रदान करती है।",
    summaryHinglish:
      "Key definitions: 1) Data Principal: Wo individual jiska data process ho raha hai (baccho ke case me parents). 2) Data Fiduciary: Wo organization/entity jo data processing ka purpose aur tareeqa decide karti hai. 3) Data Processor: Jo Fiduciary ke behalf par data process kare. 4) Child: 18 saal se kam aayu ka vyakti. 5) Consent Manager: Board ke sath registered interoperable company jo consent manage/withdraw karne ka single point deti hai.",
    keywords: ["definitions", "data fiduciary", "data principal", "data processor", "consent manager", "child", "minor", "personal data", "processing"],
    keywordsHindi: ["परिभाषाएँ", "डेटा फिड्यूशरी", "डेटा प्रिंसिपल", "डेटा प्रोसेसर", "सहमति प्रबंधक", "बालक", "बच्चा", "व्यक्तिगत डेटा"],
    keywordsHinglish: ["data fiduciary kya hai", "data principal kya hota hai", "consent manager kya hai", "child definition"],
  },

  // 3. Section 3: Scope and Applicability
  {
    section: "Section 3",
    topic: "Application and Territorial Scope of the Act",
    topicHindi: "अधिनियम का विस्तार, क्षेत्राधिकार और प्रयोज्यता",
    topicHinglish: "Act ka Scope, Jurisdiction aur Kahan Kahan Apply Hota Hai",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 3, Gazette of India)",
    summary:
      "The Act applies to digital personal data collected within India in digital form or digitized subsequently. It applies extraterritorially outside India if processing is in connection with offering goods or services to Data Principals within India. It does NOT apply to non-digital data, personal data processed for personal or domestic purposes, or publicly available personal data made public by the Data Principal.",
    summaryHindi:
      "यह अधिनियम भारत के भीतर डिजिटल रूप में या बाद में डिजिटाइज़ किए गए व्यक्तिगत डेटा पर लागू होता है। यदि भारत के बाहर कोई संस्था भारतीय नागरिकों को वस्तुएँ या सेवाएँ प्रदान करती है, तो उस पर भी यह कानून लागू होता है। यह व्यक्तिगत या घरेलू उपयोग के डेटा तथा सार्वजनिक रूप से उपलब्ध कराए गए डेटा पर लागू नहीं होता।",
    summaryHinglish:
      "Yeh Act India me collect hone wale digital personal data par apply hota hai. Agar koi foreign company India se bahar baith kar bhi Indian residents ko goods ya services offer karti hai, toh extraterritorial scope ke tehat uspar bhi yeh rule lagta hai. Non-digital offline data aur personal/domestic use ke data par yeh law apply nahi hota.",
    keywords: ["scope", "applicability", "extraterritorial", "territorial", "domestic", "outside india", "jurisdiction"],
    keywordsHindi: ["क्षेत्राधिकार", "लागू", "भारत के बाहर", "विस्तार", "घरेलू उद्देश्य", "प्रयोज्यता"],
    keywordsHinglish: ["kahan apply hota hai", "foreign companies par apply hota hai", "extraterritorial scope"],
  },

  // 4. Section 5 & Rule 3: Notice Requirements
  {
    section: "Section 5 & Rule 3",
    topic: "Mandatory Itemised Notice & Multi-Language Requirements",
    topicHindi: "डेटा प्रिंसिपल को अनिवार्य मदवार नोटिस और 22 भाषाओं का विकल्प",
    topicHinglish: "Itemised Notice aur 22 Languages me Notice Dene Ka Rule",
    citation: "Source: DPDP Act Section 5 & DPDP Rules 2025 Rule 3 (Gazette Notification G.S.R. 846(E))",
    summary:
      "Before seeking consent, a Data Fiduciary must give an itemised, clear notice informing: 1) What personal data is collected and specific purpose of processing, 2) How Data Principals can exercise rights (access, erasure, nomination) under Rule 14, 3) Grievance officer contact details. Under Section 5(3), the notice must be available in English or in any of the 22 languages specified in the Eighth Schedule of the Constitution of India.",
    summaryHindi:
      "सहमति लेने से पहले या उस समय, डेटा फिड्यूशरी को स्पष्ट और मदवार (itemised) नोटिस देना अनिवार्य है। इसमें डेटा संग्रह का उद्देश्य, डेटा प्रिंसिपल के अधिकार (सुधार, मिटाना) का उपयोग करने का तरीका, और शिकायत अधिकारी का विवरण होना चाहिए। यह नोटिस अंग्रेजी अथवा भारतीय संविधान की 8वीं अनुसूची में उल्लिखित 22 भाषाओं में से किसी भी भाषा में उपलब्ध कराया जाना चाहिए।",
    summaryHinglish:
      "Consent maangne se pehle Data Fiduciary ko ek clear aur itemised notice dena mandatory hai. Isme data lene ka exact purpose, Data Principal ke rights (erasure, correction) use karne ka tareeqa, aur Grievance Officer ki contact details honi chahiye. Section 5(3) ke mutabiq yeh notice English ya Constitution ki 8th Schedule ki 22 official regional languages me available hona compulsory hai.",
    keywords: ["notice", "itemised", "rule 3", "section 5", "22 languages", "eighth schedule", "consent notice", "language"],
    keywordsHindi: ["नोटिस", "नियम 3", "धारा 5", "22 भाषाएं", "आठवीं अनुसूची", "मदवार नोटिस", "सूचना"],
    keywordsHinglish: ["notice rule 3", "itemised notice kya hai", "22 bhasha notice", "consent notice"],
  },

  // 5. Section 6: Consent Architecture & Withdrawal
  {
    section: "Section 6",
    topic: "Consent Architecture, Validity & Unconditional Withdrawal",
    topicHindi: "सहमति की संरचना, वैधता और वापसी (Withdrawal) का अधिकार",
    topicHinglish: "Consent Rules, Validity aur Unconditional Withdrawal ka Adhikar",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 6, Gazette of India)",
    summary:
      "Consent must be free, specific, informed, unconditional, and unambiguous with clear affirmative action. Any part of consent infringing the Act is void. The Data Principal has the absolute right to withdraw consent at any time, and the process of withdrawal must be as easy as giving consent. Once consent is withdrawn, the Fiduciary must cease processing and erase the personal data.",
    summaryHindi:
      "सहमति स्वतंत्र, विशिष्ट, सूचित, बिना शर्त और स्पष्ट सकारात्मक कार्य (clear affirmative action) के साथ होनी चाहिए। कानून का उल्लंघन करने वाली सहमति अमान्य होगी। डेटा प्रिंसिपल को किसी भी समय सहमति वापस लेने का पूर्ण अधिकार है, और सहमति वापस लेने की प्रक्रिया उतनी ही आसान होनी चाहिए जितनी सहमति देना था। सहमति वापस लेने पर डेटा मिटाना अनिवार्य है।",
    summaryHinglish:
      "Consent free, specific, informed, unconditional aur clear affirmative action ke sath honi chahiye. Kisi bhi forced ya bundled consent ko void maana jayega. Data Principal ke paas kisi bhi time consent unconditionally withdraw (revoke) karne ka complete right hai, aur consent withdraw karne ka tareeqa consent dene jitna hi aasan hona chahiye.",
    keywords: ["consent", "withdrawal", "affirmative", "free", "specific", "unconditional", "unambiguous", "opt-out", "revoke"],
    keywordsHindi: ["सहमति", "सहमति वापस लेना", "रद्द करना", "स्वतंत्र सहमति", "धारा 6"],
    keywordsHinglish: ["consent withdraw kaise karein", "consent rule", "sahmati wapas lena", "opt out"],
  },

  // 6. Section 7 & Rule 5: Legitimate Uses & State Subsidies
  {
    section: "Section 7 & Rule 5",
    topic: "Certain Legitimate Uses & State Processing for Subsidies",
    topicHindi: "कतिपय वैध उपयोग और राज्य द्वारा सब्सिडी व सेवाओं के लिए प्रसंस्करण",
    topicHinglish: "Legitimate Uses aur Govt Subsidies ke liye Data Processing",
    citation: "Source: DPDP Act Section 7 & DPDP Rules 2025 Rule 5 & Second Schedule (Gazette Notification G.S.R. 846(E))",
    summary:
      "A Data Fiduciary may process personal data without consent for specified legitimate uses: 1) Voluntary data provided for a specified purpose without objection, 2) Delivery of government subsidies, benefits, certificates, or licences, 3) Compliance with legal judgments or decrees under Indian law, 4) Medical emergency involving threat to life, 5) Epidemic, disaster, or breakdown of public order, 6) Employment purposes including safety and corporate benefits.",
    summaryHindi:
      "कतिपय वैध उपयोगों के लिए बिना स्पष्ट सहमति के डेटा प्रोसेस किया जा सकता है: 1) जब डेटा प्रिंसिपल ने स्वेच्छा से निर्दिष्ट उद्देश्य के लिए डेटा दिया हो, 2) सरकारी सब्सिडी, लाभ, प्रमाण पत्र या लाइसेंस जारी करने के लिए, 3) जीवन को खतरे वाली चिकित्सीय आपात स्थिति में, 4) महामारी या आपदा के समय, 5) रोजगार और कर्मचारी सुरक्षा के उद्देश्यों के लिए।",
    summaryHinglish:
      "Specified legitimate uses me bina separate consent ke data process kiya ja sakta hai: 1) Voluntary data jo user ne khud provide kiya ho, 2) Govt subsidies, benefits ya licenses deliver karne ke liye, 3) Court order ya legal compliance ke liye, 4) Medical emergency jisme life threat ho, 5) Epidemic ya disaster ke waqt, 6) Corporate employment benefits aur safety ke liye.",
    keywords: ["legitimate", "legitimate uses", "voluntary", "employment", "medical emergency", "subsidy", "disaster", "section 7", "rule 5"],
    keywordsHindi: ["वैध उपयोग", "सब्सिडी", "आपात स्थिति", "रोजगार", "धारा 7", "नियम 5"],
    keywordsHinglish: ["legitimate uses kya hain", "bina consent data process", "subsidy data", "emergency data"],
  },

  // 7. Section 8(5) & Rule 6: Reasonable Security Safeguards
  {
    section: "Section 8(5) & Rule 6",
    topic: "Reasonable Security Safeguards & Encryption Standards",
    topicHindi: "उचित सुरक्षा उपाय और तकनीकी व संगठनात्मक मानक",
    topicHinglish: "Reasonable Security Safeguards, Encryption aur IT Controls (Rule 6)",
    citation: "Source: DPDP Act Section 8(5) & DPDP Rules 2025 Rule 6 (Gazette Notification G.S.R. 846(E))",
    summary:
      "Under Section 8(5) and Rule 6, every Data Fiduciary must protect personal data by taking reasonable security safeguards to prevent personal data breach. This includes: 1) Appropriate technical and organizational measures such as encryption and pseudonymization, 2) Access controls and role-based access, 3) Periodic vulnerability assessments and audit logs, 4) Business continuity and disaster recovery plans. Failure to maintain reasonable security attracts fines up to ₹250 Crore.",
    summaryHindi:
      "धारा 8(5) और नियम 6 के तहत, प्रत्येक डेटा फिड्यूशरी को डेटा उल्लंघन रोकने के लिए उचित सुरक्षा उपाय करने होंगे। इसमें एन्क्रिप्शन (Encryption), एक्सेस कंट्रोल, ऑडिट लॉग्स, नियमित सुरक्षा ऑडिट और आपदा रिकवरी शामिल हैं। उचित सुरक्षा उपाय न करने पर अधिकतम ₹250 करोड़ तक का जुर्माना लगाया जा सकता है।",
    summaryHinglish:
      "Section 8(5) aur Rule 6 ke tehat Data Fiduciaries ko data breach prevent karne ke liye reasonable security safeguards maintain karna compulsory hai. Isme data encryption, strict access controls, audit logs, regular vulnerability testing aur disaster recovery plan shamil hain. Security me laparwahi par ₹250 CRORE tak ka bhaari jurmana lag sakta hai.",
    keywords: ["security", "safeguards", "encryption", "rule 6", "technical measures", "organizational measures", "section 8", "data protection"],
    keywordsHindi: ["सुरक्षा उपाय", "नियम 6", "एन्क्रिप्शन", "डेटा सुरक्षा", "तकनीकी उपाय"],
    keywordsHinglish: ["rule 6 kya hai", "security safeguards dpdp", "encryption mandatory", "data security rules"],
  },

  // 8. Section 8(6) & Rule 7: Intimation of Personal Data Breach
  {
    section: "Section 8(6) & Rule 7",
    topic: "Mandatory Intimation of Personal Data Breach (Timelines: Immediate & 72 Hours)",
    topicHindi: "व्यक्तिगत डेटा उल्लंघन की अनिवार्य सूचना (समय सीमा: तत्काल और 72 घंटे)",
    topicHinglish: "Data Breach Intimation Timeline: Immediate User Notice & 72 Hours to Board (Rule 7)",
    citation: "Source: DPDP Act Section 8(6) & DPDP Rules 2025 Rule 7 (Gazette Notification G.S.R. 846(E))",
    summary:
      "Rule 7 mandates two-tier notification on becoming aware of a personal data breach: 1) To affected Data Principals: Notify immediately without delay, describing the nature, extent, consequences, mitigation measures, safety actions, and contact info of response officer. 2) To the Data Protection Board of India: Notify without delay with initial details of nature, extent, location, and impact; followed by a comprehensive detailed report within 72 HOURS with reasons, findings, and preventive steps. Failure to report carries penalty up to ₹200 Crore.",
    summaryHindi:
      "नियम 7 के तहत डेटा उल्लंघन की जानकारी मिलने पर दोहरी सूचना देना अनिवार्य है: 1) प्रभावित डेटा प्रिंसिपल को बिना किसी देरी के स्पष्ट सूचना देना जिसमें उल्लंघन की प्रकृति, संभावित नुकसान, सुरक्षात्मक कदम और संपर्क अधिकारी का विवरण हो। 2) डेटा संरक्षण बोर्ड को बिना देरी के प्रारंभिक सूचना और 72 घंटों के भीतर विस्तृत व अद्यतन रिपोर्ट (कारण, शमन उपाय, रोकथाम) देना अनिवार्य है। सूचना न देने पर ₹200 करोड़ तक का जुर्माना हो सकता है।",
    summaryHinglish:
      "Rule 7 ke mutabiq data breach detect hone par 2-step intimation deni hoti hai: 1) Affected users (Data Principals) ko bina kisi deri ke breach ki nature, risk aur safety tips ki notice bhejni hoti hai. 2) Data Protection Board of India ko turant initial update aur 72 GHANTO (72 Hours) ke bheetar detailed investigation report (breach reasons, root-cause aur preventive steps) submit karni anivarya hai. Failure par ₹200 Crore tak fine lag sakta hai.",
    keywords: ["breach", "rule 7", "72 hours", "intimation", "data breach", "incident reporting", "board notification", "section 8(6)"],
    keywordsHindi: ["डेटा उल्लंघन", "नियम 7", "72 घंटे", "उल्लंघन की सूचना", "डेटा ब्रीच", "सूचना देना", "रिपोर्टिंग"],
    keywordsHinglish: ["rule 7 kya hai", "breach intimation rule", "72 hours breach report", "data breach hone par kya karein"],
  },

  // 9. Section 8(7) & Rule 8: Storage Limitation & Erasure
  {
    section: "Section 8(7) & Rule 8",
    topic: "Storage Limitation, Deemed Purpose Completion & Third Schedule Erasure",
    topicHindi: "डेटा प्रतिधारण सीमा, उद्देश्य समाप्ति और डेटा मिटाना (इरेज़र)",
    topicHinglish: "Storage Limitation, Deemed Purpose Completion aur Data Erasure (Rule 8)",
    citation: "Source: DPDP Act Section 8(7) & DPDP Rules 2025 Rule 8 & Third Schedule (Gazette Notification G.S.R. 846(E))",
    summary:
      "A Data Fiduciary must erase personal data upon purpose completion or when consent is withdrawn. Under Rule 8 and Third Schedule, specific classes of Fiduciaries (e.g. large e-commerce entities with over 2 crore registered users) have specified periods after which processing is deemed no longer serving the specified purpose (e.g. 3 years of user inactivity), mandating automated deletion unless retention is legally required.",
    summaryHindi:
      "धारा 8(7) और नियम 8 के तहत, जैसे ही प्रसंस्करण का उद्देश्य पूरा हो जाता है या सहमति वापस ली जाती है, फिड्यूशरी को डेटा मिटाना (Erase) अनिवार्य है। तीसरी अनुसूची के अनुसार, 2 करोड़ से अधिक उपयोगकर्ताओं वाली ई-कॉमर्स कंपनियों के लिए निष्क्रियता की समय सीमा (3 वर्ष) पूरी होने पर डेटा स्वतः मिटाना अनिवार्य किया गया है।",
    summaryHinglish:
      "Section 8(7) aur Rule 8 ke mutabiq purpose khatam hone par ya user dwara consent withdraw karne par data delete (erase) karna compulsory hai. Third Schedule ke mutabiq 2 crore se zyada users wale platforms par 3 saal ki inactivity ke baad purpose expired maan liya jata hai aur automated deletion mandatory ho jata hai.",
    keywords: ["erasure", "storage limitation", "rule 8", "third schedule", "retention", "delete data", "purpose completion"],
    keywordsHindi: ["डेटा मिटाना", "नियम 8", "इरेज़र", "प्रतिधारण", "तीसरी अनुसूची", "स्टोरेज सीमा"],
    keywordsHinglish: ["rule 8 kya hai", "data kab delete karna hota hai", "storage limitation", "erasure rule"],
  },

  // 10. Section 8(9) & Rule 9: DPO & Grievance Contact
  {
    section: "Section 8(9) & Rule 9",
    topic: "Contact Information of DPO / Grievance Officer",
    topicHindi: "डेटा संरक्षण अधिकारी / शिकायत अधिकारी का सार्वजनिक संपर्क विवरण",
    topicHinglish: "DPO aur Grievance Redressal Officer Contact Details Publish Karna (Rule 9)",
    citation: "Source: DPDP Act Section 8(9) & DPDP Rules 2025 Rule 9 (Gazette Notification G.S.R. 846(E))",
    summary:
      "Every Data Fiduciary must prominently publish on its website or mobile application the business contact information (name, designation, email address, postal address) of the Data Protection Officer (for SDFs) or Grievance Officer who is authorised to respond on behalf of the Fiduciary to queries and grievances of Data Principals.",
    summaryHindi:
      "प्रत्येक डेटा फिड्यूशरी को अपनी वेबसाइट या मोबाइल ऐप पर डेटा संरक्षण अधिकारी (DPO) या शिकायत अधिकारी का नाम, पद, ईमेल और पता प्रमुखता से प्रकाशित करना अनिवार्य है, ताकि डेटा प्रिंसिपल अपने प्रश्नों और शिकायतों के लिए सीधे संपर्क कर सकें।",
    summaryHinglish:
      "Har Data Fiduciary ko apni website aur mobile app par Data Protection Officer (DPO) ya Grievance Officer ka official name, designation, email aur postal address saaf taur par publish karna mandatory hai, taaki users apni complaints aur queries directly resolve karwa sakein.",
    keywords: ["dpo", "grievance officer", "rule 9", "contact information", "data protection officer", "section 8(9)"],
    keywordsHindi: ["डीपीओ", "शिकायत अधिकारी", "नियम 9", "संपर्क विवरण"],
    keywordsHinglish: ["rule 9 kya hai", "dpo details publish", "grievance officer contact", "dpo mandatory"],
  },

  // 11. Section 9 & Rule 10: Children's Data & Verifiable Parental Consent
  {
    section: "Section 9 & Rule 10",
    topic: "Verifiable Parental Consent for Children & Prohibition on Profiling",
    topicHindi: "बच्चों के डेटा हेतु सत्यापन योग्य माता-पिता की सहमति और ट्रैकिंग पर रोक",
    topicHinglish: "Children's Data: Verifiable Parental Consent aur Tracking par Ban (Rule 10)",
    citation: "Source: DPDP Act Section 9 & DPDP Rules 2025 Rule 10 & 12 (Gazette Notification G.S.R. 846(E))",
    summary:
      "Before processing personal data of a child (below 18 years), verifiable consent of the parent is mandatory. Under Rule 10, verification must use reliable identity and age details or virtual tokens issued via authorized entities/DigiLocker. Data Fiduciaries are strictly prohibited from: 1) Any processing harmful to child well-being, 2) Tracking or behavioural monitoring of children, 3) Targeted advertising directed at children. Penalties reach up to ₹200 Crore.",
    summaryHindi:
      "18 वर्ष से कम आयु के बच्चे का डेटा प्रोसेस करने से पहले माता-पिता की सत्यापन योग्य सहमति लेना अनिवार्य है। नियम 10 के अनुसार, यह सत्यापन डिजिलॉकर (DigiLocker) या अधिकृत पहचान माध्यमों द्वारा किया जा सकता है। बच्चों की ट्रैकिंग, व्यवहारिक निगरानी (behavioural monitoring) और लक्षित विज्ञापनों (targeted ads) पर पूर्ण प्रतिबंध है। उल्लंघन पर ₹200 करोड़ तक का जुर्माना है।",
    summaryHinglish:
      "DPDP Rules ke Rule 10 ke mutabiq 18 saal se kam aayu ke bacche ka data lene se pehle parents ki verifiable consent (DigiLocker ya authorized IDs se verified) lena compulsory hai. Baccho par behavioural tracking, profiling ya targeted advertising chalana 100% banned hai. Is rule ke violation par ₹200 CRORE tak penalty lag sakti hai.",
    keywords: ["children", "child", "parental consent", "rule 10", "digilocker", "tracking", "targeted advertising", "section 9", "minor"],
    keywordsHindi: ["बच्चे", "बालक", "नियम 10", "माता-पिता की सहमति", "डिजिलॉकर", "ट्रैकिंग", "धारा 9"],
    keywordsHinglish: ["rule 10 kya hai", "baccho ka data rule", "parental consent digilocker", "targeted ads on children ban"],
  },

  // 12. Section 9 & Rule 11 & Rule 12: Disabilities & Children Exemptions
  {
    section: "Rule 11 & Rule 12 & Fourth Schedule",
    topic: "Consent for Persons with Disabilities & Health/Education Exemptions",
    topicHindi: "दिव्यांगजनों हेतु सहमति और स्वास्थ्य/शिक्षा संस्थानों के लिए छूट",
    topicHinglish: "Disabled Persons Consent aur Hospitals/Schools ke liye Exemptions",
    citation: "Source: DPDP Rules 2025 Rules 11, 12 & Fourth Schedule (Gazette Notification G.S.R. 846(E))",
    summary:
      "Rule 11 governs verifiable consent of the lawful guardian for persons with disabilities. Rule 12 and Fourth Schedule provide exemptions from certain child-data obligations for clinical establishments, healthcare professionals, and recognized educational institutions solely for provision of medical care and education.",
    summaryHindi:
      "नियम 11 के तहत दिव्यांग व्यक्तियों के लिए उनके वैधानिक अभिभावक की सहमति आवश्यक है। नियम 12 और चौथी अनुसूची के अनुसार, स्वास्थ्य संस्थानों (अस्पताल, डॉक्टर) और मान्यता प्राप्त शिक्षण संस्थानों को चिकित्सा व शिक्षा प्रदान करने के उद्देश्य से कुछ प्रतिबंधों से छूट दी गई है।",
    summaryHinglish:
      "Persons with disabilities ke case me lawful legal guardian ki verifiable consent zaroori hai (Rule 11). Healthcare providers (hospitals, doctors) aur educational institutions (schools) ko medical treatment aur education provide karne ke liye baccho ke data rules se selected exemptions di gayi hain (Rule 12 aur 4th Schedule).",
    keywords: ["disability", "lawful guardian", "rule 11", "rule 12", "fourth schedule", "healthcare exemptions", "school exemptions"],
    keywordsHindi: ["दिव्यांग", "अभिभावक", "नियम 11", "नियम 12", "चौथी अनुसूची", "अस्पताल छूट"],
    keywordsHinglish: ["rule 11 disability", "school hospital child exemption", "rule 12 exemption"],
  },

  // 13. Section 10 & Rule 13: Significant Data Fiduciaries (SDF)
  {
    section: "Section 10 & Rule 13",
    topic: "Additional Obligations of Significant Data Fiduciaries (SDF)",
    topicHindi: "महत्वपूर्ण डेटा फिड्यूशरी (SDF) के अतिरिक्त दायित्व (DPO, DPIA, ऑडिट)",
    topicHinglish: "Significant Data Fiduciary (SDF) ke Extra Obligations: DPIA aur Audit (Rule 13)",
    citation: "Source: DPDP Act Section 10 & DPDP Rules 2025 Rule 13 (Gazette Notification G.S.R. 846(E))",
    summary:
      "Entities designated as Significant Data Fiduciaries (SDF) must: 1) Appoint an India-based Data Protection Officer (DPO) reporting to the Board of Directors, 2) Appoint an independent data auditor, 3) Conduct an annual Data Protection Impact Assessment (DPIA) and comprehensive audit (Rule 13), 4) Submit DPIA reports to the Board, 5) Ensure algorithmic software does not risk Principal rights, 6) Comply with domestic data flow restrictions. Penalty reaches up to ₹150 Crore.",
    summaryHindi:
      "महत्वपूर्ण डेटा फिड्यूशरी (SDF) के रूप में वर्गीकृत संस्थाओं को: 1) भारत में स्थित एक स्वतंत्र DPO नियुक्त करना होगा जो सीधे बोर्ड ऑफ डायरेक्टर्स को रिपोर्ट करे, 2) हर 12 महीने में स्वतंत्र डेटा प्रोटेक्शन इम्पैक्ट असेसमेंट (DPIA) और ऑडिट कराना होगा (नियम 13), 3) एल्गोरिदम और AI सॉफ्टवेयर की सुरक्षा सुनिश्चित करनी होगी, 4) संवेदनशील डेटा को भारत के भीतर रखने के नियमों का पालन करना होगा।",
    summaryHinglish:
      "Govt jin enterprises ko Significant Data Fiduciary (SDF) notify karegi unhe: 1) Bharat me resident DPO appoint karna hoga jo seedhe Board of Directors ko report kare, 2) Har 12 mahine me independent DPIA (Data Protection Impact Assessment) aur compliance audit karwana hoga (Rule 13), 3) AI aur algorithmic models ki safety check karni hogi. SDF rules todne par ₹150 Crore tak penalty hai.",
    keywords: ["sdf", "significant data fiduciary", "rule 13", "section 10", "dpia", "independent audit", "algorithmic governance"],
    keywordsHindi: ["एसडीएफ", "महत्वपूर्ण डेटा फिड्यूशरी", "नियम 13", "डीपीआईए", "ऑडिट", "धारा 10"],
    keywordsHinglish: ["sdf kya hota hai", "rule 13 kya hai", "dpia mandatory kab hai", "sdf obligations"],
  },

  // 14. Section 11 to 14 & Rule 14: Data Principal Rights
  {
    section: "Sections 11–14 & Rule 14",
    topic: "Statutory Rights of Data Principals (Access, Correction, Erasure, Nomination)",
    topicHindi: "डेटा प्रिंसिपल के वैधानिक अधिकार (पहुंच, सुधार, मिटाना, शिकायत, नामांकन)",
    topicHinglish: "Data Principal Rights: Access, Correction, Erasure, Grievance, Nomination (Rule 14)",
    citation: "Source: DPDP Act Sections 11-14 & DPDP Rules 2025 Rule 14 (Gazette Notification G.S.R. 846(E))",
    summary:
      "Data Principals possess four primary rights: 1) Right to Access: Summary of processed data and identities of third parties shared with, 2) Right to Correction & Erasure: Rectify inaccuracies and delete obsolete data, 3) Right of Grievance Redressal: Accessible grievance mechanism before escalating to Board, 4) Right to Nominate: Nominate a representative in event of death/incapacity. Under Rule 14, Fiduciaries must provide prominent online means/portals for exercising these rights.",
    summaryHindi:
      "डेटा प्रिंसिपल के मुख्य अधिकार हैं: 1) सूचना प्राप्त करने का अधिकार (Access): प्रोसेस किए जा रहे डेटा और साझा किए गए थर्ड-पार्टीज की जानकारी, 2) सुधार और मिटाने का अधिकार (Correction & Erasure), 3) शिकायत निवारण का अधिकार (Grievance Redressal), 4) नामांकन का अधिकार (Nomination): मृत्यु या असमर्थता की स्थिति में उत्तराधिकारी मनोनीत करना। नियम 14 के तहत इसके लिए ऑनलाइन पोर्टल उपलब्ध कराना अनिवार्य है।",
    summaryHinglish:
      "Data Principals ke 4 core statutory rights hain: 1) Right to Access: Pata karna ki unka kya data process ho raha hai aur kiske sath share hua, 2) Right to Correction & Erasure: Data update ya delete karwana, 3) Right to Grievance Redressal: Complaint file karna, 4) Right to Nominate: Apne baad kisi nominee ko assign karna. Rule 14 ke tehat online automated self-service portal dena compulsory hai.",
    keywords: ["rights", "data principal rights", "rule 14", "access", "erasure", "correction", "nomination", "sections 11-14"],
    keywordsHindi: ["अधिकार", "डेटा प्रिंसिपल के अधिकार", "नियम 14", "मिटाने का अधिकार", "सुधार", "नामांकन"],
    keywordsHinglish: ["data principal ke rights", "rule 14 kya hai", "right to erasure", "right to access"],
  },

  // 15. Section 15: Duties of Data Principals
  {
    section: "Section 15",
    topic: "Statutory Duties of Data Principals & ₹10,000 Penalty",
    topicHindi: "डेटा प्रिंसिपल के वैधानिक कर्तव्य और ₹10,000 तक का जुर्माना",
    topicHinglish: "Data Principal ke Duties aur ₹10,000 ka Penalty (Section 15)",
    citation: "Source: Digital Personal Data Protection Act, 2023 (Section 15 & The Schedule, Gazette of India)",
    summary:
      "Data Principals must: 1) Not impersonate another individual, 2) Not suppress material information while providing personal data, 3) Not register false, malicious or frivolous grievances, 4) Furnish authentic documents. Breach of duties under Section 15 attracts a penalty of up to ₹10,000.",
    summaryHindi:
      "डेटा प्रिंसिपल के कानूनी कर्तव्य: 1) किसी अन्य व्यक्ति का रूप न धरें (इंपर्सनेशन न करें), 2) कोई महत्वपूर्ण जानकारी न छुपाएं, 3) झूठी या दुर्भावनापूर्ण शिकायत दर्ज न करें, 4) केवल प्रामाणिक दस्तावेज प्रस्तुत करें। इन कर्तव्यों का उल्लंघन करने पर ₹10,000 तक का जुर्माना हो सकता है।",
    summaryHinglish:
      "Data Principals ki legal duties: Kisi aur person ka impersonation na karein, important jankari na chupayein, fake ya frivolous complaints na karein, aur original authentic documents submit karein. Agar user in duties ka violation karta hai toh uspe ₹10,000 tak ka legal fine lag sakta hai.",
    keywords: ["duties", "section 15", "impersonation", "false grievance", "penalty 10000", "authentic"],
    keywordsHindi: ["कर्तव्य", "धारा 15", "झूठी शिकायत", "जुर्माना 10000", "डेटा प्रिंसिपल कर्तव्य"],
    keywordsHinglish: ["data principal duties", "section 15 kya hai", "user par fine", "10000 penalty"],
  },

  // 16. Section 16 & Rule 15: Cross-Border Data Transfer
  {
    section: "Section 16 & Rule 15",
    topic: "Cross-Border Transfer of Personal Data Outside India",
    topicHindi: "भारत के बाहर व्यक्तिगत डेटा का सीमा-पार स्थानांतरण (Cross-Border Transfer)",
    topicHinglish: "Cross-Border Data Transfer Outside India Rules (Rule 15)",
    citation: "Source: DPDP Act Section 16 & DPDP Rules 2025 Rule 15 (Gazette Notification G.S.R. 846(E))",
    summary:
      "Under Section 16 and Rule 15, personal data processed by a Data Fiduciary may be transferred outside India, except to countries or territories specifically restricted or blacklisted by the Central Government. Furthermore, stricter sectoral localization mandates (such as RBI directives on payments data or IRDAI insurance mandates) continue to apply unaffected.",
    summaryHindi:
      "धारा 16 और नियम 15 के तहत, भारत के बाहर डेटा ट्रांसफर करने की अनुमति है, सिवाय उन देशों या क्षेत्रों के जिन्हें केंद्र सरकार द्वारा प्रतिबंधित (Blacklist) किया गया हो। इसके अतिरिक्त, आरबीआई (RBI) जैसे क्षेत्रीय नियामकों के डेटा लोकलाइजेशन नियम यथावत लागू रहेंगे।",
    summaryHinglish:
      "Section 16 aur Rule 15 ke mutabiq personal data India ke bahar transfer kiya ja sakta hai, SIWAYE un countries ya territories ke jinko Central Govt specifically blacklist karegi (Negative List model). Saath hi RBI ya sector-specific data localization rules (jaise payment data localization in India) pehle ki tarah strict rahenge.",
    keywords: ["cross-border", "transfer", "rule 15", "section 16", "outside india", "blacklisting", "localization"],
    keywordsHindi: ["सीमा पार ट्रांसफर", "क्रॉस बॉर्डर", "नियम 15", "धारा 16", "विदेश में डेटा", "ब्लैकलिस्ट"],
    keywordsHinglish: ["rule 15 kya hai", "data bahar transfer ho sakta hai", "cross border rules"],
  },

  // 17. Section 17 & Rule 16: Exemptions for Research & State
  {
    section: "Section 17 & Rule 16 & Second Schedule",
    topic: "Exemptions for Research, Archiving, Statistics and State Action",
    topicHindi: "अनुसंधान, अभिलेखीकरण, सांख्यिकी और राज्य सुरक्षा के लिए छूट",
    topicHinglish: "Research, Statistical aur Eligible Startups ke liye Exemptions (Rule 16)",
    citation: "Source: DPDP Act Section 17 & DPDP Rules 2025 Rule 16 & Second Schedule (Gazette Notification G.S.R. 846(E))",
    summary:
      "The Act provides exemptions for personal data processed: 1) In the interest of prevention, investigation of offences, 2) For research, archiving, or statistical purposes if carried out in accordance with technical safeguards in Second Schedule and not used to make specific decisions affecting Principals, 3) Judicial functions and legal claims, 4) Government powers to exempt eligible startups.",
    summaryHindi:
      "अधिनियम में छूट के प्रावधान: 1) अपराधों की रोकथाम व जांच, 2) अनुसंधान, अभिलेखीकरण और सांख्यिकी के लिए यदि दूसरी अनुसूची के तकनीकी मानकों का पालन किया जाए, 3) न्यायिक कार्य और कानूनी दावे, 4) पात्र स्टार्टअप्स को केंद्र सरकार द्वारा दी जाने वाली छूट।",
    summaryHinglish:
      "Crime investigation, legal cases, aur academic/scientific research ke liye DPDP Act me exemptions di gayi hain, basharte data Second Schedule ke security standards ke sath process ho aur kisi specific individual ke khilaaf decision lene me use na ho. Eligible startups ko bhi compliance me relief di ja sakti hai.",
    keywords: ["exemptions", "research", "archiving", "statistics", "rule 16", "second schedule", "startups", "section 17"],
    keywordsHindi: ["छूट", "अनुसंधान", "नियम 16", "स्टार्टअप छूट", "धारा 17", "सांख्यिकी"],
    keywordsHinglish: ["rule 16 exemption", "startup ko exemption", "research data exemption"],
  },

  // 18. Rule 4 & First Schedule: Consent Manager Registration & Obligations
  {
    section: "Rule 4 & First Schedule",
    topic: "Registration Criteria & Obligations of Consent Managers (₹2 Cr Net Worth)",
    topicHindi: "सहमति प्रबंधक (Consent Manager) का पंजीकरण व शर्तें (₹2 करोड़ नेटवर्थ)",
    topicHinglish: "Consent Manager Banne Ki Rules: ₹2 Crore Net Worth aur Indian Company (Rule 4)",
    citation: "Source: DPDP Rules 2025 Rule 4 & First Schedule (Gazette Notification G.S.R. 846(E))",
    summary:
      "Under Rule 4 and First Schedule, an applicant to register as a Consent Manager must: 1) Be a company incorporated in India, 2) Have a net worth of not less than TWO CRORE RUPEES (₹2 Crore), 3) Possess technical, operational, and financial capacity, 4) Ensure an interoperable platform certified against data protection standards, 5) Strictly NOT monetize, sell, or disclose personal data passing through its platform, 6) Maintain comprehensive audit logs. Registration may be suspended/cancelled for violations.",
    summaryHindi:
      "नियम 4 और प्रथम अनुसूची के तहत सहमति प्रबंधक (Consent Manager) बनने की शर्तें: 1) आवेदक भारत में निगमित कंपनी होनी चाहिए, 2) कंपनी की न्यूनतम नेटवर्थ ₹2 करोड़ (Two Crore Rupees) से कम नहीं होनी चाहिए, 3) तकनीकी और वित्तीय क्षमता सुदृढ़ होनी चाहिए, 4) उसका इंटरऑपरेबल प्लेटफॉर्म सुरक्षा मानकों के अनुरूप प्रमाणित होना चाहिए, 5) वह अपने प्लेटफॉर्म से गुजरने वाले डेटा को किसी भी सूरत में बेच या मोनेटाइज नहीं कर सकता।",
    summaryHinglish:
      "DPDP Rules 2025 ke Rule 4 aur 1st Schedule ke mutabiq Consent Manager register hone ke rules: 1) Company India me incorporated honi chahiye, 2) Minimum net worth ₹2 CRORE (Do Crore) honi compulsory hai, 3) Certified interoperable technical platform hona zaroori hai, 4) Consent Manager kisi bhi user data ko sell, monetize ya third-party ko disclose nahi kar sakta.",
    keywords: ["consent manager", "rule 4", "first schedule", "net worth", "2 crore", "interoperable", "registration", "consent platform"],
    keywordsHindi: ["सहमति प्रबंधक", "नियम 4", "प्रथम अनुसूची", "नेटवर्थ", "2 करोड़", "पंजीकरण", "कंसेंट मैनेजर"],
    keywordsHinglish: ["rule 4 kya hai", "consent manager kaise bane", "consent manager eligibility", "2 crore net worth"],
  },

  // 19. Sections 18–26 & Rules 17–21: Data Protection Board of India
  {
    section: "Sections 18–26 & Rules 17–21",
    topic: "Data Protection Board of India (Composition, Digital Office, 6-Month Inquiry)",
    topicHindi: "भारतीय डेटा संरक्षण बोर्ड (गठन, डिजिटल कार्यालय, 6 माह में जांच)",
    topicHinglish: "Data Protection Board of India (DPB): Digital Office aur 6 Mahine ki Inquiry Limit",
    citation: "Source: DPDP Act Sections 18-26 & DPDP Rules 2025 Rules 17-21 & Fifth Schedule (Gazette Notification G.S.R. 846(E))",
    summary:
      "The Data Protection Board of India is established under Section 18. Composition: Chairperson and 3 Members recommended by Search-cum-Selection Committee chaired by Cabinet Secretary (Rule 17). Terms: Consolidated salary of ₹4,50,000/month for Chairperson and ₹4,00,000/month for Members (Fifth Schedule). Functions: Operates as a Digital Office by default (Rule 20). Rule 19(9) requires inquiries under Section 27 to be completed within SIX MONTHS (extendable by 3 months max).",
    summaryHindi:
      "भारतीय डेटा संरक्षण बोर्ड (Data Protection Board) धारा 18 के तहत गठित है। कैबिनेट सचिव की अध्यक्षता वाली समिति अध्यक्ष और 3 सदस्यों की नियुक्ति की सिफारिश करती है (नियम 17)। पांचवीं अनुसूची के अनुसार अध्यक्ष का वेतन ₹4,50,000/माह और सदस्यों का ₹4,00,000/माह है। बोर्ड पूर्णतः 'डिजिटल कार्यालय' (नियम 20) के रूप में कार्य करता है और नियम 19(9) के तहत किसी भी जांच को 6 महीने के भीतर पूरा करना अनिवार्य है।",
    summaryHinglish:
      "Data Protection Board of India (DPB) ek quasi-judicial body hai jisme 1 Chairperson aur 3 Members hote hain (Cabinet Secretary ki selection committee dwara). 5th Schedule ke mutabiq Chairperson ki salary ₹4.5L/month aur Members ki ₹4L/month hai. Board fully Digital Office ke tarah operate karta hai (Rule 20) aur Rule 19(9) ke tehat kisi bhi case ki inquiry 6 MAHINE ke bheetar complete karna compulsory hai.",
    keywords: ["data protection board", "dpb", "rule 17", "rule 19", "rule 20", "digital office", "salary", "inquiry 6 months", "cabinet secretary"],
    keywordsHindi: ["डेटा संरक्षण बोर्ड", "बोर्ड", "डिजिटल कार्यालय", "नियम 20", "वेतन", "6 महीने", "जांच"],
    keywordsHinglish: ["data protection board kya hai", "dpb members", "rule 20 digital office", "board inquiry timeline"],
  },

  // 20. Section 29 & Rule 22: Appeals to TDSAT
  {
    section: "Section 29 & Rule 22",
    topic: "Appeals to Appellate Tribunal (TDSAT - 60 Days)",
    topicHindi: "अपीलीय न्यायाधिकरण (TDSAT) में अपील (60 दिनों की सीमा)",
    topicHinglish: "TDSAT me Appeal Karne Ka Rule (60 Days Timeline)",
    citation: "Source: DPDP Act Section 29 & DPDP Rules 2025 Rule 22 (Gazette Notification G.S.R. 846(E))",
    summary:
      "Any person aggrieved by an order or direction of the Data Protection Board may prefer an appeal to the Telecom Disputes Settlement and Appellate Tribunal (TDSAT) within 60 DAYS from the date of receipt of the order. The appeal must be accompanied by the prescribed fee and proof of deposit of any penalty required.",
    summaryHindi:
      "डेटा संरक्षण बोर्ड के किसी भी आदेश या निर्देश से व्यथित व्यक्ति आदेश प्राप्त होने के 60 दिनों के भीतर दूरसंचार विवाद निपटान और अपीलीय न्यायाधिकरण (TDSAT) में अपील कर सकता है (धारा 29 और नियम 22)।",
    summaryHinglish:
      "Data Protection Board ke kisi bhi order ya fine ke khilaaf aggrieved person Telecom Disputes Settlement and Appellate Tribunal (TDSAT) me order milne ke 60 DAYS ke andar appeal file kar sakta hai (Rule 22 aur Section 29).",
    keywords: ["tdsat", "appeal", "rule 22", "section 29", "appellate tribunal", "60 days", "court"],
    keywordsHindi: ["टीडीएसएटी", "अपील", "नियम 22", "धारा 29", "60 दिन", "न्यायाधिकरण"],
    keywordsHinglish: ["tdsat appeal", "rule 22 appeal", "board order ke khilaaf appeal", "60 days appeal"],
  },

  // 21. Section 33 & The Schedule: Schedule of Statutory Penalties
  {
    section: "Section 33 & The Schedule",
    topic: "Statutory Penalties for Non-Compliance (Up to ₹250 Crores)",
    topicHindi: "गैर-अनुपालन पर वैधानिक जुर्माना (अधिकतम ₹250 करोड़ तक)",
    topicHinglish: "DPDP Penalties List: Kisme Kitna Fine Lagta Hai (Up to ₹250 Cr)",
    citation: "Source: DPDP Act 2023 (Section 33 & The Schedule, Gazette of India)",
    summary:
      "The Act specifies severe financial penalties based on gravity, duration, and nature: 1) Up to ₹250 Crores: Failure to implement reasonable security safeguards preventing personal data breach (Section 8(5)). 2) Up to ₹200 Crores: Failure to notify Board and affected Principals of a breach (Section 8(6) & Rule 7). 3) Up to ₹200 Crores: Breach of obligations regarding children's data (Section 9 & Rule 10). 4) Up to ₹150 Crores: Breach of Significant Data Fiduciary obligations (Section 10 & Rule 13). 5) Up to ₹50 Crores: Failure to comply with any other provision of the Act or Rules. 6) Up to ₹10,000: Breach of Data Principal duties (Section 15).",
    summaryHindi:
      "डीपीडीपी एक्ट 2023 में उल्लंघनों पर भारी जुर्माने का प्रावधान है: 1) डेटा सुरक्षा उपाय न करने पर: ₹250 करोड़ तक, 2) डेटा उल्लंघन (Breach) की सूचना न देने पर: ₹200 करोड़ तक, 3) बच्चों के डेटा संबंधी नियमों के उल्लंघन पर: ₹200 करोड़ तक, 4) महत्वपूर्ण डेटा फिड्यूशरी (SDF) नियमों के उल्लंघन पर: ₹150 करोड़ तक, 5) अधिनियम के अन्य प्रावधानों या नियमों के उल्लंघन पर: ₹50 करोड़ तक, 6) डेटा प्रिंसिपल द्वारा कर्तव्यों के उल्लंघन पर: ₹10,000 तक।",
    summaryHinglish:
      "DPDP Act ke tehat statutory penalties: 1) Security safeguards fail hone par (Breach prevent na karne par): ₹250 CRORE tak, 2) Data breach notify na karne par (Rule 7): ₹200 CRORE tak, 3) Baccho ke data rules violate karne par (Rule 10): ₹200 CRORE tak, 4) SDF audit/DPIA rules todne par (Rule 13): ₹150 CRORE tak, 5) General violation par: ₹50 CRORE tak, 6) User duties breach par: ₹10,000 tak.",
    keywords: ["penalties", "penalty", "fine", "schedule", "₹250 crore", "₹200 crore", "₹150 crore", "₹50 crore", "jurmana", "punishment"],
    keywordsHindi: ["जुर्माना", "पेनल्टी", "₹250 करोड़", "₹200 करोड़", "दंड", "फाइन", "धारा 33", "अनुसूची"],
    keywordsHinglish: ["kitna penalty hai", "dpdp fine list", "jurmana kitna lagta hai", "maximum fine dpdp"],
  },

  // 22. DPDP Rules 2025: Commencement & Implementation Roadmap
  {
    section: "DPDP Rules 2025 Rule 1",
    topic: "Commencement Phases & 18-Month Transition Roadmap",
    topicHindi: "नियमों का प्रारंभ और 18 महीने की चरणबद्ध कार्यान्वयन समय-सीमा",
    topicHinglish: "DPDP Rules 2025 Timeline: 18-Month Phased Transition (May 2027 Deadline)",
    citation: "Source: DPDP Rules 2025 Rule 1(3) & 1(4) (Gazette Notification G.S.R. 846(E), 13 Nov 2025)",
    summary:
      "Under Rule 1: 1) Immediate commencement on publication (13 Nov 2025): Procedural rules and Board constitution. 2) Rule 4 (Consent Manager registration) comes into force ONE YEAR from publication (13 Nov 2026). 3) Rules 3, 5 to 16, 22, and 23 come into force EIGHTEEN MONTHS from publication (Hard Deadline: May 2027), after which full mandatory compliance applies with zero grace period.",
    summaryHindi:
      "नियम 1 के तहत कार्यान्वयन की समय-सीमा: 1) 13 नवंबर 2025 से बोर्ड के गठन से संबंधित नियम तुरंत लागू। 2) नियम 4 (सहमति प्रबंधक पंजीकरण) अधिसूचना के 1 वर्ष बाद (13 नवंबर 2026) से लागू होगा। 3) नियम 3, 5 से 16, 22 और 23 अधिसूचना के 18 महीने बाद (मई 2027) से पूर्णतः लागू होंगे, जिसके बाद किसी भी प्रकार की छूट नहीं मिलेगी।",
    summaryHinglish:
      "DPDP Rules 2025 ki implementation timeline: 1) 13 Nov 2025 ko gazette notify hote hi Board constitution rules active ho gaye hain. 2) Rule 4 (Consent Manager registration) 12 mahine (Nov 2026) me live hoga. 3) Notice, Breach Reporting, Baccho ka data aur audit rules (Rules 3, 5-16, 22, 23) 18 MAHINE me (Hard Deadline: MAY 2027) 100% compulsory ho jayenge bina kisi grace period ke.",
    keywords: ["commencement", "rule 1", "timeline", "may 2027", "18 months", "one year", "transition", "roadmap", "deadline"],
    keywordsHindi: ["प्रारंभ", "नियम 1", "समय सीमा", "मई 2027", "18 महीने", "कार्यान्वयन", "डेडलाइन"],
    keywordsHinglish: ["timeline kya hai", "may 2027 deadline", "kab se lagu hoga", "18 months timeline"],
  },
];
