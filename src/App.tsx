import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Volume2, VolumeX, CloudRain, CloudLightning, Wind, Clock, Sparkles,
  BookOpen, Laptop, Disc, Phone, Lamp, Bed, Archive, HelpCircle,
  X, Play, Pause, SkipBack, SkipForward, Headphones, Send, Trash2,
  Plus, RefreshCw, Moon, Sun, MessageSquare, Folder, FileText,
  Globe, Check, ChevronLeft, ChevronRight, Heart, Star, Key, Ticket,
  Image as ImageIcon, Mail, PhoneCall, PhoneMissed, Edit3, Eye
} from 'lucide-react';

const ROOM_PHOTO_URL = 'a214028b.jpeg';
const WINDOW_PHOTO_URL = 'aa9dd370.jpeg';

// ============================================================================
// 1. CONSTANTS, CURATED NOSTALGIC DATA & STORY ARCHIVES
// ============================================================================

const TIME_PRESETS = {
  blueHour: {
    id: 'blueHour',
    label: '7:15 PM',
    title: 'Blue Hour',
    description: 'Dusk settles over wet rooftops. Streetlights flicker on one by one.',
    skyTop: '#1E2D4A',
    skyBottom: '#4A5D7E',
    horizonGlow: 'rgba(217, 165, 102, 0.28)',
    roomTint: 'rgba(28, 42, 68, 0.25)',
    hourAngle: 217.5,
    minuteAngle: 90,
  },
  rainyNight: {
    id: 'rainyNight',
    label: '9:43 PM',
    title: 'Rainy Night',
    description: 'The rain has settled in for the evening. Nowhere left to go.',
    skyTop: '#121B29',
    skyBottom: '#24364D',
    horizonGlow: 'rgba(110, 145, 185, 0.14)',
    roomTint: 'rgba(18, 27, 41, 0.42)',
    hourAngle: 291.5,
    minuteAngle: 258,
  },
  midnight: {
    id: 'midnight',
    label: '12:16 AM',
    title: 'Midnight',
    description: 'The house is asleep. Only the monitor glow and rain remain.',
    skyTop: '#0B101A',
    skyBottom: '#162233',
    horizonGlow: 'rgba(70, 95, 130, 0.10)',
    roomTint: 'rgba(10, 15, 24, 0.58)',
    hourAngle: 8,
    minuteAngle: 96,
  },
  cantSleep: {
    id: 'cantSleep',
    label: '2:07 AM',
    title: "Can't Sleep",
    description: 'Soft moonlight behind heavy clouds. The wall clock ticks slowly.',
    skyTop: '#090E17',
    skyBottom: '#1A293D',
    horizonGlow: 'rgba(165, 195, 225, 0.14)',
    roomTint: 'rgba(9, 14, 23, 0.64)',
    hourAngle: 63.5,
    minuteAngle: 42,
  },
};

const WINDOW_QUOTES = [
  'Some nights feel like they last forever.',
  'Rain makes everything feel a little slower.',
  'Remember when rainy days meant staying home?',
  'Maybe this is all you need tonight.',
  'Some memories feel like rain. You never know when they will return.',
  'Outside is cold. In here, everything is okay.',
  'Watching water race down the glass used to be entertainment enough.',
  'Nobody expects anything from you after 9 PM on a rainy Tuesday.',
];

const RANDOM_MEMORIES = [
  'Remember when the internet made that screeching, singing sound while connecting?',
  'Remember waiting for your sibling to finish using the family computer so you could check your messages?',
  'Remember writing your friend’s initials on the last page of your math notebook?',
  'Remember when weekends felt like an entire season?',
  'Remember saving your favorite 12 songs on a tiny MP3 player and never skipping them?',
  'Remember when adulthood felt like a distant country you wouldn’t visit for decades?',
  'Remember burning a CD with Sharpie handwriting on top and hoping it wouldn’t scratch?',
  'Remember rushing to get a snack during a two-minute TV commercial break?',
  'Remember carefully choosing your away message so one specific person might read it?',
  'Remember the warm static electricity on the glass of an old television screen?',
  'Remember folding paper notes into tiny triangles and passing them under the desk?',
  'Remember looking out the car window at night and pretending a tiny runner was jumping over streetlights?',
  'Remember the distinct smell of rain on hot asphalt right after school let out?',
  'Remember blowing into a game cartridge like it was ancient medicine?',
  'Remember having to memorize your best friend’s home phone number by heart?',
  'Remember staying up under the covers with a small flashlight just to finish one more chapter?',
  'Remember when downloading a single 3MB song took twenty-five minutes?',
  'Remember trading lunch snacks like rare currency in the cafeteria?',
  'Remember the quiet hum of a desktop tower cooling down after you clicked Shut Down?',
  'Remember drawing that cool S in the margins of every single binder?',
  'Remember when a "brb" actually meant five minutes and you came back to say "back"?',
  'Remember watching raindrops merge on the bus window and betting which one would reach the bottom first?',
  'Remember when batteries ran out on your portable player and music slowed down into a deep warble?',
  'Remember the thrill of seeing the school name scroll across the bottom of the morning news on a stormy day?',
  'Remember keeping ticket stubs, candy wrappers, and receipts inside a shoebox under your bed?',
  'Remember sitting cross-legged on the floor in front of a fan in July?',
  'Remember the clicking sound of keyboard keys that required actual effort to press?',
  'Remember calling a friend’s house and politely asking their parent if they were home?',
  'Remember when taking a photo meant waiting days to see if your eyes were closed?',
  'Remember untangling wired earphones for five full minutes before every walk home?',
  'Remember falling asleep in the backseat and waking up magically carried into your bed?',
  'Remember trading holographic stickers and refusing to actually stick them anywhere?',
  'Remember setting five different alarms on a digital clock with glowing red numbers?',
  'Remember the quiet comfort of hearing rain hit an umbrella over your head?',
  'Remember customizing your profile background until the text was barely readable?',
  'Remember when "online" was a place you went to, not a place you lived inside?',
  'Remember saving up coins in an old jam jar for something small you really wanted?',
  'Remember sharing one pair of wired earbuds on a bus ride—left ear for you, right ear for them?',
  'Remember the exact sound of a cassette deck clicking shut?',
  'Remember feeling completely safe inside a blanket fort built from dining chairs?',
  'Remember watching dust motes float in a single afternoon sunbeam?',
  'Remember writing "2007" at the top of a fresh page and thinking it sounded so futuristic?',
  'Remember when losing your place in a book meant folding the corner or using an old receipt?',
  'Remember staring at the ceiling while an entire album played from track one to the end?',
  'Remember how quiet the neighborhood felt right after a heavy evening downpour?',
];

const INITIAL_DIARY_ENTRIES = [
  {
    id: 'd1',
    date: 'November 24, 2007',
    mood: 'quiet',
    content: `It rained again today.\nI stayed home and listened to the radio.\nI think I like days when nothing happens.\n\nMom made soup for dinner and left a mug of tea by my desk. Everyone is asleep now, and the streetlamp outside looks like a blurry yellow moon through the wet glass.`,
    isUser: false,
  },
  {
    id: 'd2',
    date: 'October 18, 2007',
    mood: 'wistful',
    content: `Sometimes I wish I could freeze an ordinary Thursday evening just to remember how the room smelled.\n\nOld paper, warm electronics, damp jackets drying in the hallway. Nothing big happened in class today, yet I feel like I’ll miss this exact version of my life someday.`,
    isUser: false,
  },
  {
    id: 'd3',
    date: 'September 09, 2007',
    mood: 'calm',
    content: `I wonder if the people I sit next to every day will still remember these little moments ten or twenty years from now.\n\nWe spent twenty minutes after school standing under the awning just talking about nothing while waiting for the rain to let up.`,
    isUser: false,
  },
  {
    id: 'd4',
    date: 'August 29, 2007',
    mood: 'nostalgic',
    content: `Summer is almost over. My backpack is packed by the door with brand-new notebooks that still smell like ink.\n\nToday was ordinary. Maybe ordinary days are the ones we miss the most.`,
    isUser: false,
  },
];

const BOOKSHELF_BOOKS = [
  {
    id: 'b1',
    title: 'Things We Forgot',
    author: 'A. Mercer',
    spineColor: '#5D473A',
    accentColor: '#D9A566',
    height: 'h-44',
    pages: [
      'We remember birthdays, graduations, and big trips. Yet most of childhood was built out of afternoons whose dates nobody wrote down—walking home with untied shoelaces, kicking the same pebble three blocks.',
      'There was a specific shade of blue the sky turned at 5:30 PM in November. You never photographed it. You simply stood on the porch with cold hands and breathed it in.',
      'Forgetting is not losing. Sometimes the details dissolve so only the warmth remains.',
    ],
  },
  {
    id: 'b2',
    title: 'Letters to My Younger Self',
    author: 'H. Sato',
    spineColor: '#3A4F63',
    accentColor: '#E8DCC7',
    height: 'h-48',
    pages: [
      'You are worrying far too much tonight about saying the wrong thing in the hallway this morning. Nobody else is keeping score the way you think they are.',
      'Keep your old notebooks. Even the messy ones with half-finished drawings in the margins. One day you will open them and recognize your own voice immediately.',
      'You do not have to figure out your whole life before midnight. Just drink some water, listen to your favorite song twice, and get some rest.',
    ],
  },
  {
    id: 'b3',
    title: 'Ordinary Days',
    author: 'E. Lindqvist',
    spineColor: '#7A5855',
    accentColor: '#F2E8D5',
    height: 'h-40',
    pages: [
      'The kettle whistling in the kitchen while rain taps a steady rhythm against the windowpane. A folded sweater on the chair. A bookmark resting halfway through a paperback.',
      'Nothing dramatic is happening tonight. No plot twist, no urgent phone call. Just time passing gently, like water moving under a quiet bridge.',
      'If you pay close attention, an ordinary evening contains more peace than most vacations ever manage to find.',
    ],
  },
  {
    id: 'b4',
    title: 'People Who Left',
    author: 'M. Vance',
    spineColor: '#4A5548',
    accentColor: '#D9A566',
    height: 'h-46',
    pages: [
      'There is a strange tenderness in thinking about friends you haven’t spoken to in years—people with whom you once shared inside jokes nobody else on earth could decode.',
      'Most friendships do not end with an argument. They simply drift apart like two paper boats placed in different streams after a summer rainstorm.',
      'Wherever they are tonight, I hope the rain sounds kind on their roof too.',
    ],
  },
  {
    id: 'b5',
    title: 'Somewhere in Summer',
    author: 'C. Moreau',
    spineColor: '#8C6D46',
    accentColor: '#FFF5E4',
    height: 'h-44',
    pages: [
      'July evenings smelled like cut grass, sunscreen, and warm pavement cooling down after sunset. Fireflies blinked near the hedges while crickets took over the night shift.',
      'We stayed outside until the streetlights hummed on, believing the summer holidays would stretch out forever without ever reaching September.',
      'Even in the middle of a rainy November night, a small piece of August stays tucked inside a drawer.',
    ],
  },
  {
    id: 'b6',
    title: 'The Little Things',
    author: 'N. Takahashi',
    spineColor: '#3D3547',
    accentColor: '#AA8582',
    height: 'h-42',
    pages: [
      'The soft click of a desk lamp switch. The warm amber pool of light it casts across wood grain. The quiet whir of a computer fan settling down.',
      'A half-erased pencil note in the corner of a page. An old key whose lock you no longer remember, kept simply because it felt too important to throw away.',
      'Life rarely announces its best moments while they are happening. It hides them inside small, quiet rooms like this one.',
    ],
  },
];

const PHONE_THREADS = [
  {
    id: 't1',
    name: 'Sam',
    number: '555-0148',
    messages: [
      { from: 'them', text: 'hey did u finish the history worksheet?', time: '6:12 PM' },
      { from: 'me', text: 'barely lol question 4 makes no sense', time: '6:15 PM' },
      { from: 'them', text: 'same. are you coming tomorrow?', time: '8:41 PM' },
      { from: 'me', text: 'maybe, mom said we might visit grandma', time: '8:44 PM' },
      { from: 'them', text: 'okay bring that game lol', time: '8:45 PM' },
    ],
  },
  {
    id: 't2',
    name: 'Maya',
    number: '555-0192',
    messages: [
      { from: 'them', text: 'you still awake?', time: '9:31 PM' },
      { from: 'me', text: 'yeah just listening to music', time: '9:33 PM' },
      { from: 'them', text: "it's raining here too", time: '9:35 PM' },
      { from: 'me', text: 'i wish summer would come back', time: '9:38 PM' },
      { from: 'them', text: 'same... see u monday if it doesnt flood', time: '9:40 PM' },
    ],
  },
  {
    id: 't3',
    name: 'Mom',
    number: '555-0101',
    messages: [
      { from: 'them', text: 'Dont forget your umbrella in the hallway tomorrow morning.', time: '7:50 PM' },
      { from: 'me', text: 'okay i put it by my bag', time: '7:55 PM' },
      { from: 'them', text: 'Goodnight, turn your computer off before 11.', time: '9:10 PM' },
    ],
  },
];

const CALL_HISTORY = [
  { name: 'Sam', type: 'missed', time: 'Today, 5:42 PM', duration: 'Missed call' },
  { name: 'Maya', type: 'received', time: 'Yesterday, 8:15 PM', duration: '14m 22s' },
  { name: 'Home', type: 'dialed', time: 'Nov 22, 4:05 PM', duration: '1m 08s' },
  { name: 'Alex', type: 'missed', time: 'Nov 20, 6:30 PM', duration: 'Missed call' },
];

const DRAWER_KEEPSAKES = [
  {
    id: 'k1',
    title: 'Faded Cinema Ticket',
    subtitle: 'Row G · Seat 11 · Matinee',
    icon: 'ticket',
    story: 'Found this ticket from a Saturday afternoon that seemed completely ordinary at the time. I don’t remember much about the movie itself—just sharing popcorn and walking out into the cool evening air.',
  },
  {
    id: 'k2',
    title: 'Folded Graph-Paper Note',
    subtitle: 'Creased into eight tiny squares',
    icon: 'mail',
    story: 'Passed across two rows during fourth period. Inside in blue gel pen: "Are we still hanging out after the bell? Tell Sam to bring his MP3 player."',
  },
  {
    id: 'k3',
    title: 'Braided Friendship Bracelet',
    subtitle: 'Faded navy, cream, and dusty rose thread',
    icon: 'heart',
    story: 'The knot finally slipped loose last spring, so it ended up in this drawer. Two threads are frayed at the end from wearing it all through summer camp.',
  },
  {
    id: 'k4',
    title: 'Small Brass Key',
    subtitle: 'No tag attached',
    icon: 'key',
    story: 'It might belong to an old diary lock, a bicycle chain, or a desk drawer from two houses ago. You keep it anyway, just in case.',
  },
  {
    id: 'k5',
    title: 'Origami Paper Star',
    subtitle: 'Folded from a strip of lined notebook paper',
    icon: 'star',
    story: 'You made dozens of these during long rainy afternoons, filling an old glass jar until the lid barely closed.',
  },
  {
    id: 'k6',
    title: 'Overexposed 35mm Snapshot',
    subtitle: 'Dated August 2007 on the back',
    icon: 'image',
    story: 'Taken with a disposable camera near sunset. Half the frame is golden lens flare, and everyone is squinting and laughing at the same time.',
  },
];

const MSN_CONTACTS = [
  {
    id: 'c1',
    name: '~*Maya*~',
    status: 'online',
    statusText: 'Listening to music ♫ - Rainy Day Mix',
    avatarColor: '#AA8582',
    messages: [
      { sender: '~*Maya*~', text: 'hey!! did u hear the thunder just now?', time: '9:34 PM' },
      { sender: 'You', text: 'yeah my whole window rattled lol', time: '9:35 PM' },
      { sender: '~*Maya*~', text: 'i love nights like this honestly. zero homework left', time: '9:37 PM' },
      { sender: '~*Maya*~', text: 'send me that wallpaper u made yesterday!', time: '9:41 PM' },
    ],
  },
  {
    id: 'c2',
    name: 'Sam_07',
    status: 'away',
    statusText: 'brb getting snacks',
    avatarColor: '#4A707A',
    messages: [
      { sender: 'Sam_07', text: 'yo', time: '8:50 PM' },
      { sender: 'Sam_07', text: 'are we beating that final level tomorrow or what', time: '8:51 PM' },
      { sender: 'You', text: 'for sure, i finally figured out the puzzle', time: '8:55 PM' },
      { sender: 'Sam_07', text: 'niceee brb mom is calling me', time: '8:56 PM' },
    ],
  },
  {
    id: 'c3',
    name: 'Alex [Busy]',
    status: 'busy',
    statusText: "Don't disturb, doing homework",
    avatarColor: '#8C6D46',
    messages: [
      { sender: 'You', text: 'did u get question 7 on the bio sheet?', time: '7:40 PM' },
      { sender: 'Alex [Busy]', text: 'its mitosis!! check page 114', time: '7:44 PM' },
      { sender: 'You', text: 'lifesaver thank u', time: '7:45 PM' },
    ],
  },
  {
    id: 'c4',
    name: 'Chloe_xX',
    status: 'online',
    statusText: 'just bored lol',
    avatarColor: '#6E5B7B',
    messages: [
      { sender: 'Chloe_xX', text: 'why does sunday night always go by 10x faster than friday', time: '9:12 PM' },
      { sender: 'You', text: 'scientists still cant explain it', time: '9:15 PM' },
    ],
  },
  {
    id: 'c5',
    name: 'Leo_93',
    status: 'offline',
    statusText: 'missing summer',
    avatarColor: '#5C6670',
    messages: [
      { sender: 'Leo_93', text: 'gnight man, catch u at the bus stop', time: 'Yesterday' },
    ],
  },
];

