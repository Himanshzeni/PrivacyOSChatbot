export interface CuratedQnA {
  patterns: RegExp[];
  answerHinglish: string;
  answerEnglish: string;
  answerHindi?: string;
}

export const POPULAR_QNA_LIST: CuratedQnA[] = [
  // 1. What is PrivacyOS Global?
  {
    patterns: [
      /what\s+is\s+privacyos/i,
      /privacyos\s+(kya\s+hai|kya\s+karta|ke\s+baare|overview)/i,
      /about\s+privacyos/i,
      /tell\s+me\s+about\s+privacyos/i,
      /प्राइवेसीओएस/i,
    ],
    answerHinglish:
      "PrivacyOS Global (by Vexalix Technology) ek all-in-one data privacy aur compliance platform hai. Yeh Indian businesses ko DPDP Act 2023 aur GDPR compliance ke liye Consent Management, Indian PII Discovery (Aadhaar/PAN/UPI), DSR Automation, aur Audit Assessments jaise solutions ek hi dashboard par provide karta hai taaki aap audit-ready reh sakein.",
    answerEnglish:
      "PrivacyOS Global (by Vexalix Technology) is India's all-in-one data privacy and compliance operating system. Purpose-built for DPDP Act 2023 and GDPR compliance, it unifies Consent Management, Indian PII Discovery (Aadhaar, PAN, UPI), DSR Automation, and Audit Readiness into a single pane of glass.",
    answerHindi:
      "PrivacyOS Global (Vexalix Technology द्वारा विकसित) एक संपूर्ण डेटा गोपनीयता और अनुपालन ऑपरेटिंग सिस्टम है। यह भारतीय उद्यमों को DPDP अधिनियम 2023 के तहत सहमति प्रबंधन (Consent Management), आधार/पैन खोज, DSR स्वचालन और ऑडिट असेसमेंट के समाधान प्रदान करता है।",
  },

  // 2. Penalties under DPDP Act 2023?
  {
    patterns: [
      /penalt(y|ies)\s+under\s+dpdp/i,
      /dpdp.*penalt/i,
      /penalty.*dpdp/i,
      /jurmana/i,
      /fine.*dpdp/i,
      /जुर्माना/i,
      /दण्ड/i,
      /दंड/i,
    ],
    answerHinglish:
      "DPDP Act 2023 ke tehat non-compliance par maximum ₹250 Crore tak ki penalty lag sakti hai. Isme data breach na rokne par ₹250 Crore tak, children's data violations par ₹200 Crore tak, aur anya statutory compliance violations par ₹50 Crore tak ka jurmana shamil hai.",
    answerEnglish:
      "Under the DPDP Act 2023, penalties reach up to ₹250 Crore per violation. This includes up to ₹250 Cr for failure to prevent personal data breaches, up to ₹200 Cr for violations regarding children's data, and up to ₹50 Cr for other statutory compliance breaches.",
    answerHindi:
      "DPDP अधिनियम 2023 के तहत गैर-अनुपालन पर अधिकतम ₹250 करोड़ तक का जुर्माना हो सकता है। इसमें डेटा उल्लंघन रोकने में विफलता पर ₹250 करोड़, बच्चों के डेटा उल्लंघन पर ₹200 करोड़, और अन्य सामान्य उल्लंघनों पर ₹50 करोड़ तक का जुर्माना शामिल है।",
  },

  // 3. How does Aadhaar & PAN discovery work?
  {
    patterns: [
      /aadhaar.*pan/i,
      /pan.*aadhaar/i,
      /how\s+does.*discovery\s+work/i,
      /pii\s+discovery/i,
      /data\s+discovery.*work/i,
      /आधार/i,
      /पैन/i,
    ],
    answerHinglish:
      "PrivacyOS ka Data Discovery engine aapke databases, cloud storage (AWS, Azure, GCP), aur SaaS tools ko automatically scan karta hai. Yeh built-in pattern recognition se Indian identifiers jaise Aadhaar, PAN, UPI IDs aur mobile numbers ko detect karke unka automated data flow map aur RoPA (Record of Processing Activities) generate karta hai.",
    answerEnglish:
      "PrivacyOS Data Discovery automatically scans your databases, cloud environments (AWS, Azure, GCP), SaaS tools, and endpoints with built-in pattern recognition for Indian identifiers like Aadhaar, PAN, UPI IDs, and mobile numbers, generating data flow maps and automated RoPA records.",
    answerHindi:
      "PrivacyOS का डेटा डिस्कवरी इंजन आपके डेटाबेस, क्लाउड (AWS, Azure, GCP) और SaaS टूल्स को स्वचालित रूप से स्कैन करता है। यह आधार, पैन, यूपीआई आईडी और मोबाइल नंबर जैसे भारतीय पहचानकर्ताओं को पहचानकर स्वचालित डेटा फ्लो मैप और RoPA रिकॉर्ड तैयार करता है।",
  },

  // 4. What is the May 2027 deadline / Timeline?
  {
    patterns: [
      /may\s+2027/i,
      /deadline/i,
      /timeline.*dpdp/i,
      /transition\s+period/i,
      /when.*enforce/i,
      /समय\s*सीमा/i,
      /डेडलाइन/i,
    ],
    answerHinglish:
      "DPDP Rules 2025 (G.S.R. 846(E)) ke tehat 18-month transition timeline di gayi hai. May 2027 full mandatory DPDP enforcement ki hard deadline hai, jiske baad bina kisi grace period ke Consent, DSR requests, 72-hour Breach Reporting, aur DPIA compliance sabhi organizations ke liye 100% compulsory ho jayegi.",
    answerEnglish:
      "Under DPDP Rules 2025 (G.S.R. 846(E)), an 18-month phased transition timeline is established. May 2027 is the hard deadline for full mandatory DPDP enforcement, after which consent records, DSR execution, 72-hour breach reporting, and DPIA compliance become 100% compulsory with zero grace period.",
    answerHindi:
      "DPDP नियम 2025 (अधिसूचना G.S.R. 846(E)) के तहत 18 महीने की समय-सीमा तय की गई है। मई 2027 पूर्ण अनिवार्य अनुपालन की अंतिम तिथि (Hard Deadline) है, जिसके बाद सहमति, 72 घंटे में ब्रीच रिपोर्टिंग और DSR अनिवार्य हो जाएगा।",
  },

  // 5. Rule 7: Data Breach Intimation (72 Hours)
  {
    patterns: [
      /rule\s*7/i,
      /नियम\s*7/i,
      /breach.*intimation/i,
      /intimation.*breach/i,
      /उल्लंघन\s*की\s*सूचना/i,
      /72\s*hour/i,
      /72\s*घंटे/i,
      /data\s*breach.*reporting/i,
    ],
    answerHinglish:
      "DPDP Rules 2025 ke Rule 7 ke anusar: 1) Data Breach hone par affected Data Principals ko turant bina kisi deri ke clear intimation deni hoti hai. 2) Data Protection Board of India ko turant initial notice aur 72 GHANTO (72 Hours) ke bheetar updated detailed report (karan, prabhav aur mitigation steps) submit karni anivarya hai.",
    answerEnglish:
      "Under Rule 7 of the DPDP Rules 2025: 1) On becoming aware of a data breach, the Data Fiduciary must intimate affected Data Principals without delay. 2) The Data Fiduciary must intimate the Data Protection Board without delay, and submit a detailed report within 72 HOURS containing root causes, findings, and mitigation measures.",
    answerHindi:
      "DPDP नियम 2025 के नियम 7 के अनुसार: 1) डेटा उल्लंघन की जानकारी मिलने पर प्रभावित डेटा प्रिंसिपल को बिना देरी के स्पष्ट सूचना देना अनिवार्य है। 2) डेटा संरक्षण बोर्ड को तत्काल प्रारंभिक सूचना तथा 72 घंटों के भीतर कारणों, प्रभाव और निवारक उपायों के साथ विस्तृत रिपोर्ट देना अनिवार्य है।",
  },

  // 6. Rule 4: Consent Manager Registration & Criteria (₹2 Cr Net Worth)
  {
    patterns: [
      /rule\s*4/i,
      /नियम\s*4/i,
      /consent\s*manager/i,
      /सहमति\s*प्रबंधक/i,
      /first\s*schedule/i,
      /प्रथम\s*अनुसूची/i,
    ],
    answerHinglish:
      "DPDP Rules 2025 ke Rule 4 aur First Schedule ke tehat: Consent Manager banne ke liye company ka Bharat me incorporated hona, minimum ₹2 CRORE ki net worth hona, aur technical interoperable platform hona zaroori hai. Consent Manager kisi bhi user data ko monetize ya bech nahi sakta.",
    answerEnglish:
      "Under Rule 4 and First Schedule of the DPDP Rules 2025: To register as a Consent Manager, an applicant must be a company incorporated in India with a minimum net worth of at least ₹2 CRORE and an interoperable platform. Consent Managers are strictly barred from monetizing or disclosing personal data.",
    answerHindi:
      "DPDP नियम 2025 के नियम 4 और प्रथम अनुसूची के तहत: सहमति प्रबंधक (Consent Manager) बनने के लिए आवेदक भारत में निगमित कंपनी होनी चाहिए जिसकी न्यूनतम नेटवर्थ ₹2 करोड़ हो। सहमति प्रबंधक उपयोगकर्ताओं के डेटा को किसी भी सूरत में बेच या मोनेटाइज नहीं कर सकता।",
  },

  // 7. Rule 10: Children's Data & Parental Consent
  {
    patterns: [
      /rule\s*10/i,
      /नियम\s*10/i,
      /child.*data/i,
      /children.*data/i,
      /बच्चों\s*का\s*डेटा/i,
      /बालक/i,
      /parental\s*consent/i,
    ],
    answerHinglish:
      "DPDP Rules 2025 ke Rule 10 ke tehat: 18 saal se kam aayu ke bachhe ka data process karne se pehle parents ki verifiable consent lena anivarya hai (jo DigiLocker ya authorized ID se verify ki ja sakti hai). Bachhon ki profiling, behavioural tracking, aur targeted ads par 100% pratibandh hai.",
    answerEnglish:
      "Under Rule 10 of DPDP Rules 2025: Verifiable parental consent is mandatory before processing personal data of any child (below 18 years), verified via reliable IDs or DigiLocker tokens. Behavioural tracking, profiling, and targeted advertising directed at children are strictly prohibited.",
    answerHindi:
      "DPDP नियम 2025 के नियम 10 के अनुसार: 18 वर्ष से कम आयु के बालक का डेटा प्रोसेस करने से पहले माता-पिता की सत्यापन योग्य सहमति (DigiLocker या अधिकृत आईडी द्वारा) अनिवार्य है। बच्चों की ट्रैकिंग, व्यवहारिक निगरानी और लक्षित विज्ञापनों पर पूर्ण प्रतिबंध है।",
  },

  // 8. How to get a free compliance assessment?
  {
    patterns: [
      /free.*compliance.*assessment/i,
      /assessment/i,
      /how\s+to\s+get.*assessment/i,
      /audit.*assessment/i,
      /free.*audit/i,
      /demo/i,
      /डेमो/i,
    ],
    answerHinglish:
      "Aap hamari website par neeche diye gaye 'Submit an Enquiry →' button par click karke apni basic requirement share kar sakte hain. PrivacyOS ki certified privacy team aapse connect karke aapke business ka customized DPDP readiness assessment aur roadmap provide karegi.",
    answerEnglish:
      "You can click the 'Submit an Enquiry →' button below and share your organization's requirements. Our certified privacy experts will promptly connect with you to conduct a complimentary DPDP readiness assessment and audit roadmap.",
    answerHindi:
      "आप नीचे दिए गए 'Submit an Enquiry →' बटन पर क्लिक करके अपनी आवश्यकताएं साझा कर सकते हैं। PrivacyOS की विशेषज्ञ टीम आपसे संपर्क करके आपके व्यवसाय के लिए निःशुल्क DPDP अनुपालन मूल्यांकन और रोडमैप प्रदान करेगी।",
  },
];

export function findCuratedAnswer(query: string): string | null {
  const q = query.trim();
  const hasDevanagari = /[\u0900-\u097F]/.test(q);
  const isEnglishOnly =
    /^[a-zA-Z0-9\s\?.,!'&%()\-]+$/.test(q) &&
    !/(kya|hai|kaise|kitna|batao|kripya|namaste|lagti|milega|hoga|karein|kab)/i.test(q);

  for (const item of POPULAR_QNA_LIST) {
    for (const pattern of item.patterns) {
      if (pattern.test(q)) {
        if (hasDevanagari && item.answerHindi) {
          return item.answerHindi;
        }
        return isEnglishOnly ? item.answerEnglish : item.answerHinglish;
      }
    }
  }

  return null;
}
