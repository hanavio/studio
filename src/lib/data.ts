export interface Flashcard {
  term: string;
  definition: string;
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Chapter {
  id: string;
  title: string;
  shortTitle: string;
  lecture: {
    title: string;
    videoUrl: string;
  };
  simulation: {
    title: string;
    videoUrl: string;
  };
  presentation: {
    title: string;
    embedUrl: string;
  };
  quiz: Question[];
  flashcards: Flashcard[];
}

export const chapters: Chapter[] = [
  {
    id: 'periodicity',
    title: 'Chapter 7: Periodicity',
    shortTitle: 'Periodicity',
    lecture: { title: 'Lecture Video', videoUrl: 'https://www.youtube.com/embed/Xt66ThzhUT0' },
    simulation: { title: 'Cartoon Simulation', videoUrl: 'https://www.youtube.com/embed/YINU7_ph7kU' },
    presentation: { title: 'Presentation (PDF)', embedUrl: 'https://drive.google.com/file/d/1vn4D0RhZ0bYL1qEz_MQfkTLivuY35DuY/preview' },
    quiz: [
      {
        question: "Which of the following elements has the highest electronegativity?",
        options: ["Sodium (Na)", "Chlorine (Cl)", "Cesium (Cs)", "Fluorine (F)"],
        correctAnswer: "Fluorine (F)",
      },
      {
        question: "Atomic radius generally decreases across a period from left to right. Why?",
        options: ["The number of electron shells increases.", "The effective nuclear charge increases.", "The number of neutrons increases.", "The electrons get farther from the nucleus."],
        correctAnswer: "The effective nuclear charge increases.",
      },
      {
        question: "What is the name for the elements in Group 17 of the periodic table?",
        options: ["Alkali Metals", "Alkaline Earth Metals", "Halogens", "Noble Gases"],
        correctAnswer: "Halogens",
      },
      {
        question: "Ionization energy is the energy required to...",
        options: ["...add an electron to a neutral atom.", "...remove an electron from a neutral atom.", "...form a chemical bond.", "...break a chemical bond."],
        correctAnswer: "...remove an electron from a neutral atom.",
      },
      {
        question: "Which block of the periodic table contains the transition metals?",
        options: ["s-block", "p-block", "d-block", "f-block"],
        correctAnswer: "d-block",
      },
    ],
    flashcards: [
        { term: 'In the 1800s, before the discovery of subatomic particles, scientists used what property to order the elements?', definition: 'Atomic Mass' },
        { term: 'What was the primary observation in Newlands’ Law of Octaves (1864)?', definition: 'Properties of elements repeat every eighth element when ordered by mass.' },
        { term: 'Newlands\' Law of Octaves was limited because it failed for elements heavier than _____.', definition: 'Calcium' },
        { term: 'Mendeleev’s Periodic Law states that the chemical properties of elements are a periodic function of their _____.', definition: 'Atomic masses' },
        { term: 'How are "Representative Elements" defined in terms of electron configuration?', definition: 'Elements with incompletely filled or subshells.' },
        { term: 'Transition metals are classified by the filling of which specific subshell?', definition: 'd subshell' },
        { term: 'What is the collective term for all non-valence electrons in an atom?', definition: 'Core Electrons' },
        { term: 'Comparing a neutral atom to its cation, which one has a smaller radius?', definition: 'The cation (less electron-electron repulsion and loss of shells).' },
        { term: 'Comparing a neutral atom to its anion, which one has a larger radius?', definition: 'The anion (increased electron-electron repulsion expands the cloud).' },
        { term: 'Define "Ionization Energy".', definition: 'The minimum energy required to remove an electron from a gaseous atom in its ground state.' },
        { term: 'What is the general trend for Ionization Energy as you move left to right across a period?', definition: 'It increases.' },
        { term: 'What is the general trend for Ionization Energy as you move down a group?', definition: 'It decreases.' },
        { term: 'Define "Electron Affinity".', definition: 'The negative of the energy change that occurs when an electron is accepted by an atom in the gaseous state.' },
        { term: 'Which group of elements generally has the highest (most positive/favorable) Electron Affinity?', definition: 'Halogens (Group 7A).' },
        { term: 'Metallic character increases in which direction on the periodic table?', definition: 'Down and to the left (as Ionization Energy decreases).' },
        { term: 'Nonmetallic character increases in which direction on the periodic table?', definition: 'Up and to the right (as Electron Affinity increases).' },
        { term: 'Concept: Periodic Law', definition: 'Definition: The principle that chemical and physical properties of elements are periodic functions of their atomic number.' },
        { term: 'What specific subshell is being filled in the Lanthanide and Actinide series?', definition: 'The f subshell' },
        { term: 'In the context of Electron Affinity, why does Group 2A have lower values than Group 1A?', definition: 'Group 2A has a full subshell, making the addition of an electron less favorable.' },
        { term: 'According to the "Rule of Stability," what electron configuration do elements seek to achieve during reactions?', definition: 'A "closed shell" or Noble Gas configuration.' },
        { term: 'What happens to electron-electron repulsion when an atom loses an electron to become a cation?', definition: 'It reduces, allowing the remaining electrons to be pulled closer to the nucleus.' },
        { term: 'The first ionization equation always involves the removal of an electron from an atom in what state of matter?', definition: 'Gaseous state' },
        { term: 'If an atom has 11 protons and 10 electrons, what is its relationship to a Neon atom (10 protons, 10 electrons)?', definition: 'They are isoelectronic.' },
        { term: 'Mendeleev predicted properties for "Eka-aluminum" including Mass, Density, and what other chemical descriptor?', definition: 'Oxide Formula' },
        { term: 'Transition metals are often referred to as the "____-block" of the periodic table.', definition: 'd-block' },
        { term: 'Is the first Electron Affinity for most elements an endothermic or exothermic process?', definition: 'Exothermic' }
    ]
  },
  {
    id: 'electrochemistry',
    title: 'Chapter 18: Electrochemistry',
    shortTitle: 'Electrochemistry',
    lecture: { title: 'Lecture Video', videoUrl: 'https://www.youtube.com/embed/AVOPnePHbAA' },
    simulation: { title: 'Cartoon Simulation', videoUrl: 'https://www.youtube.com/embed/m7s_yGjg_98' },
    presentation: { title: 'Presentation (PDF)', embedUrl: 'https://drive.google.com/file/d/1cH7PJUR0Z72scMXiEJcysfS3jv37vdBx/preview' },
    quiz: [
      {
        question: "In an electrochemical cell, where does oxidation occur?",
        options: ["At the anode", "At the cathode", "In the salt bridge", "In the external circuit"],
        correctAnswer: "At the anode",
      },
      {
        question: "What is the function of a salt bridge in a galvanic cell?",
        options: ["To transfer electrons between half-cells.", "To mix the solutions of the half-cells.", "To maintain electrical neutrality in the half-cells.", "To provide a surface for reactions."],
        correctAnswer: "To maintain electrical neutrality in the half-cells.",
      },
      {
        question: "Which of the following is a characteristic of a spontaneous reaction in a voltaic cell?",
        options: ["A positive cell potential (E°cell)", "A negative cell potential (E°cell)", "A cell potential of zero", "It requires an external power source."],
        correctAnswer: "A positive cell potential (E°cell)",
      },
      {
        question: "The process of using electricity to drive a non-spontaneous chemical reaction is called:",
        options: ["Galvanization", "Electrolysis", "Corrosion", "Reduction"],
        correctAnswer: "Electrolysis",
      },
      {
        question: "LEO the lion says GER. What does GER stand for?",
        options: ["Gain Electrons is Reduction", "Give Electrons is Reduction", "Gain Electrons is Recharge", "Give Electrons is Rusting"],
        correctAnswer: "Gain Electrons is Reduction",
      },
    ],
    flashcards: [
        { term: "In the context of electrochemical processes, what defines the term 'Oxidation'?", definition: "The loss of electrons from a substance." },
        { term: "In an electrochemical cell, at which electrode does reduction occur?", definition: "The Cathode." },
        { term: "What mnemonic is used to remember the definitions of oxidation and reduction?", definition: "OIL RIG (Oxidation Is Loss, Reduction Is Gain)." },
        { term: "In an electrochemical cell, at which electrode does oxidation occur?", definition: "The Anode." },
        { term: "What is the physical term for the 'force' that drives electrons through an electrochemical circuit?", definition: "Electromotive Force (EMF) or cell potential." },
        { term: "The Law of Thermodynamic Work relates chemical electricity to what value of work?", definition: "The maximum amount of useful work a system can perform." },
        { term: "According to Faraday's Law of Electrolysis, the amount of substance produced is proportional to what factor?", definition: "The amount of electricity (charge) passed through the cell." },
        { term: "What defines a 'Concentration Cell'?", definition: "A cell where both electrodes are made of the same material, but the solutions have different concentrations." },
        { term: "In a concentration cell, in which direction do electrons flow?", definition: "From the dilute solution to the concentrated solution." },
        { term: "According to the Rule of Reactivity, which element is cited as an example of a substance with a high tendency to be reduced?", definition: "Fluorine." },
        { term: "According to the Rule of Reactivity, which element is cited as a strong reducing agent that 'loves to be oxidized'?", definition: "Lithium." },
        { term: "What is the physical meaning of the Faraday Constant (F)?", definition: "The total electrical charge of one mole of electrons." }
    ],
  },
];