const PLAYLISTS = {
  rainyNight: {
    id: 'rainyNight',
    name: 'Rainy Night',
    subtitle: 'Soft electric piano & warm chords',
    tracks: [
      { title: '9:43 PM Through Glass', duration: '3:12', tempo: 68, chords: [[261.63, 329.63, 392.00, 493.88], [220.00, 261.63, 329.63, 392.00], [174.61, 220.00, 261.63, 349.23], [196.00, 246.94, 293.66, 392.00]] },
      { title: 'Streetlights on Wet Asphalt', duration: '2:48', tempo: 62, chords: [[293.66, 349.23, 440.00, 523.25], [196.00, 246.94, 293.66, 349.23], [261.63, 329.63, 392.00, 493.88], [220.00, 261.63, 329.63, 440.00]] },
      { title: 'Porch Light Hum', duration: '3:35', tempo: 60, chords: [[174.61, 220.00, 261.63, 329.63], [164.81, 196.00, 246.94, 293.66], [146.83, 174.61, 220.00, 261.63], [196.00, 246.94, 293.66, 392.00]] },
    ],
  },
  oldMemories: {
    id: 'oldMemories',
    name: 'Old Memories',
    subtitle: 'Dreamy lo-fi tape warmth',
    tracks: [
      { title: 'Shoebox Full of Tickets', duration: '2:56', tempo: 72, chords: [[246.94, 293.66, 369.99, 440.00], [196.00, 246.94, 293.66, 369.99], [293.66, 369.99, 440.00, 554.37], [220.00, 277.18, 329.63, 415.30]] },
      { title: 'Walk Home After 4 PM', duration: '3:18', tempo: 66, chords: [[261.63, 329.63, 392.00, 440.00], [174.61, 220.00, 261.63, 329.63], [220.00, 261.63, 329.63, 392.00], [196.00, 246.94, 293.66, 349.23]] },
      { title: 'Faded Polaroid', duration: '3:04', tempo: 64, chords: [[220.00, 261.63, 329.63, 493.88], [174.61, 220.00, 261.63, 392.00], [261.63, 329.63, 392.00, 493.88], [196.00, 246.94, 293.66, 392.00]] },
    ],
  },
  quietMoments: {
    id: 'quietMoments',
    name: 'Quiet Moments',
    subtitle: 'Minimal late-night soundscapes',
    tracks: [
      { title: '2:07 AM Ceiling Stare', duration: '4:02', tempo: 54, chords: [[196.00, 246.94, 293.66, 392.00], [164.81, 246.94, 293.66, 369.99], [146.83, 220.00, 261.63, 329.63], [130.81, 196.00, 246.94, 293.66]] },
      { title: 'Pages Turning Slowly', duration: '3:40', tempo: 56, chords: [[261.63, 392.00, 493.88], [220.00, 329.63, 392.00], [174.61, 261.63, 349.23], [196.00, 293.66, 392.00]] },
    ],
  },
};

// ============================================================================
// 2. PROCEDURAL WEB AUDIO ENGINE (AMBIENT LOOPS + CASSETTE SYNTHESIZER)
// ============================================================================

class NostalgicAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.ambientGain = null;
    this.musicGain = null;
    this.headphoneFilter = null;

    this.rainNode = null;
    this.rainGain = null;
    this.rainFilter = null;

    this.windGain = null;
    this.roomToneGain = null;
    this.tickInterval = null;
    this.musicInterval = null;
    this.chordStep = 0;

    this.initialized = false;
  }

  init() {
    if (this.initialized) {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.75;
    this.masterGain.connect(this.ctx.destination);

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.value = 0.8;
    this.ambientGain.connect(this.masterGain);

    this.headphoneFilter = this.ctx.createBiquadFilter();
    this.headphoneFilter.type = 'lowpass';
    this.headphoneFilter.frequency.value = 18000; // Open by default; 1400Hz when headphones on

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 0.55;
    this.musicGain.connect(this.headphoneFilter);
    this.headphoneFilter.connect(this.masterGain);

    this._setupRain();
    this._setupWind();
    this._setupRoomTone();

    this.initialized = true;
  }

  _createNoiseBuffer(seconds = 4) {
    const bufferSize = this.ctx.sampleRate * seconds;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Warm pink-brown hybrid noise
      data[i] = (lastOut + 0.04 * white) / 1.04;
      lastOut = data[i];
      data[i] *= 2.8;
    }
    return buffer;
  }

  _setupRain() {
    const noise = this.ctx.createBufferSource();
    noise.buffer = this._createNoiseBuffer(5);
    noise.loop = true;

    this.rainFilter = this.ctx.createBiquadFilter();
    this.rainFilter.type = 'bandpass';
    this.rainFilter.frequency.value = 950;
    this.rainFilter.Q.value = 0.55;

    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.value = 0.0001;

    noise.connect(this.rainFilter);
    this.rainFilter.connect(this.rainGain);
    this.rainGain.connect(this.ambientGain);
    noise.start();
  }

  _setupWind() {
    const noise = this.ctx.createBufferSource();
    noise.buffer = this._createNoiseBuffer(6);
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 340;
    filter.Q.value = 3.2;

    this.windGain = this.ctx.createGain();
    this.windGain.gain.value = 0.0001;

    noise.connect(filter);
    filter.connect(this.windGain);
    this.windGain.connect(this.ambientGain);
    noise.start();
  }

  _setupRoomTone() {
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 58; // Soft cozy appliance/room hum

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 110;

    this.roomToneGain = this.ctx.createGain();
    this.roomToneGain.gain.value = 0.0001;

    osc.connect(filter);
    filter.connect(this.roomToneGain);
    this.roomToneGain.connect(this.ambientGain);
    osc.start();
  }

  setMasterVolume(val, muted) {
    if (!this.initialized) return;
    const target = muted ? 0.0001 : Math.max(0.0001, val);
    this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.15);
  }

  setHeadphonesMode(enabled) {
    if (!this.initialized) return;
    const freq = enabled ? 1350 : 18000;
    this.headphoneFilter.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.3);
  }

  updateAmbient({ rainOn, rainIntensity, windOn, roomToneOn, clockTickOn }) {
    if (!this.initialized) return;
    const now = this.ctx.currentTime;

    const rainTarget = rainOn ? 0.08 + (rainIntensity / 100) * 0.28 : 0.0001;
    const rainFreq = 750 + (rainIntensity / 100) * 650;
    this.rainGain.gain.setTargetAtTime(rainTarget, now, 0.35);
    this.rainFilter.frequency.setTargetAtTime(rainFreq, now, 0.35);

    this.windGain.gain.setTargetAtTime(windOn ? 0.07 : 0.0001, now, 0.4);
    this.roomToneGain.gain.setTargetAtTime(roomToneOn ? 0.055 : 0.0001, now, 0.4);

    if (clockTickOn && !this.tickInterval) {
      let tickState = false;
      this.tickInterval = setInterval(() => {
        if (!this.ctx || this.ctx.state !== 'running') return;
        this._playTick(tickState);
        tickState = !tickState;
      }, 1000);
    } else if (!clockTickOn && this.tickInterval) {
      clearInterval(this.tickInterval);
      this.tickInterval = null;
    }
  }

  _playTick(high) {
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(high ? 920 : 760, t);
    osc.frequency.exponentialRampToValueAtTime(180, t + 0.03);

    gain.gain.setValueAtTime(0.018, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);

    osc.connect(gain);
    gain.connect(this.ambientGain);
    osc.start(t);
    osc.stop(t + 0.04);
  }

  triggerThunder() {
    if (!this.initialized || this.ctx.state !== 'running') return;
    const t = this.ctx.currentTime;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this._createNoiseBuffer(4);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, t);
    filter.frequency.exponentialRampToValueAtTime(55, t + 2.8);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.32, t + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 3.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ambientGain);
    noise.start(t);
    noise.stop(t + 3.5);
  }

  startMusic(track, volume = 0.6) {
    if (!this.initialized) return;
    this.stopMusic();
    this.musicGain.gain.setTargetAtTime(Math.max(0.0001, volume * 0.65), this.ctx.currentTime, 0.2);

    const beatMs = (60 / (track.tempo || 65)) * 1000 * 4;
    const playChord = () => {
      if (!this.ctx || this.ctx.state !== 'running') return;
      const chord = track.chords[this.chordStep % track.chords.length];
      this.chordStep++;
      const now = this.ctx.currentTime;
      const dur = beatMs / 1000;

      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const subOsc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        // Warm electric piano / cassette tape pad blend
        osc.type = 'sine';
        subOsc.type = 'triangle';
        // Subtle tape wow/flutter detune
        const detune = (Math.random() - 0.5) * 6;
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        subOsc.frequency.setValueAtTime(freq * 0.5, now + idx * 0.04);
        osc.detune.value = detune;

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(950, now);
        filter.frequency.exponentialRampToValueAtTime(420, now + dur);

        noteGain.gain.setValueAtTime(0.0001, now + idx * 0.04);
        noteGain.gain.linearRampToValueAtTime(0.055, now + idx * 0.04 + 0.18);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + dur * 0.96);

        osc.connect(filter);
        subOsc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.musicGain);

        osc.start(now + idx * 0.04);
        subOsc.start(now + idx * 0.04);
        osc.stop(now + dur);
        subOsc.stop(now + dur);
      });
    };

    playChord();
    this.musicInterval = setInterval(playChord, beatMs);
  }

  setMusicVolume(volume) {
    if (!this.initialized) return;
    this.musicGain.gain.setTargetAtTime(Math.max(0.0001, volume * 0.65), this.ctx.currentTime, 0.15);
  }

  stopMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

const audioEngine = new NostalgicAudioEngine();

// ============================================================================
// 2B. PROCEDURAL PHOTOREALISTIC DATA-URL SCENE GENERATORS
// ============================================================================

