// Self-contained reference data for the Police Guidelines app.
// No database required — all content lives here so the app runs out of the box.
// This is generic, educational reference material modelled on common policing
// standard operating procedures. It is not legal advice and is not tied to any
// specific jurisdiction.

export interface GuidelineSection {
  heading: string;
  body: string;
}

export interface Guideline {
  slug: string;
  title: string;
  categorySlug: string;
  summary: string;
  lastUpdated: string; // ISO date
  reference: string; // SOP / policy number
  keyPoints: string[];
  sections: GuidelineSection[];
  relatedSlugs?: string[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string; // lucide-react icon name
  accent: string; // tailwind color token used for accents
}

export const categories: Category[] = [
  {
    slug: "use-of-force",
    name: "Use of Force",
    description:
      "Force continuum, de-escalation, reporting and review obligations.",
    icon: "Shield",
    accent: "rose",
  },
  {
    slug: "traffic-stops",
    name: "Traffic & Vehicle Stops",
    description:
      "Conducting safe vehicle stops, searches and roadside procedures.",
    icon: "Car",
    accent: "amber",
  },
  {
    slug: "arrest-detention",
    name: "Arrest & Detention",
    description:
      "Lawful arrest, cautioning, custody handling and detainee welfare.",
    icon: "Handcuffs",
    accent: "blue",
  },
  {
    slug: "evidence",
    name: "Evidence Handling",
    description:
      "Chain of custody, crime-scene preservation and digital evidence.",
    icon: "FileSearch",
    accent: "violet",
  },
  {
    slug: "community-policing",
    name: "Community Policing",
    description:
      "Engagement, vulnerable persons, and bias-free policing standards.",
    icon: "Users",
    accent: "emerald",
  },
  {
    slug: "emergency-response",
    name: "Emergency Response",
    description:
      "Pursuits, active-threat response and coordinating with other services.",
    icon: "Siren",
    accent: "orange",
  },
  {
    slug: "conduct-ethics",
    name: "Conduct & Ethics",
    description:
      "Professional standards, integrity, body-worn cameras and complaints.",
    icon: "Scale",
    accent: "teal",
  },
];

export const guidelines: Guideline[] = [
  {
    slug: "force-continuum",
    title: "The Use-of-Force Continuum",
    categorySlug: "use-of-force",
    summary:
      "A graduated framework for selecting a force option that is proportionate to the level of resistance encountered.",
    lastUpdated: "2026-02-14",
    reference: "SOP 4.1",
    keyPoints: [
      "Force used must be objectively reasonable, necessary and proportionate.",
      "Always begin with the lowest level of force likely to be effective.",
      "Continuously reassess — escalate or de-escalate as the situation changes.",
    ],
    sections: [
      {
        heading: "Principle of proportionality",
        body: "Officers may only use the degree of force that is reasonably necessary to achieve a lawful objective. The force applied must be proportionate to the threat, the seriousness of the offence, and the risk posed to the officer, the subject and the public.",
      },
      {
        heading: "Levels of the continuum",
        body: "1) Officer presence and verbal direction. 2) Soft empty-hand control (guiding, escort holds). 3) Hard empty-hand control (strikes, takedowns). 4) Less-lethal tools (OC spray, baton, conducted-energy device). 5) Lethal force, used only where there is an imminent threat of death or serious injury. Officers should move up or down the continuum as the subject's behaviour changes.",
      },
      {
        heading: "Duty to intervene",
        body: "Any officer who observes another officer using force that is clearly excessive or no longer necessary has a positive duty to intervene to stop it and to report the incident to a supervisor.",
      },
      {
        heading: "Documentation",
        body: "Every application of force above mere physical presence must be documented in a Use-of-Force Report before the end of shift, including the resistance encountered, options considered and any injuries.",
      },
    ],
    relatedSlugs: ["de-escalation", "less-lethal-options", "uof-reporting"],
  },
  {
    slug: "de-escalation",
    title: "De-escalation Techniques",
    categorySlug: "use-of-force",
    summary:
      "Tactics to reduce the intensity of an encounter and create time and distance before force is considered.",
    lastUpdated: "2026-01-30",
    reference: "SOP 4.2",
    keyPoints: [
      "Time, distance and cover create options and reduce the need for force.",
      "Use calm, clear communication and active listening.",
      "Where safe, slow the encounter down rather than rushing to resolution.",
    ],
    sections: [
      {
        heading: "Create time and distance",
        body: "Where there is no immediate threat, position yourself to maintain a safe reactionary gap. Distance buys time, and time allows for communication, the arrival of resources, and a peaceful resolution.",
      },
      {
        heading: "Communication",
        body: "Speak calmly and avoid confrontational body language. Use the subject's name where known, acknowledge their concerns, and give clear, simple directions. Avoid issuing commands you are not prepared to enforce.",
      },
      {
        heading: "Recognising crisis",
        body: "Behaviour driven by mental-health crisis, intoxication or sensory overload may not respond to ordinary commands. Where a crisis is suspected, request a specialist or mental-health co-responder and prioritise containment over rapid intervention.",
      },
    ],
    relatedSlugs: ["force-continuum", "vulnerable-persons"],
  },
  {
    slug: "less-lethal-options",
    title: "Less-Lethal Force Options",
    categorySlug: "use-of-force",
    summary:
      "Authorised intermediate tools, their appropriate use, and post-deployment care obligations.",
    lastUpdated: "2026-02-02",
    reference: "SOP 4.3",
    keyPoints: [
      "Only carry and deploy tools you are currently certified to use.",
      "Warn before deploying where practical and give time to comply.",
      "Provide or summon medical care promptly after any deployment.",
    ],
    sections: [
      {
        heading: "Conducted-energy devices",
        body: "A conducted-energy device may be used against a subject who is actively resisting or poses a credible threat. Avoid deployment against the head, neck, chest of at-risk persons, or anyone in an elevated position or near flammable material. Limit to the minimum number of cycles needed to gain control.",
      },
      {
        heading: "Chemical agents (OC spray)",
        body: "OC spray is appropriate for actively resisting subjects at close range. After exposure, move the subject to fresh air, allow rinsing with water, and monitor for breathing difficulty.",
      },
      {
        heading: "Impact weapons",
        body: "Batons target large muscle groups and joints — never the head, neck or spine unless lethal force is justified. Document every strike location and the resistance that justified it.",
      },
    ],
    relatedSlugs: ["force-continuum", "uof-reporting"],
  },
  {
    slug: "uof-reporting",
    title: "Use-of-Force Reporting & Review",
    categorySlug: "use-of-force",
    summary:
      "When and how to report force, supervisory review, and triggers for independent investigation.",
    lastUpdated: "2026-03-01",
    reference: "SOP 4.5",
    keyPoints: [
      "File a Use-of-Force Report before end of shift for any reportable force.",
      "Notify a supervisor immediately for serious injury or death.",
      "Preserve body-worn camera footage and any witness details.",
    ],
    sections: [
      {
        heading: "Reportable force",
        body: "Reportable force includes any use of a weapon or tool, any strike or takedown, any force resulting in injury or complaint of injury, and any pointing of a firearm at a person.",
      },
      {
        heading: "Supervisory review",
        body: "A supervisor must review each report for compliance with policy, identify training needs, and escalate to professional standards where the force may have been excessive or where a death or serious injury occurred.",
      },
      {
        heading: "Independent oversight",
        body: "Any death or serious injury following police contact must be referred to the independent oversight body without delay. Officers must not discuss their accounts with each other before providing statements.",
      },
    ],
    relatedSlugs: ["force-continuum", "body-worn-cameras"],
  },
  {
    slug: "conducting-vehicle-stops",
    title: "Conducting a Safe Vehicle Stop",
    categorySlug: "traffic-stops",
    summary:
      "Positioning, approach and communication for routine and high-risk traffic stops.",
    lastUpdated: "2026-02-20",
    reference: "SOP 6.1",
    keyPoints: [
      "Choose a safe, well-lit location and notify dispatch with the plate and location.",
      "Use the offset (driver-side) approach and stay alert to occupants' hands.",
      "Explain the reason for the stop clearly and early.",
    ],
    sections: [
      {
        heading: "Before the stop",
        body: "Signal the driver to a safe location off the carriageway. Advise dispatch of your location, vehicle description and registration before leaving your vehicle so backup can find you if needed.",
      },
      {
        heading: "The approach",
        body: "Position your vehicle offset to the left for protection from passing traffic. Approach from the driver's side while observing occupant behaviour, or use a passenger-side approach on busy roads. Keep your weapon side away from the driver.",
      },
      {
        heading: "Interaction",
        body: "Greet the driver, identify yourself, and state the reason for the stop. Request licence and registration. Keep instructions clear. If you develop reasonable suspicion of further offences, call for backup before escalating.",
      },
    ],
    relatedSlugs: ["vehicle-searches", "pursuit-policy"],
  },
  {
    slug: "vehicle-searches",
    title: "Vehicle Searches",
    categorySlug: "traffic-stops",
    summary:
      "Lawful bases for searching a vehicle and how to document the grounds.",
    lastUpdated: "2026-01-18",
    reference: "SOP 6.3",
    keyPoints: [
      "A search needs a lawful basis: consent, probable cause, arrest, or warrant.",
      "Record the specific grounds that justified the search.",
      "Consent must be voluntary and can be withdrawn at any time.",
    ],
    sections: [
      {
        heading: "Lawful bases",
        body: "A vehicle may be searched where the driver gives voluntary consent, where there is probable cause to believe it contains evidence of a crime, incident to a lawful arrest of an occupant, or under a valid warrant. Each basis has different limits on scope.",
      },
      {
        heading: "Scope and documentation",
        body: "The scope of a search is limited by its justification — probable cause to believe drugs are present does not justify dismantling the vehicle without further grounds. Record what you searched, why, and what was found in your notebook and report.",
      },
      {
        heading: "Consent searches",
        body: "Consent must be given freely, not in response to a show of authority. Advise the person they may refuse, and stop immediately if consent is withdrawn.",
      },
    ],
    relatedSlugs: ["conducting-vehicle-stops", "chain-of-custody"],
  },
  {
    slug: "lawful-arrest",
    title: "Making a Lawful Arrest",
    categorySlug: "arrest-detention",
    summary:
      "Grounds for arrest, the caution, and use of restraints during apprehension.",
    lastUpdated: "2026-02-25",
    reference: "SOP 5.1",
    keyPoints: [
      "Arrest requires reasonable grounds to suspect an offence.",
      "Caution the person and tell them they are under arrest and why.",
      "Apply only the restraint necessary for safety.",
    ],
    sections: [
      {
        heading: "Grounds",
        body: "An officer must have reasonable grounds — facts that would lead a reasonable person to the same suspicion — before arresting. A hunch is not enough. The necessity of arrest (e.g. to prevent harm, secure evidence or establish identity) should also be considered where a summons would suffice.",
      },
      {
        heading: "Informing the person",
        body: "At or as soon as practicable after arrest, tell the person clearly that they are under arrest, the offence, and deliver the caution regarding their right to silence and right to legal advice.",
      },
      {
        heading: "Restraint and search",
        body: "Handcuffs and other restraints are applied only where reasonably necessary for safety or to prevent escape. A search incident to arrest is limited to the person and immediate area for weapons and evidence.",
      },
    ],
    relatedSlugs: ["custody-handling", "detainee-welfare"],
  },
  {
    slug: "custody-handling",
    title: "Custody & Booking Procedures",
    categorySlug: "arrest-detention",
    summary:
      "Receiving a detainee, risk assessment, property handling and recording.",
    lastUpdated: "2026-03-05",
    reference: "SOP 5.2",
    keyPoints: [
      "Complete a risk assessment on every detainee at booking.",
      "Record and secure all personal property in the detainee's presence.",
      "Inform the detainee of their rights and entitlements.",
    ],
    sections: [
      {
        heading: "Reception and risk assessment",
        body: "On arrival at custody, the custody officer assesses risks including self-harm, medical needs, intoxication and vulnerability. The assessment determines cell allocation and observation frequency.",
      },
      {
        heading: "Property",
        body: "All property is itemised and recorded in the detainee's presence, then sealed and stored. Items that could be used for self-harm are removed.",
      },
      {
        heading: "Rights and entitlements",
        body: "Detainees must be told of their right to legal advice, to have someone informed of their detention, and to medical attention. Detention has time limits and must be reviewed by a supervisor at set intervals.",
      },
    ],
    relatedSlugs: ["lawful-arrest", "detainee-welfare"],
  },
  {
    slug: "detainee-welfare",
    title: "Detainee Welfare & Observations",
    categorySlug: "arrest-detention",
    summary:
      "Ongoing care obligations, observation levels and handling medical needs in custody.",
    lastUpdated: "2026-02-11",
    reference: "SOP 5.4",
    keyPoints: [
      "Match observation frequency to the assessed risk level.",
      "Never delay medical care — when in doubt, call for help.",
      "Record all checks, meals, and welfare events contemporaneously.",
    ],
    sections: [
      {
        heading: "Observation levels",
        body: "Standard observation requires checks at least hourly. Heightened risk requires more frequent checks, constant observation, or close proximity. Rousing checks (waking and getting a response) are used where intoxication or head injury is a concern.",
      },
      {
        heading: "Medical care",
        body: "Any detainee who appears unwell, has a known condition, or requests medication must be seen by a healthcare professional. Officers must never make a clinical judgement to withhold care.",
      },
      {
        heading: "Records",
        body: "Every welfare event — checks, meals, exercise, visits and complaints — is logged with a time and the officer's identity, creating an auditable custody record.",
      },
    ],
    relatedSlugs: ["custody-handling", "vulnerable-persons"],
  },
  {
    slug: "crime-scene-preservation",
    title: "Crime Scene Preservation",
    categorySlug: "evidence",
    summary:
      "First-responder actions to secure a scene and protect evidence from contamination.",
    lastUpdated: "2026-01-22",
    reference: "SOP 7.1",
    keyPoints: [
      "Preserve life first, then preserve the scene.",
      "Establish a cordon and a single, recorded entry/exit path.",
      "Do not touch, move or add anything unnecessarily.",
    ],
    sections: [
      {
        heading: "Priorities on arrival",
        body: "The order of priorities is: protect life, prevent escape of offenders, then preserve the scene and evidence. Render first aid where needed, noting any items moved in the process.",
      },
      {
        heading: "Cordons",
        body: "Set an inner cordon around the immediate scene and an outer cordon to manage access and the public. Establish a common approach path to minimise contamination, and start a scene log recording everyone who enters and leaves.",
      },
      {
        heading: "Avoiding contamination",
        body: "Do not smoke, eat, drink or use facilities within the cordon. Wear appropriate protective equipment. Officers who attended a suspect should not also attend the victim where cross-contamination of forensic material is possible.",
      },
    ],
    relatedSlugs: ["chain-of-custody", "digital-evidence"],
  },
  {
    slug: "chain-of-custody",
    title: "Chain of Custody",
    categorySlug: "evidence",
    summary:
      "Documenting the seizure, transfer and storage of evidence to keep it admissible.",
    lastUpdated: "2026-02-08",
    reference: "SOP 7.2",
    keyPoints: [
      "Label and seal every exhibit at the point of seizure.",
      "Record every transfer with date, time and the people involved.",
      "Any gap in the chain can render evidence inadmissible.",
    ],
    sections: [
      {
        heading: "Seizure and labelling",
        body: "Each exhibit is given a unique reference, bagged in tamper-evident packaging, and labelled with what it is, where and when it was found, and by whom. Photograph items in situ before moving where practical.",
      },
      {
        heading: "Continuity record",
        body: "An exhibit's continuity record documents every person who has had custody of it, with dates and times of each transfer. Minimise the number of handlers to keep the chain short and defensible.",
      },
      {
        heading: "Storage",
        body: "Store exhibits securely in conditions appropriate to the item — refrigeration for biological samples, secure stores for firearms and drugs. Access to evidence stores is logged.",
      },
    ],
    relatedSlugs: ["crime-scene-preservation", "digital-evidence"],
  },
  {
    slug: "digital-evidence",
    title: "Seizing Digital Evidence",
    categorySlug: "evidence",
    summary:
      "Handling phones, computers and other devices to preserve volatile data.",
    lastUpdated: "2026-03-09",
    reference: "SOP 7.4",
    keyPoints: [
      "Do not browse or alter a device — every action changes data.",
      "Isolate devices from networks to prevent remote wiping.",
      "Record the device state and seek specialist forensic support.",
    ],
    sections: [
      {
        heading: "Preserve, don't explore",
        body: "Switched-on devices may hold volatile data that is lost when powered off, but exploring them changes evidence. Photograph the screen, note what is displayed, and consult a digital forensics specialist before acting.",
      },
      {
        heading: "Network isolation",
        body: "Place mobile devices in airplane mode or a shielded bag to prevent remote access, message arrival, or remote wiping. Record the time isolation was applied.",
      },
      {
        heading: "Documentation",
        body: "Record make, model, identifiers, condition, and whether the device was on or off. Seize associated chargers, cables and written passwords found lawfully.",
      },
    ],
    relatedSlugs: ["chain-of-custody"],
  },
  {
    slug: "vulnerable-persons",
    title: "Interacting with Vulnerable Persons",
    categorySlug: "community-policing",
    summary:
      "Recognising and adapting to vulnerability arising from age, disability, or crisis.",
    lastUpdated: "2026-02-17",
    reference: "SOP 8.2",
    keyPoints: [
      "Recognise vulnerability early and adapt your approach.",
      "Involve appropriate adults, carers or specialists as required.",
      "Patience and clear, simple communication reduce risk.",
    ],
    sections: [
      {
        heading: "Recognising vulnerability",
        body: "Vulnerability may arise from age, mental ill-health, learning disability, intoxication, or being a victim of exploitation. Signs include confusion, distress, difficulty communicating, or accounts that do not add up.",
      },
      {
        heading: "Adapting the response",
        body: "Slow down, use plain language, allow extra time for responses, and reduce sensory overload where possible. For children and vulnerable adults in custody, an appropriate adult must be present for interviews.",
      },
      {
        heading: "Safeguarding referrals",
        body: "Where you identify a person at risk of harm, make a safeguarding referral to the relevant agency, even if no crime has been committed.",
      },
    ],
    relatedSlugs: ["de-escalation", "bias-free-policing"],
  },
  {
    slug: "bias-free-policing",
    title: "Bias-Free & Fair Policing",
    categorySlug: "community-policing",
    summary:
      "Standards ensuring policing decisions are based on behaviour and facts, not stereotypes.",
    lastUpdated: "2026-01-12",
    reference: "SOP 8.1",
    keyPoints: [
      "Base decisions on conduct and intelligence, never protected characteristics.",
      "Stop-and-search must rest on objective, recordable grounds.",
      "Treat everyone with dignity, courtesy and respect.",
    ],
    sections: [
      {
        heading: "The standard",
        body: "Policing decisions — who to stop, search, question or arrest — must be based on individual behaviour, reliable information or specific intelligence, never on race, religion, gender, sexuality, disability or other protected characteristics.",
      },
      {
        heading: "Stop and search",
        body: "A search requires genuine, objective grounds for suspicion specific to the individual. Explain the legal power, the object of the search, and the person's rights. Record the grounds and outcome — these records are monitored for disproportionality.",
      },
      {
        heading: "Building trust",
        body: "Procedural fairness — voice, neutrality, respect and trustworthiness — increases public cooperation and legitimacy. Small courtesies in routine encounters shape community confidence.",
      },
    ],
    relatedSlugs: ["vulnerable-persons", "body-worn-cameras"],
  },
  {
    slug: "pursuit-policy",
    title: "Vehicle Pursuit Policy",
    categorySlug: "emergency-response",
    summary:
      "Deciding whether to pursue, how to manage a pursuit, and when to abandon it.",
    lastUpdated: "2026-03-03",
    reference: "SOP 9.1",
    keyPoints: [
      "The risk of the pursuit must not outweigh the need to apprehend.",
      "A trained supervisor manages and may terminate any pursuit.",
      "Abandon when the risk to the public becomes too high.",
    ],
    sections: [
      {
        heading: "Decision to pursue",
        body: "Before pursuing, weigh the seriousness of the offence against the risk to the public, the road and weather conditions, and whether the offender can be identified and detained later. A pursuit for a minor matter is rarely justified.",
      },
      {
        heading: "Management",
        body: "Pursuits are continuously assessed by a control-room supervisor who authorises tactics and can order termination. The lead vehicle provides a running commentary on location, speed and driving.",
      },
      {
        heading: "Termination",
        body: "Abandon the pursuit when the risk to officers or the public outweighs the benefit of immediate arrest, when the subject's identity is known, or when directed by the supervisor. Slow down, deactivate warning equipment, and confirm termination over the radio.",
      },
    ],
    relatedSlugs: ["conducting-vehicle-stops", "active-threat-response"],
  },
  {
    slug: "active-threat-response",
    title: "Active-Threat Response",
    categorySlug: "emergency-response",
    summary:
      "First-officer priorities during an ongoing attack and coordination with other services.",
    lastUpdated: "2026-02-28",
    reference: "SOP 9.3",
    keyPoints: [
      "Priority is to stop the threat and prevent further harm.",
      "Communicate a clear scene picture to incoming units.",
      "Coordinate casualty access with fire and ambulance services.",
    ],
    sections: [
      {
        heading: "Immediate priorities",
        body: "Where an attacker is actively causing harm, the priority is to locate, confront and stop the threat to prevent further casualties. Bypass casualties only to the extent necessary to neutralise the ongoing danger, then return to provide care.",
      },
      {
        heading: "Communication",
        body: "Provide a clear, calm situation report: location, number and description of attackers, weapons seen, casualties, and a safe approach for backup. Designate a rendezvous point and a forward command point.",
      },
      {
        heading: "Multi-agency coordination",
        body: "Work to a shared model with fire and ambulance services, defining hot, warm and cold zones so medical responders can reach casualties safely. Maintain joint situational awareness throughout.",
      },
    ],
    relatedSlugs: ["pursuit-policy"],
  },
  {
    slug: "body-worn-cameras",
    title: "Body-Worn Camera Use",
    categorySlug: "conduct-ethics",
    summary:
      "When to record, informing the public, and handling footage as evidence.",
    lastUpdated: "2026-03-11",
    reference: "SOP 3.4",
    keyPoints: [
      "Activate for all operational contacts and enforcement actions.",
      "Tell people they are being recorded where practical.",
      "Never edit or delete footage — it is evidence.",
    ],
    sections: [
      {
        heading: "When to record",
        body: "Cameras are activated at the start of any operational contact — stops, searches, arrests, use of force, and incident response — and run until the encounter concludes. Record your reasons if you stop recording early.",
      },
      {
        heading: "Notification and privacy",
        body: "Inform people they are being recorded as soon as practical. Apply judgement in sensitive locations such as hospitals, places of worship and private homes, balancing privacy against the policing purpose.",
      },
      {
        heading: "Handling footage",
        body: "Upload footage at the end of shift to the secure evidence-management system. Footage must never be altered, shared inappropriately, or deleted. Access is audited.",
      },
    ],
    relatedSlugs: ["uof-reporting", "professional-standards"],
  },
  {
    slug: "professional-standards",
    title: "Professional Standards & Integrity",
    categorySlug: "conduct-ethics",
    summary:
      "Core ethical duties, conflicts of interest, and the obligation to report wrongdoing.",
    lastUpdated: "2026-01-27",
    reference: "SOP 3.1",
    keyPoints: [
      "Act with honesty, integrity and impartiality at all times.",
      "Declare conflicts of interest and avoid abuse of position.",
      "Report misconduct — silence is complicity.",
    ],
    sections: [
      {
        heading: "Core duties",
        body: "Officers hold a position of public trust and must act with honesty and integrity, treat people fairly, use their powers only for proper purposes, and uphold the law they enforce — on and off duty.",
      },
      {
        heading: "Conflicts and abuse of position",
        body: "Declare any personal, financial or relationship interest that could affect, or appear to affect, your duties. Using your position for personal advantage, or to pursue an improper relationship with a vulnerable person, is serious misconduct.",
      },
      {
        heading: "Duty to report",
        body: "Officers must report misconduct, corruption or abuse by colleagues. Reporting in good faith is protected; failing to report known wrongdoing is itself a breach of standards.",
      },
    ],
    relatedSlugs: ["body-worn-cameras", "complaints-handling"],
  },
  {
    slug: "complaints-handling",
    title: "Handling Public Complaints",
    categorySlug: "conduct-ethics",
    summary:
      "Receiving complaints courteously and routing them for fair, independent review.",
    lastUpdated: "2026-02-05",
    reference: "SOP 3.6",
    keyPoints: [
      "Anyone may make a complaint — receive it without defensiveness.",
      "Record and forward complaints to professional standards promptly.",
      "Serious matters are referred to independent oversight.",
    ],
    sections: [
      {
        heading: "Receiving a complaint",
        body: "Treat every complainant with courtesy. Listen, record the details accurately, provide a reference, and explain what happens next. Do not attempt to dissuade someone from complaining.",
      },
      {
        heading: "Routing and review",
        body: "Complaints are forwarded to the professional standards unit, which assesses severity and decides on local resolution or formal investigation. Officers must cooperate fully with any investigation.",
      },
      {
        heading: "Independent oversight",
        body: "The most serious allegations — death or serious injury, corruption, or serious misconduct — are referred to the independent oversight body, which may direct or carry out the investigation.",
      },
    ],
    relatedSlugs: ["professional-standards", "uof-reporting"],
  },
];

// ---- Helpers ---------------------------------------------------------------

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getGuideline(slug: string): Guideline | undefined {
  return guidelines.find((g) => g.slug === slug);
}

export function getGuidelinesByCategory(categorySlug: string): Guideline[] {
  return guidelines.filter((g) => g.categorySlug === categorySlug);
}

export function getRelatedGuidelines(guideline: Guideline): Guideline[] {
  return (guideline.relatedSlugs ?? [])
    .map((s) => getGuideline(s))
    .filter((g): g is Guideline => Boolean(g));
}

export function searchGuidelines(query: string): Guideline[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return guidelines
    .map((g) => {
      const haystack = [
        g.title,
        g.summary,
        g.reference,
        getCategory(g.categorySlug)?.name ?? "",
        ...g.keyPoints,
        ...g.sections.flatMap((s) => [s.heading, s.body]),
      ]
        .join(" ")
        .toLowerCase();
      // Simple relevance: title matches rank highest.
      let score = 0;
      if (g.title.toLowerCase().includes(q)) score += 10;
      if (g.summary.toLowerCase().includes(q)) score += 5;
      if (haystack.includes(q)) score += 1;
      return { g, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.g);
}

export function countByCategory(categorySlug: string): number {
  return getGuidelinesByCategory(categorySlug).length;
}