function generateWindowBackdropDataURL(presetId = 'rainyNight', lampOn = true) {
  if (typeof document === 'undefined') return '';
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');

  // Night sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 520);
  if (presetId === 'blueHour') {
    skyGrad.addColorStop(0, '#1D2E4D');
    skyGrad.addColorStop(0.65, '#3E5578');
    skyGrad.addColorStop(1, '#586278');
  } else if (presetId === 'midnight' || presetId === 'cantSleep') {
    skyGrad.addColorStop(0, '#090E17');
    skyGrad.addColorStop(0.7, '#142033');
    skyGrad.addColorStop(1, '#1A273B');
  } else {
    skyGrad.addColorStop(0, '#111A29');
    skyGrad.addColorStop(0.65, '#22344D');
    skyGrad.addColorStop(1, '#1B283B');
  }
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, 1280, 720);

  // Soft distant clouds
  for (let i = 0; i < 14; i++) {
    const cx = (i * 110) % 1280;
    const cy = 60 + (i % 4) * 55;
    const rg = ctx.createRadialGradient(cx, cy, 10, cx, cy, 180);
    rg.addColorStop(0, 'rgba(130, 160, 195, 0.08)');
    rg.addColorStop(1, 'rgba(130, 160, 195, 0)');
    ctx.fillStyle = rg;
    ctx.fillRect(cx - 180, cy - 180, 360, 360);
  }

  // Distant suburban rooftops & tree silhouettes
  ctx.fillStyle = '#0D141F';
  ctx.beginPath();
  ctx.moveTo(0, 460);
  ctx.lineTo(140, 430);
  ctx.lineTo(240, 390);
  ctx.lineTo(350, 435);
  ctx.lineTo(520, 425);
  ctx.lineTo(640, 385);
  ctx.lineTo(760, 430);
  ctx.lineTo(960, 415);
  ctx.lineTo(1080, 380);
  ctx.lineTo(1200, 425);
  ctx.lineTo(1280, 420);
  ctx.lineTo(1280, 720);
  ctx.lineTo(0, 720);
  ctx.closePath();
  ctx.fill();

  // Warm glowing neighbor windows in the distance
  const houseWindows = [
    [225, 425], [250, 425], [625, 415], [1065, 412], [1092, 412], [460, 445],
  ];
  houseWindows.forEach(([wx, wy]) => {
    ctx.fillStyle = 'rgba(235, 185, 110, 0.35)';
    ctx.fillRect(wx, wy, 12, 16);
  });

  // Wet asphalt street & blurred golden bokeh streetlights
  const roadGrad = ctx.createLinearGradient(0, 470, 0, 720);
  roadGrad.addColorStop(0, '#101824');
  roadGrad.addColorStop(1, '#090D14');
  ctx.fillStyle = roadGrad;
  ctx.fillRect(0, 470, 1280, 250);

  const bokehLights = [
    { x: 260, y: 375, r: 42, color: '255, 200, 115' },
    { x: 540, y: 395, r: 34, color: '255, 190, 105' },
    { x: 840, y: 365, r: 48, color: '255, 208, 130' },
    { x: 1110, y: 390, r: 32, color: '255, 185, 100' },
    { x: 430, y: 455, r: 18, color: '235, 95, 85' },
    { x: 710, y: 460, r: 16, color: '245, 225, 185' },
  ];

  bokehLights.forEach((b) => {
    // Streetlight halo
    const g = ctx.createRadialGradient(b.x, b.y, 2, b.x, b.y, b.r * 1.9);
    g.addColorStop(0, `rgba(${b.color}, 0.75)`);
    g.addColorStop(0.35, `rgba(${b.color}, 0.25)`);
    g.addColorStop(1, `rgba(${b.color}, 0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r * 1.9, 0, Math.PI * 2);
    ctx.fill();

    // Wet road vertical reflection shimmer
    const refGrad = ctx.createLinearGradient(b.x, 475, b.x, 700);
    refGrad.addColorStop(0, `rgba(${b.color}, 0.24)`);
    refGrad.addColorStop(1, `rgba(${b.color}, 0)`);
    ctx.fillStyle = refGrad;
    ctx.fillRect(b.x - b.r * 0.45, 475, b.r * 0.9, 220);
  });

  // Double-hung wooden window frame & central sash bar
  ctx.fillStyle = '#181412';
  ctx.fillRect(0, 0, 1280, 26);
  ctx.fillRect(0, 680, 1280, 40);
  ctx.fillRect(0, 0, 34, 720);
  ctx.fillRect(1246, 0, 34, 720);

  // Horizontal meeting rail across middle
  const railGrad = ctx.createLinearGradient(0, 344, 0, 376);
  railGrad.addColorStop(0, '#2B231F');
  railGrad.addColorStop(0.5, '#1D1714');
  railGrad.addColorStop(1, '#120E0C');
  ctx.fillStyle = railGrad;
  ctx.fillRect(0, 344, 1280, 32);

  // Brass sash lock on meeting rail
  ctx.fillStyle = lampOn ? '#C89854' : '#6B5638';
  ctx.fillRect(622, 336, 36, 12);

  return canvas.toDataURL('image/jpeg', 0.88);
}

function generateBedroomSceneDataURL(presetId = 'rainyNight', lampOn = true) {
  if (typeof document === 'undefined') return '';
  const canvas = document.createElement('canvas');
  canvas.width = 1440;
  canvas.height = 810;
  const ctx = canvas.getContext('2d');

  // 1. Bedroom Wall & Ceiling Base
  const wallGrad = ctx.createLinearGradient(0, 0, 1440, 810);
  if (lampOn) {
    wallGrad.addColorStop(0, '#2A221E');
    wallGrad.addColorStop(0.45, '#3D2F27');
    wallGrad.addColorStop(1, '#1E1917');
  } else {
    wallGrad.addColorStop(0, '#121924');
    wallGrad.addColorStop(0.5, '#18212E');
    wallGrad.addColorStop(1, '#0E131C');
  }
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, 1440, 810);

  // Warm tungsten radial pool on wall around lamp
  if (lampOn) {
    const lampHalo = ctx.createRadialGradient(410, 390, 20, 460, 410, 620);
    lampHalo.addColorStop(0, 'rgba(235, 178, 102, 0.55)');
    lampHalo.addColorStop(0.45, 'rgba(217, 155, 82, 0.22)');
    lampHalo.addColorStop(1, 'rgba(42, 34, 30, 0)');
    ctx.fillStyle = lampHalo;
    ctx.fillRect(0, 0, 1440, 810);
  }

  // 2. Left Rainy Window (Aligned with x: 6%..32%, y: 9%..62% -> x: 86..460, y: 73..502)
  const wx = 86, wy = 73, ww = 374, wh = 429;
  const skyGrad = ctx.createLinearGradient(wx, wy, wx, wy + wh);
  if (presetId === 'blueHour') {
    skyGrad.addColorStop(0, '#223659');
    skyGrad.addColorStop(1, '#4C648A');
  } else if (presetId === 'midnight' || presetId === 'cantSleep') {
    skyGrad.addColorStop(0, '#0A101A');
    skyGrad.addColorStop(1, '#18263B');
  } else {
    skyGrad.addColorStop(0, '#131E30');
    skyGrad.addColorStop(1, '#263B57');
  }
  ctx.fillStyle = skyGrad;
  ctx.fillRect(wx, wy, ww, wh);

  // Outside rooftops & bokeh lights inside window
  ctx.fillStyle = '#0D1420';
  ctx.fillRect(wx, wy + 275, ww, wh - 275);
  [
    [wx + 95, wy + 245, 26],
    [wx + 245, wy + 235, 32],
    [wx + 315, wy + 255, 20],
  ].forEach(([bx, by, br]) => {
    const bg = ctx.createRadialGradient(bx, by, 2, bx, by, br);
    bg.addColorStop(0, 'rgba(255, 202, 120, 0.75)');
    bg.addColorStop(1, 'rgba(255, 202, 120, 0)');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.fill();
  });

  // Window Wooden Casing & Muntins
  ctx.strokeStyle = lampOn ? '#5A4638' : '#242A34';
  ctx.lineWidth = 14;
  ctx.strokeRect(wx, wy, ww, wh);
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(wx + ww / 2, wy);
  ctx.lineTo(wx + ww / 2, wy + wh);
  ctx.moveTo(wx, wy + wh / 2);
  ctx.lineTo(wx + ww, wy + wh / 2);
  ctx.stroke();

  // 3. Wall Clock (Aligned with x: 41%..50%, y: 10%..24% -> cx: 655, cy: 138)
  const cx = 655, cy = 138, cr = 54;
  ctx.fillStyle = lampOn ? '#E8DCC7' : '#8A96A8';
  ctx.beginPath();
  ctx.arc(cx, cy, cr, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#3B2D25';
  ctx.lineWidth = 7;
  ctx.stroke();

  // Clock hands
  const preset = TIME_PRESETS[presetId] || TIME_PRESETS.rainyNight;
  ctx.strokeStyle = '#1E1A18';
  ctx.lineCap = 'round';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  const hRad = ((preset.hourAngle - 90) * Math.PI) / 180;
  ctx.lineTo(cx + Math.cos(hRad) * 28, cy + Math.sin(hRad) * 28);
  ctx.stroke();

  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  const mRad = ((preset.minuteAngle - 90) * Math.PI) / 180;
  ctx.lineTo(cx + Math.cos(mRad) * 40, cy + Math.sin(mRad) * 40);
  ctx.stroke();

  // 4. Taped Wall Poster (Aligned with x: 53%..64%, y: 14%..37% -> x: 763..921, y: 113..300)
  ctx.fillStyle = lampOn ? '#354863' : '#1E2A3B';
  ctx.fillRect(765, 115, 152, 182);
  ctx.strokeStyle = '#E8DCC7';
  ctx.lineWidth = 2;
  ctx.strokeRect(765, 115, 152, 182);
  // Minimalist sunset/horizon art inside poster
  const pGrad = ctx.createLinearGradient(765, 115, 765, 297);
  pGrad.addColorStop(0, '#223552');
  pGrad.addColorStop(0.6, '#AA8582');
  pGrad.addColorStop(1, '#D9A566');
  ctx.fillStyle = pGrad;
  ctx.fillRect(771, 121, 140, 170);

  // 5. Wooden Bookshelf (Aligned with x: 66%..83%, y: 12%..65% -> x: 950..1195, y: 97..526)
  ctx.fillStyle = lampOn ? '#49382F' : '#231E1D';
  ctx.fillRect(950, 97, 245, 430);
  ctx.fillStyle = lampOn ? '#2E221C' : '#161312';
  [115, 220, 325, 430].forEach((sy) => {
    ctx.fillRect(962, sy, 221, 88);
    // Colorful muted book spines
    let bx = 968;
    const bookColors = ['#6B5444', '#3A4F63', '#7A5855', '#4A5548', '#8C6D46', '#5D473A', '#3D3547'];
    for (let b = 0; b < 9; b++) {
      const bw = 18 + ((b * 7) % 8);
      const bh = 66 + ((b * 11) % 18);
      ctx.fillStyle = lampOn ? bookColors[b % bookColors.length] : '#262B33';
      ctx.fillRect(bx, sy + 88 - bh, bw, bh);
      bx += bw + 3;
    }
    ctx.fillStyle = lampOn ? '#2E221C' : '#161312';
  });

  // 6. Dark Wood Desk (Spans x: 18%..66%, y: 58%..88% -> x: 255..950, y: 470..715)
  ctx.fillStyle = lampOn ? '#49382F' : '#211C1B';
  ctx.fillRect(255, 488, 695, 24);
  ctx.fillStyle = lampOn ? '#362922' : '#181414';
  ctx.fillRect(275, 512, 655, 200);

  // Desk Drawer on right side (Aligned with x: 53%..65%, y: 69%..85% -> x: 763..935, y: 558..688)
  ctx.fillStyle = lampOn ? '#42322A' : '#1F1B1A';
  ctx.fillRect(763, 558, 172, 130);
  ctx.strokeStyle = '#241B16';
  ctx.lineWidth = 3;
  ctx.strokeRect(763, 558, 172, 62);
  ctx.strokeRect(763, 624, 172, 64);
  ctx.fillStyle = '#D9A566';
  ctx.beginPath();
  ctx.arc(849, 589, 5, 0, Math.PI * 2);
  ctx.arc(849, 656, 5, 0, Math.PI * 2);
  ctx.fill();

  // 7. Desk Lamp (Aligned with x: 23%..33%, y: 39%..62% -> x: 385, y: 320..488)
  ctx.fillStyle = '#6B5444';
  ctx.fillRect(365, 476, 54, 12);
  ctx.strokeStyle = '#8C6D46';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(392, 476);
  ctx.lineTo(382, 405);
  ctx.lineTo(405, 345);
  ctx.stroke();
  // Lamp shade
  ctx.fillStyle = lampOn ? '#E8B872' : '#4A433E';
  ctx.beginPath();
  ctx.moveTo(372, 362);
  ctx.lineTo(438, 362);
  ctx.lineTo(422, 326);
  ctx.lineTo(388, 326);
  ctx.closePath();
  ctx.fill();

  // 8. Beige CRT Computer Monitor (Aligned with x: 34%..51%, y: 36%..61% -> x: 495..730, y: 295..488)
  // Stand
  ctx.fillStyle = lampOn ? '#BDB3A2' : '#4F555E';
  ctx.fillRect(575, 464, 76, 24);
  // Outer beige casing
  ctx.fillStyle = lampOn ? '#CFC5B4' : '#585F69';
  ctx.beginPath();
  ctx.roundRect(495, 295, 235, 172, 12);
  ctx.fill();
  // Glowing CRT glass screen
  const crtGrad = ctx.createLinearGradient(512, 310, 712, 450);
  crtGrad.addColorStop(0, '#2B5B9E');
  crtGrad.addColorStop(1, '#1A3B6E');
  ctx.fillStyle = crtGrad;
  ctx.beginPath();
  ctx.roundRect(512, 310, 200, 140, 8);
  ctx.fill();
  // Tiny desktop icons & taskbar inside CRT
  ctx.fillStyle = '#245EDC';
  ctx.fillRect(512, 436, 200, 14);
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.fillRect(524, 324, 12, 12);
  ctx.fillRect(524, 346, 12, 12);
  ctx.fillRect(555, 328, 125, 88);

  // 9. Open Spiral Diary (Aligned with x: 23%..36%, y: 61%..72% -> x: 335..510, y: 495..575)
  ctx.fillStyle = lampOn ? '#E8DCC7' : '#7E8794';
  ctx.beginPath();
  ctx.roundRect(338, 496, 172, 76, 4);
  ctx.fill();
  ctx.strokeStyle = '#6B5444';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(424, 496);
  ctx.lineTo(424, 572);
  ctx.stroke();

  // 10. Cassette Player & Wired Headphones (Aligned with x: 52%..67%, y: 53%..68% -> x: 750..940, y: 432..488)
  ctx.fillStyle = lampOn ? '#545861' : '#2C313A';
  ctx.beginPath();
  ctx.roundRect(752, 444, 108, 44, 6);
  ctx.fill();
  ctx.fillStyle = '#1D2024';
  ctx.fillRect(772, 454, 68, 22);
  // Headphones next to cassette deck
  ctx.strokeStyle = '#2B2D30';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(898, 466, 22, Math.PI, 0);
  ctx.stroke();
  ctx.fillStyle = '#3B3E45';
  ctx.beginPath();
  ctx.arc(876, 472, 9, 0, Math.PI * 2);
  ctx.arc(920, 472, 9, 0, Math.PI * 2);
  ctx.fill();

  // 11. Candybar Keypad Phone (Aligned with x: 48%..54%, y: 64%..73% -> x: 695..765, y: 515..575)
  ctx.fillStyle = '#2B2F36';
  ctx.beginPath();
  ctx.roundRect(702, 516, 46, 62, 8);
  ctx.fill();
  ctx.fillStyle = '#8FA893';
  ctx.fillRect(709, 523, 32, 22);

  // 12. Cozy Unmade Bed & Pillows (Foreground right: x: 67%..100%, y: 55%..100% -> x: 965..1440, y: 445..810)
  // Mattress & soft quilt
  ctx.fillStyle = lampOn ? '#3A4556' : '#1B222E';
  ctx.beginPath();
  ctx.roundRect(965, 515, 485, 305, 24);
  ctx.fill();
  // Folded dusty-rose & cream blanket layer
  ctx.fillStyle = lampOn ? '#7A5855' : '#33282B';
  ctx.beginPath();
  ctx.roundRect(965, 565, 485, 255, 20);
  ctx.fill();
  // Soft Pillow (Aligned with x: 76%..92%, y: 55%..66% -> x: 1095..1330, y: 455..535)
  ctx.fillStyle = lampOn ? '#E8DCC7' : '#6A7382';
  ctx.beginPath();
  ctx.roundRect(1095, 458, 235, 76, 22);
  ctx.fill();

  return canvas.toDataURL('image/jpeg', 0.88);
}

// ============================================================================
// 3. HYPER-REALISTIC CANVAS RAIN, REFRACTIVE DROPLETS & CONDENSATION GLASS
// ============================================================================

const RainCanvas = ({
  intensity = 45,
  isWindowCloseUp = false,
  lightningFlash = false,
  reducedMotion = false,
  interactiveCondensation = false,
  lampOn = true,
}) => {
  const canvasRef = useRef(null);
  const mistCanvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  // Initialize subtle frosted condensation layer along edges & glass when close-up is active
  useEffect(() => {
    if (!interactiveCondensation) return;
    const mistCanvas = mistCanvasRef.current;
    if (!mistCanvas) return;
    const mCtx = mistCanvas.getContext('2d');

    const initMist = () => {
      if (!mistCanvas.parentElement) return;
      mistCanvas.width = mistCanvas.parentElement.clientWidth;
      mistCanvas.height = mistCanvas.parentElement.clientHeight;
      const w = mistCanvas.width;
      const h = mistCanvas.height;

      mCtx.clearRect(0, 0, w, h);
      // Soft radial condensation heavier near edges and bottom sill
      const grad = mCtx.createRadialGradient(w * 0.5, h * 0.42, w * 0.14, w * 0.5, h * 0.5, Math.max(w, h) * 0.68);
      grad.addColorStop(0, 'rgba(205, 224, 242, 0.04)');
      grad.addColorStop(0.65, 'rgba(205, 224, 242, 0.16)');
      grad.addColorStop(1, 'rgba(215, 232, 248, 0.34)');
      mCtx.fillStyle = grad;
      mCtx.fillRect(0, 0, w, h);

      // Extra bottom sill fog band
      const bottomGrad = mCtx.createLinearGradient(0, h * 0.72, 0, h);
      bottomGrad.addColorStop(0, 'rgba(210, 228, 245, 0)');
      bottomGrad.addColorStop(1, 'rgba(215, 232, 248, 0.36)');
      mCtx.fillStyle = bottomGrad;
      mCtx.fillRect(0, h * 0.72, w, h * 0.28);
    };

    initMist();
    window.addEventListener('resize', initMist);
    return () => window.removeEventListener('resize', initMist);
  }, [interactiveCondensation]);

  const wipeMistAt = (clientX, clientY) => {
    if (!interactiveCondensation || !mistCanvasRef.current) return;
    const canvas = mistCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const ctx = canvas.getContext('2d');

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    const r = 34;
    const g = ctx.createRadialGradient(x, y, 4, x, y, r);
    g.addColorStop(0, 'rgba(0,0,0,0.85)');
    g.addColorStop(0.6, 'rgba(0,0,0,0.45)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Multi-depth falling rain streaks (far misty rain + near fast streaks)
    const farCount = reducedMotion ? 16 : Math.floor(30 + (intensity / 100) * (isWindowCloseUp ? 130 : 75));
    const nearCount = reducedMotion ? 10 : Math.floor(15 + (intensity / 100) * (isWindowCloseUp ? 85 : 45));

    const farStreaks = Array.from({ length: farCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      len: (isWindowCloseUp ? 12 : 7) + Math.random() * 12,
      speed: (isWindowCloseUp ? 4.5 : 3.2) + Math.random() * 3.5,
      alpha: 0.08 + Math.random() * 0.16,
    }));

    const nearStreaks = Array.from({ length: nearCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      len: (isWindowCloseUp ? 24 : 14) + Math.random() * 24,
      speed: (isWindowCloseUp ? 11 : 7.5) + Math.random() * (6 + intensity * 0.08),
      alpha: 0.18 + Math.random() * 0.34,
    }));

    // Refractive water droplets & meandering rivulets on glass pane
    const dropletCount = reducedMotion
      ? 14
      : Math.floor((isWindowCloseUp ? 42 : 18) + (intensity / 100) * (isWindowCloseUp ? 75 : 28));

    const glassDrops = Array.from({ length: dropletCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: (isWindowCloseUp ? 1.5 : 1.0) + Math.random() * (isWindowCloseUp ? 3.2 : 1.7),
      vy: 0.05 + Math.random() * 0.35,
      slideTimer: Math.random() * 160,
      sliding: Math.random() > 0.55,
      wobbleSeed: Math.random() * Math.PI * 2,
      trail: [],
    }));

    // Static micro-beads clinging to glass
    const microBeads = Array.from({ length: isWindowCloseUp ? 130 : 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 0.6 + Math.random() * 1.15,
      alpha: 0.14 + Math.random() * 0.25,
    }));

    let boltPoints = null;
    let lastFlashState = false;

    const generateBolt = (w, h) => {
      const pts = [];
      let cx = w * (0.25 + Math.random() * 0.5);
      let cy = 0;
      pts.push({ x: cx, y: cy });
      while (cy < h * 0.68) {
        cy += 18 + Math.random() * 26;
        cx += (Math.random() - 0.48) * 34;
        pts.push({ x: cx, y: cy });
      }
      return pts;
    };

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Cloud illumination & branching lightning bolt
      if (lightningFlash) {
        if (!lastFlashState) {
          boltPoints = generateBolt(w, h);
        }
        const skyGlow = ctx.createRadialGradient(w * 0.5, h * 0.2, 10, w * 0.5, h * 0.3, w * 0.7);
        skyGlow.addColorStop(0, 'rgba(225, 240, 255, 0.42)');
        skyGlow.addColorStop(1, 'rgba(180, 210, 250, 0.12)');
        ctx.fillStyle = skyGlow;
        ctx.fillRect(0, 0, w, h);

        if (boltPoints) {
          ctx.save();
          ctx.strokeStyle = 'rgba(240, 248, 255, 0.92)';
          ctx.shadowColor = '#B8D8FF';
          ctx.shadowBlur = 18;
          ctx.lineWidth = isWindowCloseUp ? 2.4 : 1.5;
          ctx.beginPath();
          boltPoints.forEach((p, idx) => {
            if (idx === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          });
          ctx.stroke();
          ctx.restore();
        }
      } else {
        boltPoints = null;
      }
      lastFlashState = lightningFlash;

      // 1. Far misty rainfall
      ctx.lineCap = 'round';
      for (let i = 0; i < farStreaks.length; i++) {
        const s = farStreaks[i];
        ctx.strokeStyle = `rgba(176, 204, 232, ${s.alpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - 1.5, s.y + s.len);
        ctx.stroke();

        if (!reducedMotion) {
          s.y += s.speed;
          s.x -= 0.45;
          if (s.y > h) {
            s.y = -s.len;
            s.x = Math.random() * (w + 30);
          }
        }
      }

      // 2. Near foreground rain streaks
      for (let i = 0; i < nearStreaks.length; i++) {
        const s = nearStreaks[i];
        ctx.strokeStyle = `rgba(210, 230, 250, ${s.alpha})`;
        ctx.lineWidth = isWindowCloseUp ? 1.4 : 1.05;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - 3.2, s.y + s.len);
        ctx.stroke();

        if (!reducedMotion) {
          s.y += s.speed;
          s.x -= 1.05;
          if (s.y > h) {
            s.y = -s.len;
            s.x = Math.random() * (w + 50);
          }
        }
      }

      // 3. Static micro-condensation beads on windowpane
      for (let i = 0; i < microBeads.length; i++) {
        const b = microBeads[i];
        ctx.fillStyle = `rgba(215, 234, 252, ${b.alpha})`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Refractive water droplets with specular highlights & meandering trails
      for (let i = 0; i < glassDrops.length; i++) {
        const d = glassDrops[i];

        // Draw meandering wet rivulet trail behind moving droplets
        if (d.trail.length > 1) {
          ctx.strokeStyle = 'rgba(215, 235, 255, 0.16)';
          ctx.lineWidth = d.r * 0.72;
          ctx.beginPath();
          for (let t = 0; t < d.trail.length; t++) {
            const pt = d.trail[t];
            if (t === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          ctx.stroke();
        }

        // Droplet body (darkened refraction rim + warm/cool specular highlight)
        ctx.fillStyle = 'rgba(15, 25, 40, 0.32)';
        ctx.beginPath();
        ctx.arc(d.x, d.y + 0.6, d.r * 1.06, 0, Math.PI * 2);
        ctx.fill();

        const dropGrad = ctx.createRadialGradient(
          d.x - d.r * 0.3,
          d.y - d.r * 0.3,
          d.r * 0.1,
          d.x,
          d.y,
          d.r
        );
        dropGrad.addColorStop(0, lampOn ? 'rgba(255, 236, 205, 0.85)' : 'rgba(235, 246, 255, 0.85)');
        dropGrad.addColorStop(0.55, 'rgba(185, 212, 238, 0.32)');
        dropGrad.addColorStop(1, 'rgba(120, 155, 190, 0.45)');

        ctx.fillStyle = dropGrad;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();

        if (!reducedMotion) {
          d.slideTimer -= 1;
          if (d.slideTimer <= 0) {
            d.sliding = !d.sliding;
            d.slideTimer = d.sliding ? 55 + Math.random() * 110 : 80 + Math.random() * 180;
          }

          if (d.sliding) {
            d.wobbleSeed += 0.09;
            const stepY = d.vy + 0.55 + (intensity / 100) * 0.75;
            const stepX = Math.sin(d.wobbleSeed) * 0.42;
            d.x += stepX;
            d.y += stepY;

            d.trail.push({ x: d.x, y: d.y });
            if (d.trail.length > 26) d.trail.shift();
          } else if (d.trail.length > 0 && Math.random() > 0.7) {
            d.trail.shift();
          }

          if (d.y > h + 12) {
            d.y = -8;
            d.x = Math.random() * w;
            d.trail = [];
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [intensity, isWindowCloseUp, lightningFlash, reducedMotion, lampOn]);

  return (
    <div
      className={`relative w-full h-full ${interactiveCondensation ? 'cursor-crosshair pointer-events-auto' : 'pointer-events-none'}`}
      onMouseDown={(e) => {
        isDrawingRef.current = true;
        wipeMistAt(e.clientX, e.clientY);
      }}
      onMouseMove={(e) => {
        if (isDrawingRef.current) wipeMistAt(e.clientX, e.clientY);
      }}
      onMouseUp={() => {
        isDrawingRef.current = false;
      }}
      onMouseLeave={() => {
        isDrawingRef.current = false;
      }}
      onTouchStart={(e) => {
        if (e.touches[0]) wipeMistAt(e.touches[0].clientX, e.touches[0].clientY);
      }}
      onTouchMove={(e) => {
        if (e.touches[0]) wipeMistAt(e.touches[0].clientX, e.touches[0].clientY);
      }}
    >
      {interactiveCondensation && (
        <canvas ref={mistCanvasRef} className="absolute inset-0 w-full h-full block" />
      )}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none block" />
    </div>
  );
};

// ============================================================================
// 4. INTERACTIVE MODALS & OVERLAYS FOR EVERY ROOM OBJECT
// ============================================================================

const ModalWrapper = ({ title, subtitle, onClose, children, maxWidth = 'max-w-3xl', darkWood = true }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-[#0B111B]/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={`relative w-full ${maxWidth} max-h-[88vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          darkWood
            ? 'bg-[#1D1816]/95 border-[#6B5444]/60 text-[#E8DCC7]'
            : 'bg-[#E8DCC7] border-[#8A725C] text-[#2C221E]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex items-center justify-between px-5 py-3.5 border-b ${
            darkWood ? 'border-[#6B5444]/40 bg-[#261F1C]' : 'border-[#C7B69B] bg-[#DFD1B8]'
          }`}
        >
          <div>
            <h2 className="text-base sm:text-lg font-medium tracking-wide">{title}</h2>
            {subtitle && (
              <p className={`text-xs ${darkWood ? 'text-[#AA8582]' : 'text-[#6B5444]'}`}>{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              darkWood
                ? 'hover:bg-[#6B5444]/40 text-[#E8DCC7]/80 hover:text-white'
                : 'hover:bg-[#6B5444]/20 text-[#49382F]'
            }`}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
};

// --- 4A. WINDOW RAIN EXPERIENCE ---
const WindowModal = ({
  onClose,
  rainMode,
  setRainMode,
  rainIntensity,
  setRainIntensity,
  timePreset,
  lampOn,
  lightningFlash,
  reducedMotion,
}) => {
  const [quoteIdx, setQuoteIdx] = useState(() => Math.floor(Math.random() * WINDOW_QUOTES.length));
  const [mistKey, setMistKey] = useState(0);
  const [externalWindowUrl, setExternalWindowUrl] = useState(null);

  const generatedWindowDataUrl = useMemo(
    () => generateWindowBackdropDataURL(timePreset.id, lampOn),
    [timePreset.id, lampOn]
  );

  useEffect(() => {
    let active = true;
    const probe = new Image();
    probe.onload = () => {
      if (active && probe.naturalWidth > 0) {
        setExternalWindowUrl('aa9dd370.jpeg');
      }
    };
    probe.src = 'aa9dd370.jpeg';
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % WINDOW_QUOTES.length);
    }, 9500);
    return () => clearInterval(timer);
  }, []);

  const handleModeSelect = (mode) => {
    setRainMode(mode);
    if (mode === 'light') setRainIntensity(28);
    if (mode === 'heavy') setRainIntensity(68);
    if (mode === 'storm') setRainIntensity(96);
  };

  const activeWindowBackdrop = externalWindowUrl || generatedWindowDataUrl;

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col justify-between bg-[#0B111B] text-[#E8DCC7] animate-fadeIn select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Bedroom Window"
    >
      {/* Realistic Out-of-Focus Suburban Night Streetscape */}
      <div
        className="absolute inset-0 transition-colors duration-1000 overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, ${timePreset.skyTop} 0%, ${timePreset.skyBottom} 68%, #0E1520 100%)`,
        }}
      >
        {/* Guaranteed-to-Load Data-URL Rainy Window Backdrop */}
        {activeWindowBackdrop && (
          <img
            src={activeWindowBackdrop}
            alt="Raindrops on bedroom window looking out at a rainy 2007 street at night"
            className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000"
            style={{
              filter:
                timePreset.id === 'blueHour'
                  ? 'brightness(1.04) saturate(1.05)'
                  : timePreset.id === 'midnight'
                  ? 'brightness(0.82) contrast(1.06)'
                  : timePreset.id === 'cantSleep'
                  ? 'brightness(0.76) contrast(1.08)'
                  : 'brightness(0.98)',
            }}
          />
        )}

        {/* Time-of-Night Color Grading & Horizon Atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-1000"
          style={{
            background: `linear-gradient(to bottom, ${timePreset.skyTop}66 0%, transparent 45%, ${timePreset.horizonGlow} 100%)`,
          }}
        />

        {/* Interactive Glass Condensation + Refractive Raindrops */}
        <RainCanvas
          key={mistKey}
          intensity={rainIntensity}
          isWindowCloseUp={true}
          lightningFlash={lightningFlash}
          reducedMotion={reducedMotion}
          interactiveCondensation={true}
          lampOn={lampOn}
        />

        {/* Warm Bedroom Interior Lamp Reflection on Glass Pane */}
        {lampOn && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-700"
            style={{
              background:
                'radial-gradient(circle at 84% 74%, rgba(217, 165, 102, 0.24) 0%, rgba(217, 165, 102, 0.08) 38%, transparent 68%)',
            }}
          />
        )}

        {/* Subtle Inner Frame Vignette */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(6,10,18,0.85)]" />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 p-5 sm:p-8 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 bg-[#182435]/75 backdrop-blur-md px-4 py-2 rounded-full border border-[#E8DCC7]/15 text-xs sm:text-sm text-[#E8DCC7]/90">
          <span>{timePreset.label} · {timePreset.title}</span>
          <span className="hidden sm:inline text-[#E8DCC7]/40">|</span>
          <button
            onClick={() => setMistKey((k) => k + 1)}
            className="hidden sm:inline text-xs text-[#D9A566] hover:underline"
            title="Drag across the glass to wipe away fog"
          >
            Re-fog glass
          </button>
        </div>
        <button
          onClick={onClose}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-[#182435]/85 hover:bg-[#24364D] border border-[#E8DCC7]/20 text-sm transition-colors shadow-lg"
        >
          <X className="w-4 h-4" />
          <span>Step back to room</span>
        </button>
      </div>

      {/* Center Contemplative Quote */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        <p
          key={quoteIdx}
          className="max-w-xl text-lg sm:text-2xl font-serif italic text-[#E8DCC7]/95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.92)] transition-opacity duration-1000"
        >
          “{WINDOW_QUOTES[quoteIdx]}”
        </p>
        <div className="pointer-events-auto mt-3 flex items-center gap-4 text-xs text-[#E8DCC7]/65">
          <button
            onClick={() => setQuoteIdx((prev) => (prev + 1) % WINDOW_QUOTES.length)}
            className="hover:text-[#E8DCC7] underline underline-offset-4"
          >
            another thought
          </button>
          <span>·</span>
          <span className="italic text-[#E8DCC7]/50">drag finger or cursor to wipe mist off the glass</span>
        </div>
      </div>

      {/* Bottom Rain Controls */}
      <div className="relative z-10 p-5 sm:p-8 flex justify-center pointer-events-none">
        <div className="pointer-events-auto w-full max-w-xl bg-[#141D2B]/85 backdrop-blur-md border border-[#E8DCC7]/15 rounded-2xl p-4 sm:p-5 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="text-xs uppercase tracking-widest text-[#E8DCC7]/60">Weather Outside</span>
            <div className="flex gap-1.5">
              {[
                { id: 'light', label: 'LIGHT RAIN' },
                { id: 'heavy', label: 'HEAVY RAIN' },
                { id: 'storm', label: 'THUNDERSTORM' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleModeSelect(m.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wider transition-all ${
                    rainMode === m.id
                      ? 'bg-[#D9A566] text-[#182435] shadow'
                      : 'bg-[#1E2D42] text-[#E8DCC7]/80 hover:bg-[#293D59]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <CloudRain className="w-4 h-4 text-[#9EC1E6] shrink-0" />
            <input
              type="range"
              min="10"
              max="100"
              value={rainIntensity}
              onChange={(e) => {
                const v = Number(e.target.value);
                setRainIntensity(v);
                if (v < 45) setRainMode('light');
                else if (v < 82) setRainMode('heavy');
                else setRainMode('storm');
              }}
              aria-label="Rain Intensity"
              className="w-full accent-[#D9A566] cursor-pointer"
            />
            <span className="text-xs font-mono w-10 text-right text-[#E8DCC7]/80">{rainIntensity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 4B. RETRO 2007 COMPUTER (XP/VISTA ERA DESKTOP) ---
const RetroComputerModal = ({ onClose, timePreset, notepadText, setNotepadText, guestbookEntries, onAddGuestbook }) => {
  const [activeApp, setActiveApp] = useState('messenger');
  const [startOpen, setStartOpen] = useState(false);
  const [scanlines, setScanlines] = useState(true);

  // My Computer state
  const [currentFolder, setCurrentFolder] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Messenger state
  const [selectedContactId, setSelectedContactId] = useState('c1');
  const [chatLogs, setChatLogs] = useState(() => {
    const map = {};
    MSN_CONTACTS.forEach((c) => {
      map[c.id] = c.messages;
    });
    return map;
  });
  const [chatInput, setChatInput] = useState('');
  const [typingContact, setTypingContact] = useState(null);

  // Internet Explorer state
  const [iePage, setIePage] = useState('home');
  const [ieGuestName, setIeGuestName] = useState('');
  const [ieGuestMsg, setIeGuestMsg] = useState('');

  // Recycle Bin state
  const [trashItems, setTrashItems] = useState([
    { name: 'My_Novel_Draft_FINAL_v2.doc', size: '42 KB', date: '10/14/2007' },
    { name: 'cool_avatar_3.bmp', size: '188 KB', date: '11/02/2007' },
    { name: 'untitled_song_idea.txt', size: '4 KB', date: '11/19/2007' },
  ]);
  const [trashMessage, setTrashMessage] = useState('');

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const isMidnight = timePreset.id === 'midnight' || timePreset.id === 'cantSleep';

  const folders = useMemo(() => {
    const base = [
      {
        id: 'pictures',
        name: 'My Pictures',
        files: [
          { name: 'rainy_bus_window.jpg', type: 'image', caption: 'Taken on the ride back from field trip, Nov 2007.' },
          { name: 'skatepark_sunset.jpg', type: 'image', caption: 'August evening right before school started.' },
          { name: 'my_desk_setup.jpg', type: 'image', caption: 'Finally got new speakers for the PC!' },
        ],
      },
      {
        id: 'docs',
        name: 'Old Documents',
        files: [
          {
            name: 'english_essay_draft.txt',
            type: 'text',
            content: 'Topic: A Place That Feels Safe.\n\nWhen it rains outside, a small bedroom with a warm lamp feels like an island separated from the rest of the world...',
          },
          {
            name: 'band_name_ideas.txt',
            type: 'text',
            content: '1. Midnight Static\n2. Paper Raincoats\n3. Dial-Up Ghosts\n4. November Streetlights\n(still need a drummer)',
          },
        ],
      },
      {
        id: 'music',
        name: 'Music',
        files: [
          {
            name: 'chill_rain_playlist.m3u',
            type: 'text',
            content: '#EXTM3U\n01 - 9_43_PM_Through_Glass.mp3\n02 - Streetlights_On_Wet_Asphalt.mp3\n03 - Shoebox_Full_Of_Tickets.mp3\n04 - 2_07_AM_Ceiling_Stare.mp3',
          },
        ],
      },
      {
        id: 'school',
        name: 'School',
        files: [
          {
            name: 'fall_2007_schedule.txt',
            type: 'text',
            content: 'Mon/Wed/Fri:\n08:15 - English Lit\n09:20 - World History\n10:30 - Biology\n11:35 - Lunch\n12:25 - Algebra II\n01:30 - Art & Design',
          },
        ],
      },
      {
        id: 'memories',
        name: 'Memories',
        files: [
          {
            name: 'summer_bucket_list.txt',
            type: 'text',
            content: '[x] Stay up until sunrise\n[x] Beat the game without cheat codes\n[x] Ride bikes to the convenience store for slushies\n[ ] Build a treehouse (next year)',
          },
          ...(isMidnight
            ? [
                {
                  name: '00_00_unsent.txt',
                  type: 'text',
                  content: '[UNLOCKED AT MIDNIGHT]\n\nIf you are reading this late at night: I hope you know you turned out okay. Even on the quiet, uncertain days.',
                },
              ]
            : []),
        ],
      },
    ];
    return base;
  }, [isMidnight]);

  const sendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const text = chatInput.trim();
    setChatInput('');
    setChatLogs((prev) => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), { sender: 'You', text, time: timePreset.label }],
    }));

    const contact = MSN_CONTACTS.find((c) => c.id === selectedContactId);
    if (contact && contact.status !== 'offline') {
      setTypingContact(contact.name);
      setTimeout(() => {
        setTypingContact(null);
        const replies = [
          'haha yeah totally!!',
          'brb checking something real quick',
          'listen to the rain outside right now its so loud',
          'ikr?? 2007 has been such a weird year',
          'hold on my internet is lagging lol',
        ];
        const reply = replies[Math.floor(Math.random() * replies.length)];
        setChatLogs((prev) => ({
          ...prev,
          [selectedContactId]: [
            ...(prev[selectedContactId] || []),
            { sender: contact.name, text: reply, time: timePreset.label },
          ],
        }));
      }, 1500);
    }
  };

  const activeContact = MSN_CONTACTS.find((c) => c.id === selectedContactId) || MSN_CONTACTS[0];

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-2 sm:p-6 bg-[#0A0F18]/85 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="2007 Desktop Computer"
    >
      {/* Monitor Bezel */}
      <div className="relative w-full max-w-5xl h-[88vh] flex flex-col rounded-2xl border-[10px] sm:border-[14px] border-[#2C2A29] bg-[#1D3E7A] shadow-[0_0_60px_rgba(58,110,165,0.3)] overflow-hidden select-none">
        {/* Subtle CRT Scanline Overlay */}
        {scanlines && (
          <div
            className="pointer-events-none absolute inset-0 z-30 opacity-20"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(0,0,0,0.35), rgba(0,0,0,0.35) 1px, transparent 1px, transparent 3px)',
            }}
          />
        )}

        {/* Desktop Wallpaper Area */}
        <div
          className="relative flex-1 flex flex-col sm:flex-row p-3 sm:p-4 gap-3 overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #214B8C 0%, #3B73B9 58%, #2E5E3E 59%, #1E4229 100%)',
          }}
        >
          {/* Desktop Icons */}
          <div className="flex sm:flex-col gap-3 sm:gap-4 z-10 shrink-0 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'mycomputer', label: 'My Computer', icon: Folder, color: 'text-amber-300' },
              { id: 'ie', label: 'Internet', icon: Globe, color: 'text-sky-300' },
              { id: 'messenger', label: 'Messenger', icon: MessageSquare, color: 'text-emerald-300' },
              { id: 'notepad', label: 'Notepad', icon: FileText, color: 'text-slate-100' },
              { id: 'recycle', label: 'Recycle Bin', icon: Trash2, color: 'text-slate-200' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveApp(item.id);
                    setStartOpen(false);
                  }}
                  className={`flex flex-col items-center w-20 p-1.5 rounded text-center transition-colors ${
                    activeApp === item.id ? 'bg-[#0B2C66]/60 ring-1 ring-white/50' : 'hover:bg-white/15'
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg bg-[#163466]/80 border border-white/25 flex items-center justify-center shadow">
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="mt-1 text-[11px] leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Retro Window */}
          {activeApp && (
            <div className="flex-1 flex flex-col rounded-t-lg border-2 border-[#0831D9] bg-[#ECE9D8] text-[#1E1E1E] shadow-2xl overflow-hidden z-10">
              {/* XP Classic Blue Titlebar */}
              <div
                className="flex items-center justify-between px-3 py-1.5 text-white font-semibold text-xs sm:text-sm"
                style={{
                  background: 'linear-gradient(180deg, #0958E6 0%, #0044C4 45%, #00359E 100%)',
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-300 inline-block" />
                  <span>
                    {activeApp === 'mycomputer' && 'My Computer'}
                    {activeApp === 'ie' && 'Microsoft Internet Explorer - ~*~ rainy_thoughts2007 ~*~'}
                    {activeApp === 'messenger' && 'Windows Live Messenger (2007)'}
                    {activeApp === 'notepad' && 'Untitled - Notepad'}
                    {activeApp === 'recycle' && 'Recycle Bin'}
                  </span>
                </div>
                <button
                  onClick={() => setActiveApp(null)}
                  className="w-5 h-5 rounded bg-[#D94A38] hover:bg-[#F05A47] border border-white/60 flex items-center justify-center text-white text-xs font-bold"
                  aria-label="Close Window"
                >
                  ×
                </button>
              </div>

              {/* App Content */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 text-xs sm:text-sm">
                {/* 1. MY COMPUTER */}
                {activeApp === 'mycomputer' && (
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-300">
                      <div className="flex items-center gap-2">
                        {currentFolder && (
                          <button
                            onClick={() => {
                              setCurrentFolder(null);
                              setSelectedFile(null);
                            }}
                            className="px-2 py-1 bg-stone-200 hover:bg-stone-300 rounded border border-stone-400 text-xs flex items-center gap-1"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" /> Back
                          </button>
                        )}
                        <span className="font-mono text-xs text-stone-600">
                          C:\Users\Me\{currentFolder ? currentFolder.name : ''}
                        </span>
                      </div>
                      {isMidnight && (
                        <span className="text-[11px] px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-300">
                          Midnight secret unlocked in Memories
                        </span>
                      )}
                    </div>

                    {!currentFolder ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {folders.map((folder) => (
                          <button
                            key={folder.id}
                            onClick={() => setCurrentFolder(folder)}
                            className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-blue-50 border border-stone-300 text-left transition-colors"
                          >
                            <Folder className="w-8 h-8 text-amber-500 shrink-0" />
                            <div>
                              <div className="font-semibold text-stone-800">{folder.name}</div>
                              <div className="text-[11px] text-stone-500">{folder.files.length} items</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          {currentFolder.files.map((file, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedFile(file)}
                              className={`w-full flex items-center gap-2.5 p-2.5 rounded border text-left ${
                                selectedFile?.name === file.name
                                  ? 'bg-blue-100 border-blue-400'
                                  : 'bg-white hover:bg-stone-50 border-stone-300'
                              }`}
                            >
                              {file.type === 'image' ? (
                                <ImageIcon className="w-5 h-5 text-emerald-600 shrink-0" />
                              ) : (
                                <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                              )}
                              <span className="font-mono text-xs truncate">{file.name}</span>
                            </button>
                          ))}
                        </div>

                        <div className="bg-white border border-stone-300 rounded-lg p-4 min-h-[180px]">
                          {selectedFile ? (
                            selectedFile.type === 'image' ? (
                              <div className="space-y-3">
                                <div className="w-full h-36 rounded bg-gradient-to-b from-[#1E2D4A] via-[#4B6587] to-[#D9A566] flex items-end p-3 relative overflow-hidden">
                                  <div className="w-10 h-10 rounded-full bg-amber-200/70 blur-sm absolute top-5 right-8" />
                                  <span className="text-[11px] font-mono text-white/90 bg-black/40 px-2 py-0.5 rounded">
                                    2007_DIGICAM_640x480
                                  </span>
                                </div>
                                <p className="text-xs text-stone-700 italic">{selectedFile.caption}</p>
                              </div>
                            ) : (
                              <pre className="whitespace-pre-wrap font-mono text-xs text-stone-800 leading-relaxed">
                                {selectedFile.content}
                              </pre>
                            )
                          ) : (
                            <p className="text-xs text-stone-400 italic">Select a file on the left to open it.</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. INTERNET EXPLORER (2007 PERSONAL SITE) */}
                {activeApp === 'ie' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 bg-stone-200 p-1.5 rounded border border-stone-400">
                      <span className="text-xs text-stone-600 px-1">Address:</span>
                      <div className="flex-1 bg-white px-2.5 py-1 rounded border border-stone-300 font-mono text-xs text-stone-700 truncate">
                        http://www.freewebs.com/rainy_thoughts2007/{iePage}.htm
                      </div>
                    </div>

                    <div className="rounded-lg border-2 border-[#7A96DF] bg-[#F4F7FC] p-4 space-y-4">
                      <div className="text-center border-b border-dashed border-[#7A96DF] pb-3">
                        <h3 className="text-lg font-bold text-[#2B4C8C] tracking-wide">
                          ~*~ rainy_thoughts2007 ~*~
                        </h3>
                        <p className="text-[11px] text-stone-500">
                          best viewed in 1024x768 · thanks for stopping by my corner of the web!
                        </p>
                        <div className="flex justify-center gap-3 mt-2 text-xs font-semibold text-[#1D5BC6]">
                          <button onClick={() => setIePage('home')} className="hover:underline">
                            [ Home & Blog ]
                          </button>
                          <button onClick={() => setIePage('about')} className="hover:underline">
                            [ About Me ]
                          </button>
                          <button onClick={() => setIePage('guestbook')} className="hover:underline">
                            [ Sign Guestbook ({guestbookEntries.length}) ]
                          </button>
                        </div>
                      </div>

                      {iePage === 'home' && (
                        <div className="space-y-3 text-xs text-stone-700 leading-relaxed">
                          <div className="bg-white p-3 rounded border border-blue-200">
                            <div className="font-bold text-[#2B4C8C] mb-1">
                              Saturday, Nov 24, 2007 — Listening to the rain
                            </div>
                            <p>
                              Current Mood: Sleepy &amp; peaceful ☁️<br />
                              Current Music: Instrumental piano mix
                            </p>
                            <p className="mt-2">
                              Spent all afternoon organizing my MP3 folders and watching rain streak down my bedroom
                              window. Don’t forget to sign my guestbook before you close the tab!!
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                            <span className="px-2 py-1 bg-indigo-900 text-white rounded">MADE WITH NOTEPAD</span>
                            <span className="px-2 py-1 bg-amber-700 text-white rounded">NO RIGHT CLICK ;)</span>
                            <span className="px-2 py-1 bg-emerald-800 text-white rounded">VISITORS: 000412</span>
                          </div>
                        </div>
                      )}

                      {iePage === 'about' && (
                        <div className="bg-white p-3 rounded border border-blue-200 text-xs space-y-1.5 text-stone-700">
                          <p><strong>Likes:</strong> Rainy evenings, wired headphones, cold pillows, hot cocoa, late night chats.</p>
                          <p><strong>Dislikes:</strong> Monday mornings, dial-up disconnects, forgetting umbrellas.</p>
                          <p><strong>Quote:</strong> “Everything feels calmer when it rains.”</p>
                        </div>
                      )}

                      {iePage === 'guestbook' && (
                        <div className="space-y-3">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              if (!ieGuestMsg.trim()) return;
                              onAddGuestbook(ieGuestName.trim() || 'Anonymous Visitor', ieGuestMsg.trim());
                              setIeGuestName('');
                              setIeGuestMsg('');
                            }}
                            className="bg-white p-3 rounded border border-blue-200 space-y-2"
                          >
                            <input
                              type="text"
                              placeholder="Your nickname (e.g. skater_kid07)"
                              value={ieGuestName}
                              onChange={(e) => setIeGuestName(e.target.value)}
                              className="w-full px-2.5 py-1.5 border border-stone-300 rounded text-xs"
                            />
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Leave a message in the 2007 guestbook..."
                                value={ieGuestMsg}
                                onChange={(e) => setIeGuestMsg(e.target.value)}
                                className="flex-1 px-2.5 py-1.5 border border-stone-300 rounded text-xs"
                              />
                              <button
                                type="submit"
                                className="px-3 py-1.5 bg-[#2B4C8C] text-white rounded text-xs font-medium hover:bg-[#1E3768]"
                              >
                                Post
                              </button>
                            </div>
                          </form>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {guestbookEntries.map((entry) => (
                              <div key={entry.id} className="bg-white p-2.5 rounded border border-stone-200 text-xs">
                                <div className="flex justify-between text-[11px] text-stone-500">
                                  <strong className="text-[#2B4C8C]">{entry.author}</strong>
                                  <span>{entry.date}</span>
                                </div>
                                <p className="mt-1 text-stone-700">{entry.text}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. MSN-INSPIRED MESSENGER */}
                {activeApp === 'messenger' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-[340px]">
                    {/* Contact List */}
                    <div className="bg-white rounded border border-stone-300 p-2 flex flex-col overflow-y-auto">
                      <div className="text-[11px] font-bold text-[#1D5BC6] pb-1.5 mb-1.5 border-b border-stone-200">
                        Contacts ({MSN_CONTACTS.length})
                      </div>
                      <div className="space-y-1">
                        {MSN_CONTACTS.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => setSelectedContactId(c.id)}
                            className={`w-full p-2 rounded text-left transition-colors ${
                              selectedContactId === c.id ? 'bg-[#DCE8FC] border border-[#96B8F2]' : 'hover:bg-stone-100'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                                  c.status === 'online'
                                    ? 'bg-emerald-500'
                                    : c.status === 'away'
                                    ? 'bg-amber-400'
                                    : c.status === 'busy'
                                    ? 'bg-rose-500'
                                    : 'bg-stone-400'
                                }`}
                              />
                              <span className="font-semibold text-xs text-stone-800 truncate">{c.name}</span>
                            </div>
                            <div className="text-[10px] text-stone-500 truncate pl-4">{c.statusText}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Chat Window */}
                    <div className="md:col-span-2 bg-white rounded border border-stone-300 flex flex-col overflow-hidden">
                      <div className="px-3 py-2 bg-[#E9F1FD] border-b border-stone-300 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-xs text-stone-800">{activeContact.name}</div>
                          <div className="text-[10px] text-stone-500">{activeContact.statusText}</div>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-stone-300 text-stone-600">
                          {activeContact.status}
                        </span>
                      </div>

                      <div className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-[#FAFAFA]">
                        {(chatLogs[activeContact.id] || []).map((m, i) => (
                          <div key={i} className="text-xs">
                            <div className="flex items-baseline gap-2">
                              <span
                                className={`font-semibold ${
                                  m.sender === 'You' ? 'text-[#2B4C8C]' : 'text-[#8C4A47]'
                                }`}
                              >
                                {m.sender} says:
                              </span>
                              <span className="text-[10px] text-stone-400">{m.time}</span>
                            </div>
                            <p className="pl-3 text-stone-800 mt-0.5">{m.text}</p>
                          </div>
                        ))}
                        {typingContact === activeContact.name && (
                          <div className="text-[11px] italic text-stone-400">
                            {activeContact.name} is typing a message...
                          </div>
                        )}
                      </div>

                      <form onSubmit={sendChatMessage} className="p-2 border-t border-stone-300 bg-[#F0F0F0] flex gap-2">
                        <input
                          type="text"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          placeholder={`Send an instant message to ${activeContact.name}...`}
                          className="flex-1 px-2.5 py-1.5 bg-white border border-stone-300 rounded text-xs focus:outline-none focus:border-blue-500"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-[#1D5BC6] hover:bg-[#16479C] text-white rounded text-xs font-medium"
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* 4. NOTEPAD */}
                {activeApp === 'notepad' && (
                  <div className="h-[330px] flex flex-col">
                    <div className="text-[11px] text-stone-500 pb-1.5 flex justify-between">
                      <span>Saved automatically to your browser</span>
                      <span>{notepadText.length} characters</span>
                    </div>
                    <textarea
                      value={notepadText}
                      onChange={(e) => setNotepadText(e.target.value)}
                      placeholder="Type your late-night thoughts here..."
                      className="flex-1 w-full p-3 bg-white border border-stone-400 font-mono text-xs sm:text-sm text-stone-800 resize-none focus:outline-none"
                    />
                  </div>
                )}

                {/* 5. RECYCLE BIN */}
                {activeApp === 'recycle' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-600">
                        {trashItems.length > 0
                          ? `${trashItems.length} nostalgic items waiting in the bin`
                          : 'The Recycle Bin is completely empty.'}
                      </span>
                      {trashItems.length > 0 && (
                        <button
                          onClick={() => {
                            setTrashItems([]);
                            setTrashMessage('Emptied! Though some memories always find their way back.');
                          }}
                          className="px-3 py-1 bg-stone-200 hover:bg-stone-300 border border-stone-400 rounded text-xs"
                        >
                          Empty Recycle Bin
                        </button>
                      )}
                    </div>
                    {trashMessage && (
                      <div className="p-2.5 rounded bg-amber-50 border border-amber-300 text-xs text-amber-900">
                        {trashMessage}
                      </div>
                    )}
                    <div className="bg-white border border-stone-300 rounded divide-y divide-stone-200">
                      {trashItems.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 text-xs">
                          <span className="font-mono text-stone-700">{item.name}</span>
                          <span className="text-stone-400">
                            {item.size} · {item.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Classic XP Taskbar */}
        <div
          className="h-9 flex items-center justify-between px-2 z-20 text-white text-xs"
          style={{
            background: 'linear-gradient(180deg, #245EDC 0%, #1941A5 100%)',
          }}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStartOpen(!startOpen)}
              className="px-3 py-1 rounded-r-xl rounded-l-md font-bold italic tracking-wide shadow"
              style={{
                background: 'linear-gradient(180deg, #3C9A3E 0%, #267328 100%)',
              }}
            >
              start
            </button>
            <button
              onClick={() => setScanlines(!scanlines)}
              className="px-2 py-0.5 rounded bg-white/15 hover:bg-white/25 text-[11px]"
            >
              CRT: {scanlines ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1 rounded bg-[#D94A38] hover:bg-[#F05A47] font-medium text-xs shadow"
            >
              Step Away from Desk
            </button>
            <div className="px-2.5 py-1 bg-[#12317C] border border-white/20 rounded text-[11px] font-mono">
              {timePreset.label}
            </div>
          </div>
        </div>

        {/* Start Menu Popover */}
        {startOpen && (
          <div className="absolute bottom-10 left-2 w-60 rounded-t-lg border-2 border-[#0831D9] bg-white text-stone-800 shadow-2xl z-30 overflow-hidden">
            <div className="p-3 bg-[#1941A5] text-white font-semibold text-sm flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-amber-300/90 text-[#182435] flex items-center justify-center font-bold">
                07
              </div>
              <span>Bedroom_PC</span>
            </div>
            <div className="p-1.5 space-y-1 text-xs">
              {[
                { id: 'messenger', label: 'Windows Live Messenger' },
                { id: 'ie', label: 'Internet Explorer' },
                { id: 'mycomputer', label: 'My Computer' },
                { id: 'notepad', label: 'Notepad' },
              ].map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    setActiveApp(app.id);
                    setStartOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded hover:bg-[#245EDC] hover:text-white transition-colors"
                >
                  {app.label}
                </button>
              ))}
              <div className="border-t border-stone-200 my-1" />
              <button
                onClick={onClose}
                className="w-full text-left px-3 py-2 rounded text-rose-700 hover:bg-rose-600 hover:text-white font-medium"
              >
                Turn Off Monitor (Return to Room)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- 4C. CASSETTE PLAYER & AMBIENT SOUND STUDIO ---
const CassetteModal = ({
  onClose,
  isPlaying,
  onTogglePlay,
  playlistId,
  setPlaylistId,
  trackIndex,
  setTrackIndex,
  musicVolume,
  setMusicVolume,
  headphonesOn,
  setHeadphonesOn,
  ambientState,
  setAmbientState,
}) => {
  const currentPlaylist = PLAYLISTS[playlistId] || PLAYLISTS.rainyNight;
  const currentTrack = currentPlaylist.tracks[trackIndex % currentPlaylist.tracks.length];

  const handleNext = () => {
    setTrackIndex((prev) => (prev + 1) % currentPlaylist.tracks.length);
  };

  const handlePrev = () => {
    setTrackIndex((prev) => (prev - 1 + currentPlaylist.tracks.length) % currentPlaylist.tracks.length);
  };

  return (
    <ModalWrapper
      title="Portable Cassette Deck"
      subtitle="Warm tape melodies & evening room ambience"
      onClose={onClose}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Cassette Tape Visual Deck */}
        <div className="rounded-xl bg-[#2B2320] border border-[#6B5444]/60 p-4 sm:p-5 shadow-inner">
          <div className="rounded-lg bg-[#E8DCC7] text-[#2C221E] p-3.5 border-2 border-[#8A725C] relative overflow-hidden">
            <div className="flex justify-between items-center text-[11px] font-mono uppercase tracking-wider text-[#6B5444] border-b border-[#C7B69B] pb-1.5">
              <span>TYPE II CrO2 · 90 MIN</span>
              <span>{currentPlaylist.name}</span>
            </div>

            <div className="my-2.5 text-center">
              <div className="font-serif italic text-base sm:text-lg font-medium text-[#2C221E]">
                {currentTrack.title}
              </div>
              <div className="text-xs text-[#6B5444]">{currentPlaylist.subtitle}</div>
            </div>

            {/* Tape Window with Spinning Reels */}
            <div className="mx-auto max-w-xs h-16 rounded-lg bg-[#231D1B] border-2 border-[#6B5444] flex items-center justify-around px-6 relative">
              {[0, 1].map((reel) => (
                <div
                  key={reel}
                  className={`w-10 h-10 rounded-full border-4 border-dashed border-[#E8DCC7]/80 flex items-center justify-center ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '4s' }}
                >
                  <div className="w-3 h-3 rounded-full bg-[#D9A566]" />
                </div>
              ))}
              {/* Animated Equalizer Bars */}
              <div className="flex items-end gap-1 h-8">
                {[0.5, 0.9, 0.65, 1, 0.7].map((h, i) => (
                  <div
                    key={i}
                    className={`w-1.5 bg-[#D9A566] rounded-t transition-all duration-300 ${
                      isPlaying ? 'animate-pulse' : 'opacity-30'
                    }`}
                    style={{ height: isPlaying ? `${h * 28}px` : '6px', animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Transport Controls */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-lg bg-[#3B302C] hover:bg-[#4D3F3A] text-[#E8DCC7] transition-colors"
                aria-label="Previous Track"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={onTogglePlay}
                className="px-5 py-2.5 rounded-lg bg-[#D9A566] hover:bg-[#E5B57B] text-[#182435] font-semibold flex items-center gap-2 transition-colors shadow"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="text-xs uppercase tracking-wider">{isPlaying ? 'Pause' : 'Play Tape'}</span>
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-lg bg-[#3B302C] hover:bg-[#4D3F3A] text-[#E8DCC7] transition-colors"
                aria-label="Next Track"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Headphones Filter & Volume */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setHeadphonesOn(!headphonesOn)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                  headphonesOn
                    ? 'bg-[#AA8582]/30 border-[#AA8582] text-[#E8DCC7]'
                    : 'bg-[#3B302C] border-transparent text-[#E8DCC7]/70'
                }`}
                title="Warm intimate low-pass filter"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Headphones {headphonesOn ? 'On' : 'Off'}</span>
              </button>
              <div className="flex items-center gap-2 w-28">
                <Volume2 className="w-4 h-4 text-[#D9A566] shrink-0" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.02"
                  value={musicVolume}
                  onChange={(e) => setMusicVolume(Number(e.target.value))}
                  aria-label="Tape Volume"
                  className="w-full accent-[#D9A566]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Playlist Selector & Tracklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider text-[#AA8582]">Tape Collection</h3>
            <div className="space-y-1.5">
              {Object.values(PLAYLISTS).map((pl) => (
                <button
                  key={pl.id}
                  onClick={() => {
                    setPlaylistId(pl.id);
                    setTrackIndex(0);
                  }}
                  className={`w-full p-2.5 rounded-lg border text-left transition-colors ${
                    playlistId === pl.id
                      ? 'bg-[#382D28] border-[#D9A566] text-[#E8DCC7]'
                      : 'bg-[#241D1A] border-[#6B5444]/30 text-[#E8DCC7]/75 hover:border-[#6B5444]'
                  }`}
                >
                  <div className="font-medium text-sm">{pl.name}</div>
                  <div className="text-xs text-[#E8DCC7]/60">{pl.subtitle}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider text-[#AA8582]">Side A Tracks</h3>
            <div className="space-y-1.5">
              {currentPlaylist.tracks.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTrackIndex(idx);
                    if (!isPlaying) onTogglePlay();
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs transition-colors ${
                    trackIndex % currentPlaylist.tracks.length === idx
                      ? 'bg-[#D9A566]/20 text-[#D9A566] border border-[#D9A566]/40'
                      : 'bg-[#241D1A] text-[#E8DCC7]/80 hover:bg-[#2F2622]'
                  }`}
                >
                  <span>
                    0{idx + 1}. {t.title}
                  </span>
                  <span className="font-mono opacity-70">{t.duration}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Independent Ambient Layer Toggles */}
        <div className="pt-3 border-t border-[#6B5444]/40">
          <h3 className="text-xs uppercase tracking-wider text-[#AA8582] mb-2.5">Room Soundscape Layers</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'rainOn', label: 'Rain on Window' },
              { key: 'thunderOn', label: 'Distant Thunder' },
              { key: 'windOn', label: 'Evening Wind' },
              { key: 'clockTickOn', label: 'Wall Clock Tick' },
              { key: 'roomToneOn', label: 'Quiet Room Tone' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setAmbientState((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                  ambientState[item.key]
                    ? 'bg-[#D9A566]/20 border-[#D9A566] text-[#E8DCC7]'
                    : 'bg-[#241D1A] border-[#6B5444]/40 text-[#E8DCC7]/55'
                }`}
              >
                {ambientState[item.key] ? '● ' : '○ '}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

// --- 4D. DIARY / NOTEBOOK ---
const DiaryModal = ({ onClose, userEntries, onAddEntry, onDeleteEntry }) => {
  const allEntries = useMemo(() => [...userEntries, ...INITIAL_DIARY_ENTRIES], [userEntries]);
  const [pageIdx, setPageIdx] = useState(0);
  const [writingMode, setWritingMode] = useState(false);
  const [newText, setNewText] = useState('');

  const current = allEntries[pageIdx] || allEntries[0];

  const handleSave = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;
    onAddEntry(newText.trim());
    setNewText('');
    setWritingMode(false);
    setPageIdx(0);
  };

  return (
    <ModalWrapper
      title="Spiral Notebook · 2007"
      subtitle="Private thoughts kept in your desk"
      onClose={onClose}
      maxWidth="max-w-2xl"
      darkWood={false}
    >
      <div className="space-y-4">
        {/* Top Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#C7B69B]">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setWritingMode(false);
                setPageIdx((prev) => Math.max(0, prev - 1));
              }}
              disabled={pageIdx === 0 && !writingMode}
              className="p-1.5 rounded bg-[#DFD1B8] hover:bg-[#D2C1A3] disabled:opacity-40"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-2">
              Page {pageIdx + 1} of {allEntries.length}
            </span>
            <button
              onClick={() => {
                setWritingMode(false);
                setPageIdx((prev) => Math.min(allEntries.length - 1, prev + 1));
              }}
              disabled={pageIdx >= allEntries.length - 1 && !writingMode}
              className="p-1.5 rounded bg-[#DFD1B8] hover:bg-[#D2C1A3] disabled:opacity-40"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setWritingMode(false);
                setPageIdx(Math.floor(Math.random() * allEntries.length));
              }}
              className="ml-2 px-2.5 py-1 rounded bg-[#DFD1B8] hover:bg-[#D2C1A3] text-xs"
            >
              Random Entry
            </button>
          </div>

          <button
            onClick={() => setWritingMode(!writingMode)}
            className="px-3 py-1.5 rounded-lg bg-[#49382F] hover:bg-[#5E493E] text-[#E8DCC7] text-xs font-medium tracking-wide"
          >
            {writingMode ? 'BACK TO READING' : '[ WRITE SOMETHING BEFORE YOU GO ]'}
          </button>
        </div>

        {/* Lined Cream Paper */}
        {writingMode ? (
          <form onSubmit={handleSave} className="space-y-3">
            <div className="text-xs text-[#6B5444]">
              Your entry stays privately on your device in localStorage.
            </div>
            <textarea
              rows={8}
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Write down whatever is on your mind tonight..."
              className="w-full p-4 rounded-lg bg-[#F5EFE2] border border-[#C7B69B] font-serif text-base sm:text-lg leading-8 text-[#2C221E] focus:outline-none focus:border-[#6B5444]"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #D8CBB3 32px)',
              }}
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setWritingMode(false)}
                className="px-4 py-2 rounded-lg text-xs text-[#6B5444] hover:bg-[#DFD1B8]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#49382F] text-[#E8DCC7] text-xs font-medium hover:bg-[#3A2C25]"
              >
                Save to Notebook
              </button>
            </div>
          </form>
        ) : (
          <div
            className="min-h-[260px] p-5 sm:p-7 rounded-lg bg-[#F5EFE2] border border-[#C7B69B] shadow-inner relative"
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #DFD4BE 32px)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-serif italic text-sm sm:text-base text-[#6B5444] font-semibold">
                {current.date}
              </span>
              {current.isUser && (
                <button
                  onClick={() => {
                    onDeleteEntry(current.id);
                    setPageIdx(0);
                  }}
                  className="flex items-center gap-1 text-xs text-rose-700 hover:underline"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete note
                </button>
              )}
            </div>
            <p className="whitespace-pre-line font-serif text-base sm:text-lg leading-8 text-[#2C221E]">
              {current.content}
            </p>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

// --- 4E. BOOKSHELF & STORIES ---
const BookshelfModal = ({ onClose }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookPage, setBookPage] = useState(0);

  return (
    <ModalWrapper
      title="Wooden Bookshelf"
      subtitle="Pick a worn paperback off the shelf"
      onClose={onClose}
      maxWidth="max-w-2xl"
    >
      {!selectedBook ? (
        <div className="space-y-5">
          <div className="flex items-end justify-center gap-2.5 sm:gap-4 pt-6 pb-3 px-4 rounded-xl bg-[#161210] border-b-8 border-[#49382F]">
            {BOOKSHELF_BOOKS.map((book) => (
              <button
                key={book.id}
                onClick={() => {
                  setSelectedBook(book);
                  setBookPage(0);
                }}
                style={{ backgroundColor: book.spineColor }}
                className={`group relative w-11 sm:w-14 ${book.height} rounded-t-sm border-x border-t border-white/15 shadow-lg transition-transform duration-300 hover:-translate-y-3 flex flex-col items-center justify-between py-3 px-1`}
                title={book.title}
              >
                <span className="w-full h-0.5 opacity-50" style={{ backgroundColor: book.accentColor }} />
                <span
                  className="text-[10px] sm:text-xs font-serif tracking-wide text-[#E8DCC7] text-center leading-tight"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {book.title}
                </span>
                <span className="w-full h-0.5 opacity-50" style={{ backgroundColor: book.accentColor }} />
              </button>
            ))}
          </div>
          <p className="text-center text-xs text-[#E8DCC7]/65">
            Click any spine to sit down and read a few pages.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedBook(null)}
              className="flex items-center gap-1.5 text-xs text-[#D9A566] hover:underline"
            >
              <ChevronLeft className="w-4 h-4" /> Return book to shelf
            </button>
            <span className="text-xs text-[#E8DCC7]/60">
              Page {bookPage + 1} / {selectedBook.pages.length}
            </span>
          </div>

          <div className="p-6 sm:p-8 rounded-xl bg-[#E8DCC7] text-[#2C221E] shadow-inner space-y-4">
            <div className="border-b border-[#C7B69B] pb-3">
              <h3 className="font-serif text-xl font-semibold">{selectedBook.title}</h3>
              <p className="text-xs text-[#6B5444]">by {selectedBook.author}</p>
            </div>
            <p className="font-serif text-base sm:text-lg leading-relaxed text-[#2C221E]">
              {selectedBook.pages[bookPage]}
            </p>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setBookPage((p) => Math.max(0, p - 1))}
              disabled={bookPage === 0}
              className="px-4 py-2 rounded-lg bg-[#2B2320] hover:bg-[#3B302C] disabled:opacity-40 text-xs"
            >
              Previous Page
            </button>
            <button
              onClick={() => setBookPage((p) => Math.min(selectedBook.pages.length - 1, p + 1))}
              disabled={bookPage >= selectedBook.pages.length - 1}
              className="px-4 py-2 rounded-lg bg-[#D9A566] text-[#182435] font-medium disabled:opacity-40 text-xs"
            >
              Turn Page
            </button>
          </div>
        </div>
      )}
    </ModalWrapper>
  );
};

// --- 4F. OLD CANDYBAR KEYPAD PHONE ---
const RetroPhoneModal = ({ onClose, timePreset }) => {
  const [screen, setScreen] = useState('home'); // home | messages | thread | calls | dialer
  const [selectedThread, setSelectedThread] = useState(PHONE_THREADS[0]);
  const [dialedDigits, setDialedDigits] = useState('');
  const [secretBanner, setSecretBanner] = useState('');

  const handleKeyPress = (digit) => {
    const next = (dialedDigits + digit).slice(-8);
    setDialedDigits(next);
    setScreen('dialer');

    if (next.endsWith('2007')) {
      setSecretBanner('Memory unlocked: "Some years stay with you long after the calendar changes."');
    } else if (next.endsWith('0943') || next.endsWith('943')) {
      setSecretBanner('9:43 PM — Right where you left off.');
    } else {
      setSecretBanner('');
    }
  };

  return (
    <ModalWrapper
      title="2006 Nokia-Style Keypad Phone"
      subtitle="1 unread message · Signal: 4 bars"
      onClose={onClose}
      maxWidth="max-w-sm"
    >
      <div className="mx-auto w-64 rounded-[34px] bg-gradient-to-b from-[#3A3D42] to-[#232529] p-4 border-2 border-[#5A5E66] shadow-2xl select-none">
        {/* Earpiece */}
        <div className="w-12 h-1.5 rounded-full bg-[#16181A] mx-auto mb-3" />

        {/* Backlit Monochrome-Blue LCD Screen */}
        <div className="h-52 rounded-xl bg-[#9AB49E] border-4 border-[#1B1D20] p-2.5 text-[#142318] font-mono flex flex-col justify-between shadow-inner overflow-hidden">
          {/* Status bar */}
          <div className="flex items-center justify-between text-[10px] border-b border-[#142318]/25 pb-1">
            <span>▌▌▌▌ 3G</span>
            <span>{timePreset.label}</span>
            <span>[███]</span>
          </div>

          {/* Dynamic Screen Body */}
          <div className="flex-1 py-1.5 overflow-y-auto text-xs">
            {screen === 'home' && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-1">
                <div className="text-lg font-bold tracking-tight">{timePreset.label}</div>
                <div className="text-[10px]">Sat, 24 Nov 2007</div>
                <div className="mt-2 px-2 py-0.5 rounded bg-[#142318]/15 text-[10px]">
                  ✉ 2 Saved Conversations
                </div>
              </div>
            )}

            {screen === 'messages' && (
              <div className="space-y-1">
                <div className="font-bold text-[11px] underline">Inbox:</div>
                {PHONE_THREADS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedThread(t);
                      setScreen('thread');
                    }}
                    className="w-full text-left p-1 rounded hover:bg-[#142318]/15 block"
                  >
                    <div className="font-bold text-[11px]">{t.name}</div>
                    <div className="text-[10px] truncate opacity-80">
                      {t.messages[t.messages.length - 1].text}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {screen === 'thread' && (
              <div className="space-y-1.5">
                <div className="font-bold text-[10px] border-b border-[#142318]/20 pb-0.5">
                  {selectedThread.name} ({selectedThread.number})
                </div>
                {selectedThread.messages.map((m, idx) => (
                  <div key={idx} className="text-[10px] leading-snug">
                    <span className="font-bold">{m.from === 'me' ? 'Me: ' : `${selectedThread.name}: `}</span>
                    <span>{m.text}</span>
                  </div>
                ))}
              </div>
            )}

            {screen === 'calls' && (
              <div className="space-y-1">
                <div className="font-bold text-[11px] underline">Call Log:</div>
                {CALL_HISTORY.map((c, i) => (
                  <div key={i} className="text-[10px] flex justify-between border-b border-[#142318]/10 pb-0.5">
                    <span>
                      {c.type === 'missed' ? '↙!' : c.type === 'received' ? '↙' : '↗'} {c.name}
                    </span>
                    <span className="opacity-75">{c.duration}</span>
                  </div>
                ))}
              </div>
            )}

            {screen === 'dialer' && (
              <div className="h-full flex flex-col justify-between">
                <div className="text-right text-base font-bold tracking-widest break-all pt-2">
                  {dialedDigits || '_'}
                </div>
                {secretBanner ? (
                  <div className="p-1.5 rounded bg-[#142318] text-[#9AB49E] text-[10px] leading-tight">
                    {secretBanner}
                  </div>
                ) : (
                  <div className="text-[9px] opacity-75">Tip: Try dialing 2007 or 0943</div>
                )}
              </div>
            )}
          </div>

          {/* Softkeys */}
          <div className="flex justify-between text-[10px] font-bold border-t border-[#142318]/25 pt-1">
            <button onClick={() => setScreen('messages')}>Messages</button>
            <button onClick={() => setScreen('calls')}>Calls</button>
          </div>
        </div>

        {/* Navigation Cluster */}
        <div className="my-3 flex items-center justify-between px-2">
          <button
            onClick={() => setScreen('messages')}
            className="px-2.5 py-1 rounded bg-[#2E3136] text-[10px] text-white/80 hover:bg-[#43474E]"
          >
            SMS
          </button>
          <button
            onClick={() => {
              setScreen('home');
              setDialedDigits('');
              setSecretBanner('');
            }}
            className="w-10 h-10 rounded-full bg-[#1C1E22] border-2 border-[#6D727D] text-[10px] text-white/80 hover:border-amber-300"
          >
            HOME
          </button>
          <button
            onClick={() => setScreen('calls')}
            className="px-2.5 py-1 rounded bg-[#2E3136] text-[10px] text-white/80 hover:bg-[#43474E]"
          >
            LOG
          </button>
        </div>

        {/* T9 Physical Keypad */}
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { d: '1', sub: '.,!' },
            { d: '2', sub: 'abc' },
            { d: '3', sub: 'def' },
            { d: '4', sub: 'ghi' },
            { d: '5', sub: 'jkl' },
            { d: '6', sub: 'mno' },
            { d: '7', sub: 'pqrs' },
            { d: '8', sub: 'tuv' },
            { d: '9', sub: 'wxyz' },
            { d: '*', sub: '+' },
            { d: '0', sub: '␣' },
            { d: '#', sub: '⇧' },
          ].map((k) => (
            <button
              key={k.d}
              onClick={() => handleKeyPress(k.d)}
              className="py-1.5 rounded-lg bg-[#2A2D32] hover:bg-[#3A3E45] active:translate-y-0.5 border border-white/10 text-center transition-all"
            >
              <div className="text-xs font-bold text-white">{k.d}</div>
              <div className="text-[9px] text-white/45">{k.sub}</div>
            </button>
          ))}
        </div>
      </div>
    </ModalWrapper>
  );
};

// --- 4G. WALL CLOCK (TIME PRESETS) ---
const ClockModal = ({ onClose, timePresetId, setTimePresetId, secretUnlocked }) => {
  return (
    <ModalWrapper
      title="Wall Clock"
      subtitle="Shift the hour of this rainy evening"
      onClose={onClose}
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2.5">
          {Object.values(TIME_PRESETS).map((preset) => (
            <button
              key={preset.id}
              onClick={() => setTimePresetId(preset.id)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                timePresetId === preset.id
                  ? 'bg-[#332924] border-[#D9A566] shadow-md'
                  : 'bg-[#231C19] border-[#6B5444]/40 hover:border-[#6B5444]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-base font-semibold text-[#D9A566]">{preset.label}</span>
                <span className="text-xs uppercase tracking-wider text-[#E8DCC7]/80">{preset.title}</span>
              </div>
              <p className="mt-1 text-xs text-[#E8DCC7]/70">{preset.description}</p>
            </button>
          ))}
        </div>

        {secretUnlocked && (
          <div className="p-3.5 rounded-xl bg-[#182435] border border-[#9EC1E6]/40 text-xs text-[#E8DCC7]/90 italic">
            “Time moves differently in bedrooms when it rains. Nowhere to rush, nothing to prove.”
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

// --- 4H. BED REST MODE ---
const BedPromptModal = ({ onClose, onEnterRestMode }) => {
  return (
    <ModalWrapper
      title="Cozy Bed"
      subtitle="Soft quilt & cool pillows"
      onClose={onClose}
      maxWidth="max-w-md"
    >
      <div className="text-center space-y-5 py-3">
        <p className="font-serif italic text-xl text-[#E8DCC7]">“You can rest here for a while.”</p>
        <p className="text-xs text-[#E8DCC7]/70 max-w-sm mx-auto leading-relaxed">
          Dim the room, tuck in, and just watch the rain fall against the window without any distractions.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => onEnterRestMode(true)}
            className="px-5 py-2.5 rounded-xl bg-[#D9A566] hover:bg-[#E5B57B] text-[#182435] text-xs font-semibold tracking-wider transition-colors"
          >
            [ 5 MINUTES OF QUIET ]
          </button>
          <button
            onClick={() => onEnterRestMode(false)}
            className="px-5 py-2.5 rounded-xl bg-[#2D2420] hover:bg-[#3B302B] border border-[#6B5444] text-[#E8DCC7] text-xs font-semibold tracking-wider transition-colors"
          >
            [ JUST STAY HERE ]
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

// --- 4I. DESK DRAWER (HIDDEN KEEPSAKES) ---
const DrawerModal = ({ onClose }) => {
  const [keepsake, setKeepsake] = useState(
    () => DRAWER_KEEPSAKES[Math.floor(Math.random() * DRAWER_KEEPSAKES.length)]
  );

  const pickAnother = () => {
    const others = DRAWER_KEEPSAKES.filter((k) => k.id !== keepsake.id);
    setKeepsake(others[Math.floor(Math.random() * others.length)]);
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'ticket':
        return <Ticket className="w-8 h-8 text-[#D9A566]" />;
      case 'mail':
        return <Mail className="w-8 h-8 text-[#E8DCC7]" />;
      case 'heart':
        return <Heart className="w-8 h-8 text-[#AA8582]" />;
      case 'key':
        return <Key className="w-8 h-8 text-[#D9A566]" />;
      case 'star':
        return <Star className="w-8 h-8 text-[#E8DCC7]" />;
      default:
        return <ImageIcon className="w-8 h-8 text-[#9EC1E6]" />;
    }
  };

  return (
    <ModalWrapper
      title="Top Desk Drawer"
      subtitle="Small things tucked away and forgotten"
      onClose={onClose}
      maxWidth="max-w-md"
    >
      <div className="space-y-5 text-center py-2">
        <div className="w-16 h-16 rounded-2xl bg-[#2B2320] border border-[#6B5444] mx-auto flex items-center justify-center shadow-inner">
          {renderIcon(keepsake.icon)}
        </div>
        <div>
          <h3 className="font-serif text-xl text-[#E8DCC7]">{keepsake.title}</h3>
          <p className="text-xs text-[#AA8582] mt-0.5">{keepsake.subtitle}</p>
        </div>
        <p className="text-sm text-[#E8DCC7]/85 leading-relaxed bg-[#241D1A] p-4 rounded-xl border border-[#6B5444]/40">
          {keepsake.story}
        </p>
        <button
          onClick={pickAnother}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#332924] hover:bg-[#42352F] border border-[#6B5444] text-xs text-[#E8DCC7] transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Rummage through drawer again</span>
        </button>
      </div>
    </ModalWrapper>
  );
};

// --- 4J. RANDOM MEMORY POPUP ---
const MemoryPopupModal = ({ onClose }) => {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * RANDOM_MEMORIES.length));

  const nextMemory = () => {
    setIdx((prev) => {
      let n = Math.floor(Math.random() * RANDOM_MEMORIES.length);
      if (n === prev) n = (prev + 1) % RANDOM_MEMORIES.length;
      return n;
    });
  };

  return (
    <ModalWrapper
      title="A Small Memory"
      subtitle={`Memory #${idx + 1} of ${RANDOM_MEMORIES.length}`}
      onClose={onClose}
      maxWidth="max-w-lg"
    >
      <div className="py-4 text-center space-y-6">
        <p className="font-serif italic text-xl sm:text-2xl text-[#E8DCC7] leading-relaxed">
          “{RANDOM_MEMORIES[idx]}”
        </p>
        <button
          onClick={nextMemory}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D9A566] hover:bg-[#E5B57B] text-[#182435] text-xs font-semibold tracking-wider transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Another memory</span>
        </button>
      </div>
    </ModalWrapper>
  );
};

// --- 4K. GUESTBOOK (LEAVE A LITTLE MEMORY) ---
const GuestbookModal = ({ onClose, entries, onAddEntry, onDeleteEntry }) => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddEntry(author.trim() || 'A quiet visitor', text.trim());
    setAuthor('');
    setText('');
  };

  return (
    <ModalWrapper
      title="Leave a Little Memory"
      subtitle="Handwritten notes saved locally in your browser"
      onClose={onClose}
      maxWidth="max-w-xl"
    >
      <div className="space-y-5">
        <form onSubmit={handleSubmit} className="space-y-3 bg-[#241D1A] p-4 rounded-xl border border-[#6B5444]/40">
          <input
            type="text"
            placeholder="Your name or initials (optional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#1A1513] border border-[#6B5444]/50 text-xs text-[#E8DCC7] focus:outline-none focus:border-[#D9A566]"
          />
          <textarea
            rows={3}
            placeholder="Write something you miss, a childhood memory, or a quiet thought about tonight..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#1A1513] border border-[#6B5444]/50 text-xs sm:text-sm text-[#E8DCC7] focus:outline-none focus:border-[#D9A566]"
          />
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-[#E8DCC7]/50">Stored privately in your browser</span>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#D9A566] hover:bg-[#E5B57B] text-[#182435] text-xs font-semibold"
            >
              Pin Note
            </button>
          </div>
        </form>

        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {entries.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#E8DCC7] text-[#2C221E] shadow relative"
            >
              <p className="font-serif text-base leading-relaxed">“{item.text}”</p>
              <div className="mt-2 flex items-center justify-between text-xs text-[#6B5444]">
                <span>— {item.author} · {item.date}</span>
                {item.isPersonal && (
                  <button
                    onClick={() => onDeleteEntry(item.id)}
                    className="text-rose-700 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModalWrapper>
  );
};

// --- 4L. SECRET DISCOVERY TOAST / MODAL ---
const SecretModal = ({ secret, onClose }) => {
  if (!secret) return null;
  return (
    <ModalWrapper title={secret.title} subtitle="Hidden detail discovered" onClose={onClose} maxWidth="max-w-md">
      <div className="py-3 space-y-4 text-center">
        <p className="font-serif italic text-lg text-[#E8DCC7] leading-relaxed">“{secret.message}”</p>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-[#332924] hover:bg-[#443730] text-xs text-[#E8DCC7]"
        >
          Tuck it back safely
        </button>
      </div>
    </ModalWrapper>
  );
};

// ============================================================================
// 5. PHOTOREALISTIC 2007 BEDROOM SCENE (DATA-URL RENDERER + LIVE RAIN & LIGHTING)
// ============================================================================

const BedroomIllustration = ({
  timePreset,
  lampOn,
  rainIntensity,
  lightningFlash,
  isCassettePlaying,
  headphonesOn,
  showHints,
  restMode,
  onObjectClick,
  onSecretTrigger,
  reducedMotion,
}) => {
  const [hoveredLabel, setHoveredLabel] = useState(null);
  const [externalRoomUrl, setExternalRoomUrl] = useState(null);
  const lampClicksRef = useRef(0);
  const clockClicksRef = useRef(0);

  const generatedRoomDataUrl = useMemo(
    () => generateBedroomSceneDataURL(timePreset.id, lampOn),
    [timePreset.id, lampOn]
  );

  useEffect(() => {
    let active = true;
    const probe = new Image();
    probe.onload = () => {
      if (active && probe.naturalWidth > 0) {
        setExternalRoomUrl('a214028b.jpeg');
      }
    };
    probe.src = 'a214028b.jpeg';
    return () => {
      active = false;
    };
  }, []);

  const handleLampClick = () => {
    lampClicksRef.current += 1;
    onObjectClick('lamp');
    if (lampClicksRef.current === 5) {
      onSecretTrigger({
        title: 'Taped Under the Lamp Base',
        message: 'A tiny folded note written in faded pencil: "Even in the darkest room, a small light is enough."',
      });
    }
  };

  const handleClockClick = () => {
    clockClicksRef.current += 1;
    onObjectClick('clock');
    if (clockClicksRef.current === 3) {
      onSecretTrigger({
        title: 'Behind the Ticking Hands',
        message: 'You paused long enough to hear the seconds stretch out. Nothing is chasing you tonight.',
      });
    }
  };

  const Hotspot = ({ id, label, onClick, className, children, ariaLabel }) => (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHoveredLabel(label)}
      onMouseLeave={() => setHoveredLabel(null)}
      onFocus={() => setHoveredLabel(label)}
      onBlur={() => setHoveredLabel(null)}
      aria-label={ariaLabel || label}
      className={`group absolute cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A566] rounded-xl ${
        showHints
          ? 'ring-2 ring-[#D9A566]/80 bg-[#D9A566]/15 shadow-[0_0_20px_rgba(217,165,102,0.35)] animate-pulse'
          : 'hover:ring-1 hover:ring-[#E8DCC7]/45 hover:bg-[#D9A566]/10 hover:shadow-[0_0_25px_rgba(217,165,102,0.22)]'
      } ${className}`}
    >
      {children}
      <span className="pointer-events-none opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-[#141D2B]/90 backdrop-blur-md border border-[#D9A566]/50 text-[#E8DCC7] text-xs font-medium shadow-xl z-30">
        {label}
      </span>
    </button>
  );

  // Compute realistic photographic lighting filters based on lamp toggle and virtual time
  const photoFilter = useMemo(() => {
    if (!lampOn) {
      if (timePreset.id === 'blueHour') return 'brightness(0.85) contrast(1.04)';
      if (timePreset.id === 'midnight') return 'brightness(0.74) contrast(1.08)';
      if (timePreset.id === 'cantSleep') return 'brightness(0.70) contrast(1.10)';
      return 'brightness(0.80) contrast(1.06)';
    }
    return 'brightness(1.0) contrast(1.02)';
  }, [lampOn, timePreset.id]);

  const activeRoomBackdrop = externalRoomUrl || generatedRoomDataUrl;

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#0D131C]">
      {/* 1. FULL-SCREEN GUARANTEED DATA-URL 2007 BEDROOM SCENE */}
      {activeRoomBackdrop && (
        <img
          src={activeRoomBackdrop}
          alt="Cozy mid-2000s bedroom on a rainy evening with a window, CRT computer, desk lamp, cassette player, bookshelf, and bed"
          className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000"
          style={{ filter: photoFilter }}
        />
      )}

      {/* 2. LIVE ANIMATED RAIN STREAKS & GLASS REFLECTION ALIGNED OVER LEFT WINDOW */}
      <div
        className="pointer-events-none absolute left-[6%] top-[9%] w-[26%] h-[53%] overflow-hidden rounded-xs"
        style={{
          clipPath: 'polygon(0% 2%, 100% 0%, 100% 100%, 0% 98%)',
        }}
      >
        <RainCanvas
          intensity={rainIntensity}
          isWindowCloseUp={false}
          lightningFlash={lightningFlash}
          reducedMotion={reducedMotion}
          lampOn={lampOn}
        />
        {/* Subtle Warm Interior Lamp Reflection on the Windowpane */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: lampOn ? 1 : 0.25,
            background:
              'linear-gradient(125deg, rgba(255,255,255,0.04) 0%, transparent 45%, rgba(217,165,102,0.18) 100%)',
          }}
        />
      </div>

      {/* 3. INTERACTIVE ROOM OBJECT HOTSPOTS (PRECISION-ALIGNED TO PHOTOGRAPH) */}
      {!restMode && (
        <>
          {/* A. RAINY WINDOW (Left Wall) */}
          <Hotspot
            id="window"
            label="Look out the window"
            onClick={() => onObjectClick('window')}
            className="left-[5%] top-[8%] w-[28%] h-[55%]"
          />

          {/* B. DESK LAMP (Left side of desk) */}
          <Hotspot
            id="lamp"
            label={lampOn ? 'Turn Desk Lamp Off' : 'Turn Desk Lamp On'}
            onClick={handleLampClick}
            className="left-[23%] top-[39%] w-[10%] h-[23%]"
          />

          {/* C. CRT COMPUTER MONITOR (Center of desk) */}
          <Hotspot
            id="computer"
            label="Use Old Computer"
            onClick={() => onObjectClick('computer')}
            className="left-[34%] top-[36%] w-[17%] h-[25%]"
          >
            {/* Subtle live screen glow shimmer */}
            <div className="w-full h-full rounded-lg bg-sky-300/5 animate-pulse pointer-events-none" />
          </Hotspot>

          {/* D. OPEN SPIRAL DIARY (Front-left on desk surface) */}
          <Hotspot
            id="diary"
            label="Open Diary"
            onClick={() => onObjectClick('diary')}
            className="left-[23%] top-[61%] w-[13%] h-[11%]"
          />

          {/* E. CASSETTE PLAYER (Right of monitor on desk) */}
          <Hotspot
            id="cassette"
            label="Cassette Player"
            onClick={() => onObjectClick('cassette')}
            className="left-[52%] top-[53%] w-[9%] h-[11%]"
          >
            {isCassettePlaying && (
              <span className="absolute -top-2 -right-2 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D9A566] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D9A566]" />
              </span>
            )}
          </Hotspot>

          {/* F. WIRED HEADPHONES (Resting beside cassette player on desk) */}
          <Hotspot
            id="headphones"
            label={headphonesOn ? 'Take Off Wired Headphones' : 'Put On Wired Headphones'}
            onClick={() => onObjectClick('headphones')}
            className="left-[58%] top-[58%] w-[9%] h-[10%]"
          />

          {/* G. OLD CANDYBAR KEYPAD PHONE (Front-center-right on desk) */}
          <Hotspot
            id="phone"
            label="Check Old Phone"
            onClick={() => onObjectClick('phone')}
            className="left-[48%] top-[64%] w-[6%] h-[9%]"
          />

          {/* H. DESK DRAWER (Underneath right side of desk) */}
          <Hotspot
            id="drawer"
            label="Open Desk Drawer"
            onClick={() => onObjectClick('drawer')}
            className="left-[53%] top-[69%] w-[12%] h-[16%]"
          />

          {/* I. WALL CLOCK (Upper center wall above desk) */}
          <Hotspot
            id="clock"
            label={`Wall Clock (${timePreset.label})`}
            onClick={handleClockClick}
            className="left-[41%] top-[10%] w-[9%] h-[14%] rounded-full"
          />

          {/* J. BAND & SKY POSTER (Wall between clock and bookshelf — Secret) */}
          <Hotspot
            id="poster"
            label="Taped Wall Poster"
            onClick={() =>
              onSecretTrigger({
                title: 'Taped Poster on the Wall',
                message:
                  'Cut out from a 2007 music magazine with slightly frayed corners. You still know every lyric on the album.',
              })
            }
            className="left-[53%] top-[14%] w-[11%] h-[23%]"
          />

          {/* K. WOODEN BOOKSHELF (Right wall) */}
          <Hotspot
            id="bookshelf"
            label="Bookshelf"
            onClick={() => onObjectClick('bookshelf')}
            className="left-[66%] top-[12%] w-[17%] h-[53%]"
          />

          {/* L. COZY BED (Foreground right) */}
          <Hotspot
            id="bed"
            label="Rest on Bed"
            onClick={() => onObjectClick('bed')}
            className="left-[67%] top-[64%] w-[32%] h-[34%]"
          />

          {/* M. PILLOW CORNER (Secret keepsake under pillow) */}
          <Hotspot
            id="pillow-secret"
            label="Corner of Pillow"
            onClick={() =>
              onSecretTrigger({
                title: 'Tucked Under the Pillow',
                message:
                  'A small folded paper heart you made months ago and forgot was there. Still crisp at the edges.',
              })
            }
            className="left-[76%] top-[55%] w-[16%] h-[11%]"
          />
        </>
      )}

      {/* 4. DYNAMIC LIGHTING ATMOSPHERE OVERLAYS (LAMP TUNGSTEN CONE + NIGHT TINT + DUST MOTES) */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-1000"
        style={{
          backgroundColor: lampOn ? 'rgba(18, 24, 38, 0.08)' : timePreset.roomTint,
        }}
      />

      {/* Warm Desk Lamp Radial Tungsten Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: lampOn && !restMode ? 1 : 0,
          background:
            'radial-gradient(circle at 28% 48%, rgba(217, 165, 102, 0.24) 0%, rgba(217, 165, 102, 0.08) 32%, rgba(16, 24, 38, 0.36) 85%)',
        }}
      />

      {/* Cool Monitor & Window Glow when Desk Lamp is Off */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: !lampOn ? 1 : 0,
          background:
            'radial-gradient(circle at 42% 48%, rgba(110, 165, 225, 0.14) 0%, rgba(14, 22, 36, 0.45) 75%)',
        }}
      />

      {/* Subtle Floating Dust Motes in the Lamp Light */}
      {lampOn && !restMode && !reducedMotion && (
        <div className="pointer-events-none absolute left-[22%] top-[36%] w-44 h-44 overflow-hidden opacity-75">
          {[
            { top: '20%', left: '30%', delay: '0s' },
            { top: '45%', left: '60%', delay: '1.4s' },
            { top: '65%', left: '25%', delay: '2.2s' },
            { top: '35%', left: '75%', delay: '0.8s' },
            { top: '75%', left: '55%', delay: '3.1s' },
          ].map((mote, i) => (
            <span
              key={i}
              style={{ top: mote.top, left: mote.left, animationDelay: mote.delay }}
              className="absolute w-1 h-1 rounded-full bg-[#FFE7BD] animate-ping"
            />
          ))}
        </div>
      )}

      {/* Subtle Film Grain Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(#E8DCC7 0.75px, transparent 0.75px)',
          backgroundSize: '4px 4px',
        }}
      />
    </div>
  );
};

// ============================================================================
// 6. MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // Entry & Reduced Motion
  const [hasEntered, setHasEntered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Room Atmosphere State
  const [lampOn, setLampOn] = useState(true);
  const [timePresetId, setTimePresetId] = useState('rainyNight');
  const [rainMode, setRainMode] = useState('heavy');
  const [rainIntensity, setRainIntensity] = useState(62);
  const [lightningFlash, setLightningFlash] = useState(false);

  // Active Overlay / Modal
  const [activeModal, setActiveModal] = useState(null); // window | computer | cassette | diary | bookshelf | phone | clock | bed | drawer | memory | guestbook
  const [secretDiscovery, setSecretDiscovery] = useState(null);
  const [showHints, setShowHints] = useState(false);
  const [soundMenuOpen, setSoundMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Rest Mode State
  const [restMode, setRestMode] = useState(false);
  const [restTimerSeconds, setRestTimerSeconds] = useState(null);

  // Audio & Cassette State
  const [masterVolume, setMasterVolume] = useState(0.75);
  const [muted, setMuted] = useState(false);
  const [isCassettePlaying, setIsCassettePlaying] = useState(false);
  const [playlistId, setPlaylistId] = useState('rainyNight');
  const [trackIndex, setTrackIndex] = useState(0);
  const [musicVolume, setMusicVolume] = useState(0.6);
  const [headphonesOn, setHeadphonesOn] = useState(false);
  const [ambientState, setAmbientState] = useState({
    rainOn: true,
    thunderOn: true,
    windOn: true,
    clockTickOn: true,
    roomToneOn: true,
  });

  // Persistent User Content (localStorage)
  const [userDiaryEntries, setUserDiaryEntries] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('rainy2007_diary') || '[]');
    } catch {
      return [];
    }
  });

  const [notepadText, setNotepadText] = useState(() => {
    try {
      return (
        localStorage.getItem('rainy2007_notepad') ||
        'November 24, 2007 - 9:43 PM\n\nNotes for tonight:\n- Finish reading a chapter before sleep\n- Listen to the rain\n'
      );
    } catch {
      return '';
    }
  });

  const [guestbookEntries, setGuestbookEntries] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('rainy2007_guestbook') || 'null');
      return (
        saved || [
          {
            id: 'g1',
            author: 'skater_kid07',
            date: 'Nov 24, 2007',
            text: 'cool page!! listening to the rain from across town.',
            isPersonal: false,
          },
          {
            id: 'g2',
            author: 'starlight_maya',
            date: 'Nov 23, 2007',
            text: 'hope we never forget these quiet nights.',
            isPersonal: false,
          },
        ]
      );
    } catch {
      return [];
    }
  });

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Persist localStorage items
  useEffect(() => {
    try {
      localStorage.setItem('rainy2007_diary', JSON.stringify(userDiaryEntries));
    } catch {}
  }, [userDiaryEntries]);

  useEffect(() => {
    try {
      localStorage.setItem('rainy2007_notepad', notepadText);
    } catch {}
  }, [notepadText]);

  useEffect(() => {
    try {
      localStorage.setItem('rainy2007_guestbook', JSON.stringify(guestbookEntries));
    } catch {}
  }, [guestbookEntries]);

  // Sync Web Audio Engine
  useEffect(() => {
    if (!hasEntered) return;
    audioEngine.setMasterVolume(masterVolume, muted);
  }, [hasEntered, masterVolume, muted]);

  useEffect(() => {
    if (!hasEntered) return;
    audioEngine.updateAmbient({
      rainOn: ambientState.rainOn,
      rainIntensity,
      windOn: ambientState.windOn,
      roomToneOn: ambientState.roomToneOn,
      clockTickOn: ambientState.clockTickOn,
    });
  }, [hasEntered, ambientState, rainIntensity]);

  useEffect(() => {
    if (!hasEntered) return;
    audioEngine.setHeadphonesMode(headphonesOn);
  }, [hasEntered, headphonesOn]);

  useEffect(() => {
    if (!hasEntered) return;
    const pl = PLAYLISTS[playlistId] || PLAYLISTS.rainyNight;
    const track = pl.tracks[trackIndex % pl.tracks.length];
    if (isCassettePlaying) {
      audioEngine.startMusic(track, musicVolume);
    } else {
      audioEngine.stopMusic();
    }
  }, [hasEntered, isCassettePlaying, playlistId, trackIndex]);

  useEffect(() => {
    if (!hasEntered) return;
    audioEngine.setMusicVolume(musicVolume);
  }, [hasEntered, musicVolume]);

  // Occasional Thunder & Lightning during Heavy Rain or Thunderstorm
  useEffect(() => {
    if (!hasEntered) return;
    if (rainMode === 'light' && !ambientState.thunderOn) return;

    const interval = setInterval(() => {
      if (rainMode === 'storm' || (rainMode === 'heavy' && Math.random() > 0.55)) {
        if (!reducedMotion) {
          setLightningFlash(true);
          setTimeout(() => setLightningFlash(false), 180);
        }
        if (ambientState.thunderOn && !muted) {
          setTimeout(() => audioEngine.triggerThunder(), 450);
        }
      }
    }, rainMode === 'storm' ? 11000 : 22000);

    return () => clearInterval(interval);
  }, [hasEntered, rainMode, ambientState.thunderOn, muted, reducedMotion]);

  // 5-Minute Rest Timer
  useEffect(() => {
    if (!restMode || restTimerSeconds === null) return;
    if (restTimerSeconds <= 0) {
      setRestTimerSeconds(null);
      showToast('Five quiet minutes have passed. Stay as long as you like.');
      return;
    }
    const timer = setInterval(() => {
      setRestTimerSeconds((s) => (s !== null && s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [restMode, restTimerSeconds]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleEnterRoom = () => {
    audioEngine.init();
    audioEngine.updateAmbient({
      rainOn: ambientState.rainOn,
      rainIntensity,
      windOn: ambientState.windOn,
      roomToneOn: ambientState.roomToneOn,
      clockTickOn: ambientState.clockTickOn,
    });
    setHasEntered(true);
  };

  const handleRoomObjectClick = (objId) => {
    if (objId === 'lamp') {
      setLampOn((prev) => !prev);
      return;
    }
    if (objId === 'headphones') {
      setHeadphonesOn((prev) => {
        const next = !prev;
        showToast(next ? 'Wired headphones on — cozy warm audio filter active.' : 'Headphones placed back on desk.');
        return next;
      });
      return;
    }
    setActiveModal(objId);
  };

  const timePreset = TIME_PRESETS[timePresetId] || TIME_PRESETS.rainyNight;

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#121822] text-[#E8DCC7] font-sans">
      {/* FULL-SCREEN INTERACTIVE BEDROOM */}
      <BedroomIllustration
        timePreset={timePreset}
        lampOn={lampOn}
        rainIntensity={rainIntensity}
        lightningFlash={lightningFlash}
        isCassettePlaying={isCassettePlaying}
        headphonesOn={headphonesOn}
        showHints={showHints}
        restMode={restMode}
        onObjectClick={handleRoomObjectClick}
        onSecretTrigger={(sec) => setSecretDiscovery(sec)}
        reducedMotion={reducedMotion}
      />

      {/* INTRO OVERLAY */}
      {!hasEntered && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#101722]/75 backdrop-blur-md transition-opacity duration-1000">
          <div className="max-w-md text-center space-y-6">
            <h1 className="font-serif text-3xl sm:text-4xl text-[#E8DCC7] tracking-wide">
              A rainy day in 2007.
            </h1>
            <p className="text-sm sm:text-base text-[#E8DCC7]/80 leading-relaxed whitespace-pre-line">
              {"It's 9:43 PM.\nThe rain hasn't stopped.\nYou have nowhere to be tonight."}
            </p>
            <div className="pt-2">
              <button
                onClick={handleEnterRoom}
                className="px-7 py-3 rounded-full bg-[#D9A566] hover:bg-[#E5B57B] text-[#182435] text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-[0_0_30px_rgba(217,165,102,0.4)] transition-all hover:scale-105"
              >
                [ ENTER MY ROOM ]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MINIMAL CORNER HUD (Hidden in Rest Mode) */}
      {hasEntered && !restMode && (
        <>
          {/* Top-Left Title & Time */}
          <div className="fixed top-4 left-4 z-30 flex items-center gap-3 pointer-events-none">
            <div className="px-3.5 py-2 rounded-full bg-[#182435]/75 backdrop-blur-md border border-[#E8DCC7]/15 shadow-lg">
              <span className="font-serif italic text-sm text-[#E8DCC7]">A rainy day in 2007</span>
              <span className="mx-2 text-[#E8DCC7]/30">·</span>
              <span className="font-mono text-xs text-[#D9A566]">{timePreset.label}</span>
            </div>
          </div>

          {/* Top-Right Minimal Controls */}
          <div className="fixed top-4 right-4 z-30 flex flex-wrap items-center justify-end gap-2">
            <button
              onClick={() => setActiveModal('memory')}
              className="px-3.5 py-2 rounded-full bg-[#182435]/80 hover:bg-[#24364D] backdrop-blur-md border border-[#E8DCC7]/15 text-xs text-[#E8DCC7] shadow-lg transition-colors"
            >
              remember something
            </button>

            <button
              onClick={() => setActiveModal('guestbook')}
              className="hidden sm:inline-flex px-3.5 py-2 rounded-full bg-[#182435]/80 hover:bg-[#24364D] backdrop-blur-md border border-[#E8DCC7]/15 text-xs text-[#E8DCC7] shadow-lg transition-colors"
            >
              leave a memory
            </button>

            {/* Sound Settings Button */}
            <div className="relative">
              <button
                onClick={() => setSoundMenuOpen((o) => !o)}
                className="p-2.5 rounded-full bg-[#182435]/80 hover:bg-[#24364D] backdrop-blur-md border border-[#E8DCC7]/15 text-[#E8DCC7] shadow-lg transition-colors"
                aria-label="Sound Settings"
              >
                {muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#D9A566]" />}
              </button>

              {soundMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#1D1816]/95 backdrop-blur-md border border-[#6B5444]/60 p-4 shadow-2xl space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#E8DCC7]">Room Audio</span>
                    <button
                      onClick={() => setMuted((m) => !m)}
                      className="px-2 py-0.5 rounded bg-[#2B2320] text-[#D9A566]"
                    >
                      {muted ? 'Unmute' : 'Mute All'}
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-[#E8DCC7]/70">
                      <span>Master Volume</span>
                      <span>{Math.round(masterVolume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.02"
                      value={masterVolume}
                      onChange={(e) => setMasterVolume(Number(e.target.value))}
                      className="w-full accent-[#D9A566]"
                    />
                  </div>

                  <div className="space-y-1.5 pt-1 border-t border-[#6B5444]/40">
                    {[
                      { key: 'rainOn', label: 'Rain Ambience' },
                      { key: 'thunderOn', label: 'Distant Thunder' },
                      { key: 'windOn', label: 'Soft Wind' },
                      { key: 'clockTickOn', label: 'Clock Ticking' },
                      { key: 'roomToneOn', label: 'Quiet Room Tone' },
                    ].map((s) => (
                      <label key={s.key} className="flex items-center justify-between cursor-pointer py-0.5">
                        <span className="text-[#E8DCC7]/85">{s.label}</span>
                        <input
                          type="checkbox"
                          checked={ambientState[s.key]}
                          onChange={() => setAmbientState((prev) => ({ ...prev, [s.key]: !prev[s.key] }))}
                          className="accent-[#D9A566]"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Subtle Help / Hint Highlight Toggle */}
            <button
              onClick={() => setShowHints((h) => !h)}
              className={`p-2.5 rounded-full backdrop-blur-md border shadow-lg transition-colors ${
                showHints
                  ? 'bg-[#D9A566] border-[#D9A566] text-[#182435]'
                  : 'bg-[#182435]/80 hover:bg-[#24364D] border-[#E8DCC7]/15 text-[#E8DCC7]'
              }`}
              title="Highlight clickable objects in the room"
              aria-label="Toggle object hints"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Quick Dock for effortless touch discovery */}
          <div className="sm:hidden fixed bottom-3 inset-x-3 z-30 flex items-center justify-around px-2 py-2 rounded-2xl bg-[#182435]/85 backdrop-blur-md border border-[#E8DCC7]/15 shadow-xl text-[11px]">
            <button onClick={() => setActiveModal('window')} className="flex flex-col items-center gap-0.5 text-[#E8DCC7]/85">
              <CloudRain className="w-4 h-4 text-[#9EC1E6]" />
              <span>Window</span>
            </button>
            <button onClick={() => setActiveModal('computer')} className="flex flex-col items-center gap-0.5 text-[#E8DCC7]/85">
              <Laptop className="w-4 h-4 text-sky-300" />
              <span>PC</span>
            </button>
            <button onClick={() => setActiveModal('cassette')} className="flex flex-col items-center gap-0.5 text-[#E8DCC7]/85">
              <Disc className="w-4 h-4 text-[#D9A566]" />
              <span>Music</span>
            </button>
            <button onClick={() => setActiveModal('diary')} className="flex flex-col items-center gap-0.5 text-[#E8DCC7]/85">
              <BookOpen className="w-4 h-4 text-[#AA8582]" />
              <span>Diary</span>
            </button>
            <button onClick={() => setActiveModal('phone')} className="flex flex-col items-center gap-0.5 text-[#E8DCC7]/85">
              <Phone className="w-4 h-4 text-emerald-300" />
              <span>Phone</span>
            </button>
          </div>
        </>
      )}

      {/* REST MODE OVERLAY */}
      {restMode && (
        <div className="fixed inset-0 z-30 flex flex-col items-center justify-between p-8 bg-[#090D14]/45 transition-all duration-1000">
          <div className="text-center space-y-1 opacity-75">
            <p className="font-serif italic text-lg text-[#E8DCC7]">Resting while it rains...</p>
            {restTimerSeconds !== null && (
              <p className="font-mono text-sm text-[#D9A566]">{formatTimer(restTimerSeconds)}</p>
            )}
          </div>

          <button
            onClick={() => {
              setRestMode(false);
              setRestTimerSeconds(null);
            }}
            className="px-5 py-2.5 rounded-full bg-[#182435]/80 hover:bg-[#24364D] border border-[#E8DCC7]/20 text-xs text-[#E8DCC7]/90 backdrop-blur-md transition-all"
          >
            Sit back up
          </button>
        </div>
      )}

      {/* SUBTLE TOAST FEEDBACK */}
      {toastMessage && (
        <div className="fixed bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#182435]/95 border border-[#D9A566]/40 text-xs text-[#E8DCC7] shadow-xl">
          {toastMessage}
        </div>
      )}

      {/* MODALS FOR INTERACTIVE ROOM OBJECTS */}
      {activeModal === 'window' && (
        <WindowModal
          onClose={() => setActiveModal(null)}
          rainMode={rainMode}
          setRainMode={setRainMode}
          rainIntensity={rainIntensity}
          setRainIntensity={setRainIntensity}
          timePreset={timePreset}
          lampOn={lampOn}
          lightningFlash={lightningFlash}
          reducedMotion={reducedMotion}
        />
      )}

      {activeModal === 'computer' && (
        <RetroComputerModal
          onClose={() => setActiveModal(null)}
          timePreset={timePreset}
          notepadText={notepadText}
          setNotepadText={setNotepadText}
          guestbookEntries={guestbookEntries}
          onAddGuestbook={(author, text) =>
            setGuestbookEntries((prev) => [
              { id: Date.now().toString(), author, date: 'Tonight', text, isPersonal: true },
              ...prev,
            ])
          }
        />
      )}

      {activeModal === 'cassette' && (
        <CassetteModal
          onClose={() => setActiveModal(null)}
          isPlaying={isCassettePlaying}
          onTogglePlay={() => setIsCassettePlaying((p) => !p)}
          playlistId={playlistId}
          setPlaylistId={setPlaylistId}
          trackIndex={trackIndex}
          setTrackIndex={setTrackIndex}
          musicVolume={musicVolume}
          setMusicVolume={setMusicVolume}
          headphonesOn={headphonesOn}
          setHeadphonesOn={setHeadphonesOn}
          ambientState={ambientState}
          setAmbientState={setAmbientState}
        />
      )}

      {activeModal === 'diary' && (
        <DiaryModal
          onClose={() => setActiveModal(null)}
          userEntries={userDiaryEntries}
          onAddEntry={(content) =>
            setUserDiaryEntries((prev) => [
              { id: Date.now().toString(), date: 'Tonight · 2007 Memory', mood: 'personal', content, isUser: true },
              ...prev,
            ])
          }
          onDeleteEntry={(id) => setUserDiaryEntries((prev) => prev.filter((e) => e.id !== id))}
        />
      )}

      {activeModal === 'bookshelf' && <BookshelfModal onClose={() => setActiveModal(null)} />}

      {activeModal === 'phone' && <RetroPhoneModal onClose={() => setActiveModal(null)} timePreset={timePreset} />}

      {activeModal === 'clock' && (
        <ClockModal
          onClose={() => setActiveModal(null)}
          timePresetId={timePresetId}
          setTimePresetId={setTimePresetId}
          secretUnlocked={false}
        />
      )}

      {activeModal === 'bed' && (
        <BedPromptModal
          onClose={() => setActiveModal(null)}
          onEnterRestMode={(withTimer) => {
            setActiveModal(null);
            setRestMode(true);
            setRestTimerSeconds(withTimer ? 300 : null);
          }}
        />
      )}

      {activeModal === 'drawer' && <DrawerModal onClose={() => setActiveModal(null)} />}

      {activeModal === 'memory' && <MemoryPopupModal onClose={() => setActiveModal(null)} />}

      {activeModal === 'guestbook' && (
        <GuestbookModal
          onClose={() => setActiveModal(null)}
          entries={guestbookEntries}
          onAddEntry={(author, text) =>
            setGuestbookEntries((prev) => [
              { id: Date.now().toString(), author, date: 'Tonight', text, isPersonal: true },
              ...prev,
            ])
          }
          onDeleteEntry={(id) => setGuestbookEntries((prev) => prev.filter((e) => e.id !== id))}
        />
      )}

      {secretDiscovery && <SecretModal secret={secretDiscovery} onClose={() => setSecretDiscovery(null)} />}
    </div>
  );
}