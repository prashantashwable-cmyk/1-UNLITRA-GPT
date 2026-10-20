// Checklists, SOPs and material templates (trilingual).
// IMPORTANT (spec §10, §26): these are SAMPLE templates. They must be validated by qualified lift
// professionals against the applicable Maharashtra and Indian lift regulations before real use.
// The app shows this status wherever a template is used.

import type { LText } from '../i18n/core';
import type { BlockerReason, Requirements, Role, MaterialItem } from './types';

export const TEMPLATE_VERSION = 'v1-sample';

export type Illustration =
  | 'building'
  | 'shaft'
  | 'floors'
  | 'pit'
  | 'overhead'
  | 'power'
  | 'light'
  | 'door'
  | 'barricade'
  | 'hook'
  | 'rails'
  | 'motor'
  | 'cabin'
  | 'counterweight'
  | 'wiring'
  | 'safety'
  | 'trial'
  | 'clean'
  | 'measure'
  | 'helmet'
  | 'seal'
  | 'truck'
  | 'box'
  | 'sign'
  | 'phone'
  | 'camera'
  | 'map'
  | 'money'
  | 'chat'
  | 'service';

// ---------------------------------------------------------------------------
// Customer site preparation (spec §9)

export interface PrepItemTemplate {
  id: string;
  illustration: Illustration;
  title: LText;
  help: LText;
  minPhotos: number;
}

export const PREP_ITEMS: PrepItemTemplate[] = [
  {
    id: 'shaft_size',
    illustration: 'shaft',
    title: { mr: 'लिफ्टच्या खड्ड्याचा (शाफ्ट) आकार', hi: 'लिफ्ट शाफ्ट का आकार', en: 'Lift shaft size' },
    help: {
      mr: 'शाफ्टची आतील रुंदी आणि खोली ड्रॉइंगप्रमाणे असावी. मोजपट्टी लावून फोटो काढा.',
      hi: 'शाफ्ट की अंदर की चौड़ाई और गहराई ड्रॉइंग के अनुसार हो। नापने का फीता लगाकर फोटो लें।',
      en: 'Inside width and depth of the shaft must match the drawing. Take a photo with a measuring tape.',
    },
    minPhotos: 1,
  },
  {
    id: 'shaft_walls',
    illustration: 'shaft',
    title: { mr: 'शाफ्टच्या भिंती सरळ व प्लास्टर केलेल्या', hi: 'शाफ्ट की दीवारें सीधी और प्लास्टर की हुई', en: 'Shaft walls straight and plastered' },
    help: {
      mr: 'भिंती उभ्या सरळ असाव्यात. भिंतीतून सळई किंवा पाईप बाहेर नसावेत.',
      hi: 'दीवारें बिल्कुल सीधी खड़ी हों। दीवार से सरिया या पाइप बाहर न निकले हों।',
      en: 'Walls must be vertical and straight. No rods or pipes sticking out of the walls.',
    },
    minPhotos: 1,
  },
  {
    id: 'pit',
    illustration: 'pit',
    title: { mr: 'तळाचा खड्डा (पिट) कोरडा व वॉटरप्रूफ', hi: 'नीचे का गड्ढा (पिट) सूखा और वॉटरप्रूफ', en: 'Pit dry and waterproofed' },
    help: {
      mr: 'सर्वात खालच्या मजल्याखाली ड्रॉइंगप्रमाणे खोल खड्डा हवा. त्यात पाणी साचू नये.',
      hi: 'सबसे निचली मंज़िल के नीचे ड्रॉइंग जितना गहरा गड्ढा हो। उसमें पानी जमा न हो।',
      en: 'A pit below the lowest floor, as deep as the drawing says. No water should collect in it.',
    },
    minPhotos: 1,
  },
  {
    id: 'overhead',
    illustration: 'overhead',
    title: { mr: 'वरची उंची / मशीन रूम तयार', hi: 'ऊपर की ऊंचाई / मशीन रूम तैयार', en: 'Top height / machine room ready' },
    help: {
      mr: 'सर्वात वरच्या मजल्यावर ड्रॉइंगप्रमाणे उंची सोडा. मशीन रूम असल्यास तिचा फोटो काढा.',
      hi: 'सबसे ऊपरी मंज़िल पर ड्रॉइंग जितनी ऊंचाई छोड़ें। मशीन रूम हो तो उसकी फोटो लें।',
      en: 'Leave the top height given in the drawing. If there is a machine room, photograph it.',
    },
    minPhotos: 1,
  },
  {
    id: 'door_openings',
    illustration: 'door',
    title: { mr: 'प्रत्येक मजल्यावर दरवाजाची जागा', hi: 'हर मंज़िल पर दरवाज़े की जगह', en: 'Door opening on every floor' },
    help: {
      mr: 'प्रत्येक मजल्यावर एकाच मापाची, एकाच रेषेत दरवाजाची जागा ठेवा.',
      hi: 'हर मंज़िल पर एक ही नाप की, एक ही सीध में दरवाज़े की जगह रखें।',
      en: 'Keep a door opening of the same size, in one straight line, on every floor.',
    },
    minPhotos: 1,
  },
  {
    id: 'power',
    illustration: 'power',
    title: { mr: '३-फेज वीज पुरवठा व MCB', hi: '3-फेज बिजली सप्लाई और MCB', en: '3-phase power supply with MCB' },
    help: {
      mr: 'परवानाधारक इलेक्ट्रिशियनकडून लिफ्टजवळ ३-फेज वीज व MCB/आयसोलेटर बसवा.',
      hi: 'लाइसेंस वाले इलेक्ट्रीशियन से लिफ्ट के पास 3-फेज बिजली और MCB/आइसोलेटर लगवाएं।',
      en: 'Ask a licensed electrician to bring 3-phase power with an MCB/isolator near the lift.',
    },
    minPhotos: 1,
  },
  {
    id: 'lighting',
    illustration: 'light',
    title: { mr: 'शाफ्टमध्ये प्रकाश व अर्थिंग', hi: 'शाफ्ट में रोशनी और अर्थिंग', en: 'Light and earthing in shaft' },
    help: {
      mr: 'कामासाठी शाफ्टमध्ये तात्पुरता दिवा आणि अर्थिंग पॉइंट द्या.',
      hi: 'काम के लिए शाफ्ट में अस्थायी बल्ब और अर्थिंग पॉइंट दें।',
      en: 'Provide a temporary light inside the shaft and an earthing point.',
    },
    minPhotos: 1,
  },
  {
    id: 'barricade',
    illustration: 'barricade',
    title: { mr: 'उघड्या जागांना सुरक्षा कठडे', hi: 'खुली जगहों पर सुरक्षा बैरिकेड', en: 'Safety barricades on openings' },
    help: {
      mr: 'कोणी पडू नये म्हणून प्रत्येक मजल्यावरील उघडी जागा मजबूत कठड्याने बंद करा.',
      hi: 'कोई गिरे नहीं, इसलिए हर मंज़िल की खुली जगह को मज़बूत बैरिकेड से बंद करें।',
      en: 'Close every open shaft entrance with a strong barricade so nobody falls.',
    },
    minPhotos: 1,
  },
  {
    id: 'hook',
    illustration: 'hook',
    title: { mr: 'शाफ्टच्या वर उचलण्याचा हुक', hi: 'शाफ्ट के ऊपर उठाने का हुक', en: 'Lifting hook at shaft top' },
    help: {
      mr: 'सामान उचलण्यासाठी शाफ्टच्या छताला मजबूत हुक/बीम बसवा.',
      hi: 'सामान उठाने के लिए शाफ्ट की छत में मज़बूत हुक/बीम लगाएं।',
      en: 'Fix a strong hook or beam in the shaft ceiling for lifting material.',
    },
    minPhotos: 1,
  },
];

// ---------------------------------------------------------------------------
// QC site readiness (spec §10)

export interface MeasureTemplate {
  id: string;
  label: LText;
  unit: 'mm' | 'count';
  min: number;
  max: number;
}

export const SITE_MEASUREMENTS: MeasureTemplate[] = [
  { id: 'shaft_width', label: { mr: 'शाफ्ट रुंदी', hi: 'शाफ्ट चौड़ाई', en: 'Shaft width' }, unit: 'mm', min: 800, max: 4000 },
  { id: 'shaft_depth', label: { mr: 'शाफ्ट खोली', hi: 'शाफ्ट गहराई', en: 'Shaft depth' }, unit: 'mm', min: 800, max: 4000 },
  { id: 'pit_depth', label: { mr: 'पिटची खोली', hi: 'पिट की गहराई', en: 'Pit depth' }, unit: 'mm', min: 100, max: 3000 },
  { id: 'overhead', label: { mr: 'वरची उंची', hi: 'ऊपर की ऊंचाई', en: 'Overhead height' }, unit: 'mm', min: 2000, max: 6000 },
  { id: 'door_width', label: { mr: 'दरवाजाची रुंदी', hi: 'दरवाज़े की चौड़ाई', en: 'Door opening width' }, unit: 'mm', min: 600, max: 2000 },
  { id: 'stops', label: { mr: 'थांबे (मजले)', hi: 'स्टॉप (मंज़िलें)', en: 'Stops (floors)' }, unit: 'count', min: 2, max: 40 },
];

export interface CheckTemplate {
  id: string;
  label: LText;
  critical: boolean;
}

export const SITE_CHECKS: CheckTemplate[] = [
  { id: 'access', label: { mr: 'साइटवर जाण्याचा सुरक्षित रस्ता', hi: 'साइट तक सुरक्षित रास्ता', en: 'Safe access to site' }, critical: false },
  { id: 'walls', label: { mr: 'भिंती सरळ व मजबूत', hi: 'दीवारें सीधी और मज़बूत', en: 'Walls straight and strong' }, critical: true },
  { id: 'pit_dry', label: { mr: 'पिट कोरडा', hi: 'पिट सूखा', en: 'Pit dry' }, critical: true },
  { id: 'power_ready', label: { mr: '३-फेज वीज तयार', hi: '3-फेज बिजली तैयार', en: '3-phase power ready' }, critical: true },
  { id: 'lighting', label: { mr: 'शाफ्टमध्ये प्रकाश', hi: 'शाफ्ट में रोशनी', en: 'Light in shaft' }, critical: false },
  { id: 'barricades', label: { mr: 'सुरक्षा कठडे', hi: 'सुरक्षा बैरिकेड', en: 'Safety barricades' }, critical: true },
  { id: 'hook', label: { mr: 'उचलण्याचा हुक', hi: 'उठाने का हुक', en: 'Lifting hook' }, critical: false },
];

export const FINAL_CHECKS: CheckTemplate[] = [
  { id: 'rails', label: { mr: 'रेल सरळ व घट्ट', hi: 'रेल सीधी और कसी हुई', en: 'Rails aligned and tight' }, critical: true },
  { id: 'interlocks', label: { mr: 'दरवाजा लॉक (इंटरलॉक)', hi: 'दरवाज़ा लॉक (इंटरलॉक)', en: 'Door interlocks' }, critical: true },
  { id: 'governor', label: { mr: 'ओव्हरस्पीड गव्हर्नर व सेफ्टी गियर', hi: 'ओवरस्पीड गवर्नर और सेफ्टी गियर', en: 'Overspeed governor and safety gear' }, critical: true },
  { id: 'buffers', label: { mr: 'बफर', hi: 'बफर', en: 'Buffers' }, critical: true },
  { id: 'limits', label: { mr: 'लिमिट स्विच', hi: 'लिमिट स्विच', en: 'Limit switches' }, critical: true },
  { id: 'alarm', label: { mr: 'अलार्म व इंटरकॉम', hi: 'अलार्म और इंटरकॉम', en: 'Alarm and intercom' }, critical: true },
  { id: 'ard', label: { mr: 'ARD (वीज गेल्यास सुटका)', hi: 'ARD (बिजली जाने पर बचाव)', en: 'ARD (rescue on power cut)' }, critical: true },
  { id: 'earthing', label: { mr: 'अर्थिंग', hi: 'अर्थिंग', en: 'Earthing' }, critical: true },
  { id: 'car_light_fan', label: { mr: 'केबिनमधील दिवा व पंखा', hi: 'केबिन में लाइट और पंखा', en: 'Cabin light and fan' }, critical: false },
  { id: 'levelling', label: { mr: 'मजल्याशी समपातळी', hi: 'मंज़िल से बराबर रुकना', en: 'Floor levelling' }, critical: false },
  { id: 'load_test', label: { mr: 'लोड टेस्ट', hi: 'लोड टेस्ट', en: 'Load test' }, critical: true },
  { id: 'finish', label: { mr: 'फिनिशिंग व स्वच्छता', hi: 'फिनिशिंग और सफाई', en: 'Finishing and cleaning' }, critical: false },
];

export const SERVICE_CHECKS: CheckTemplate[] = [
  { id: 'brakes', label: { mr: 'ब्रेक', hi: 'ब्रेक', en: 'Brakes' }, critical: true },
  { id: 'ropes', label: { mr: 'वायर रोप', hi: 'वायर रोप', en: 'Wire ropes' }, critical: true },
  { id: 'doors', label: { mr: 'दरवाजे व लॉक', hi: 'दरवाज़े और लॉक', en: 'Doors and locks' }, critical: true },
  { id: 'alarm', label: { mr: 'अलार्म', hi: 'अलार्म', en: 'Alarm' }, critical: true },
  { id: 'ard_battery', label: { mr: 'ARD बॅटरी', hi: 'ARD बैटरी', en: 'ARD battery' }, critical: true },
  { id: 'lubrication', label: { mr: 'ऑइलिंग / ग्रीसिंग', hi: 'ऑयलिंग / ग्रीसिंग', en: 'Lubrication' }, critical: false },
  { id: 'cleaning', label: { mr: 'पिट व केबिन स्वच्छता', hi: 'पिट और केबिन सफाई', en: 'Pit and cabin cleaning' }, critical: false },
];

// ---------------------------------------------------------------------------
// Installation SOP (spec §12)

export interface SopStep {
  title: LText;
  instructions: LText;
  safety: LText;
  illustration: Illustration;
  photos: number;
  video: boolean;
  critical: boolean;
}

export const SOP_STEPS: SopStep[] = [
  {
    title: { mr: 'साइट सुरक्षा तपासणी', hi: 'साइट सुरक्षा जांच', en: 'Site safety check' },
    instructions: {
      mr: 'हेल्मेट, सेफ्टी बेल्ट व बूट घाला. सर्व उघड्या जागांना कठडे आहेत का पाहा. कामाची जागा बंद करा.',
      hi: 'हेलमेट, सेफ्टी बेल्ट और जूते पहनें। सभी खुली जगहों पर बैरिकेड देखें। काम की जगह घेर दें।',
      en: 'Wear helmet, safety belt and shoes. Check all openings have barricades. Close off the work area.',
    },
    safety: { mr: 'मी सुरक्षा साहित्य घातले आहे', hi: 'मैंने सुरक्षा सामान पहना है', en: 'I am wearing safety gear' },
    illustration: 'helmet',
    photos: 1,
    video: false,
    critical: true,
  },
  {
    title: { mr: 'शाफ्ट व पिट मोजणी', hi: 'शाफ्ट और पिट नाप', en: 'Check shaft and pit size' },
    instructions: {
      mr: 'ड्रॉइंगप्रमाणे शाफ्ट रुंदी, खोली व पिट मोजा. फरक असल्यास काम थांबवा व कळवा.',
      hi: 'ड्रॉइंग के अनुसार शाफ्ट चौड़ाई, गहराई और पिट नापें। फर्क हो तो काम रोकें और बताएं।',
      en: 'Measure shaft width, depth and pit against the drawing. If different, stop and report.',
    },
    safety: { mr: 'मी पिटमध्ये सुरक्षितपणे उतरलो', hi: 'मैं पिट में सुरक्षित उतरा', en: 'I entered the pit safely' },
    illustration: 'measure',
    photos: 1,
    video: false,
    critical: false,
  },
  {
    title: { mr: 'प्लंब लाइन व ब्रॅकेट खुणा', hi: 'प्लंब लाइन और ब्रैकेट निशान', en: 'Plumb lines and bracket marking' },
    instructions: {
      mr: 'वरून खाली प्लंब लाइन सोडा. रेल ब्रॅकेटच्या जागा भिंतीवर खुणा करा.',
      hi: 'ऊपर से नीचे प्लंब लाइन डालें। रेल ब्रैकेट की जगह दीवार पर निशान लगाएं।',
      en: 'Drop plumb lines from top to bottom. Mark rail bracket positions on the wall.',
    },
    safety: { mr: 'मी उंचीवर सेफ्टी बेल्ट बांधला', hi: 'मैंने ऊंचाई पर सेफ्टी बेल्ट बांधी', en: 'I tied my safety belt at height' },
    illustration: 'measure',
    photos: 1,
    video: false,
    critical: false,
  },
  {
    title: { mr: 'गाईड रेल बसवणे', hi: 'गाइड रेल लगाना', en: 'Install guide rails' },
    instructions: {
      mr: 'ब्रॅकेट बसवा, नंतर रेल जोडा. प्रत्येक जोड सरळ व घट्ट करा.',
      hi: 'ब्रैकेट लगाएं, फिर रेल जोड़ें। हर जोड़ सीधा और कसा हुआ हो।',
      en: 'Fix brackets, then join the rails. Every joint must be straight and tight.',
    },
    safety: { mr: 'मी उंचीवर सेफ्टी बेल्ट बांधला', hi: 'मैंने ऊंचाई पर सेफ्टी बेल्ट बांधी', en: 'I tied my safety belt at height' },
    illustration: 'rails',
    photos: 2,
    video: false,
    critical: true,
  },
  {
    title: { mr: 'मशीन / मोटर बसवणे', hi: 'मशीन / मोटर लगाना', en: 'Install machine / motor' },
    instructions: {
      mr: 'मशीन बेडवर मशीन बसवा व बोल्ट घट्ट करा. सिरीयल नंबर दिसेल असा फोटो काढा.',
      hi: 'मशीन बेड पर मशीन रखें और बोल्ट कसें। सीरियल नंबर दिखे ऐसी फोटो लें।',
      en: 'Place the machine on its bed and tighten the bolts. Photograph the serial number.',
    },
    safety: { mr: 'उचलताना कोणी खाली उभे नव्हते', hi: 'उठाते समय नीचे कोई खड़ा नहीं था', en: 'Nobody stood below while lifting' },
    illustration: 'motor',
    photos: 1,
    video: false,
    critical: true,
  },
  {
    title: { mr: 'कार फ्रेम व केबिन', hi: 'कार फ्रेम और केबिन', en: 'Car frame and cabin' },
    instructions: {
      mr: 'पिटमध्ये कार फ्रेम जोडा, त्यावर केबिनचे पॅनेल बसवा.',
      hi: 'पिट में कार फ्रेम जोड़ें, उस पर केबिन के पैनल लगाएं।',
      en: 'Assemble the car frame in the pit and fix the cabin panels on it.',
    },
    safety: { mr: 'फ्रेम आधाराने सुरक्षित केली', hi: 'फ्रेम को सहारे से सुरक्षित किया', en: 'Frame is supported and secured' },
    illustration: 'cabin',
    photos: 1,
    video: false,
    critical: false,
  },
  {
    title: { mr: 'काउंटरवेट बसवणे', hi: 'काउंटरवेट लगाना', en: 'Install counterweight' },
    instructions: {
      mr: 'काउंटरवेट फ्रेम बसवा व ड्रॉइंगप्रमाणे वजन भरा.',
      hi: 'काउंटरवेट फ्रेम लगाएं और ड्रॉइंग के अनुसार वज़न भरें।',
      en: 'Fix the counterweight frame and fill weights as per the drawing.',
    },
    safety: { mr: 'वजने हाताळताना हातमोजे घातले', hi: 'वज़न उठाते समय दस्ताने पहने', en: 'I wore gloves while handling weights' },
    illustration: 'counterweight',
    photos: 1,
    video: false,
    critical: false,
  },
  {
    title: { mr: 'मजल्यांचे दरवाजे', hi: 'मंज़िलों के दरवाज़े', en: 'Landing doors' },
    instructions: {
      mr: 'प्रत्येक मजल्यावर दरवाजा बसवा. दरवाजा सरळ उघडतो-बंद होतो का तपासा.',
      hi: 'हर मंज़िल पर दरवाज़ा लगाएं। दरवाज़ा ठीक से खुलता-बंद होता है, जांचें।',
      en: 'Fix the door on every floor. Check it opens and closes smoothly.',
    },
    safety: { mr: 'दरवाजा बसेपर्यंत कठडा ठेवला', hi: 'दरवाज़ा लगने तक बैरिकेड रखा', en: 'Barricade kept until door was fixed' },
    illustration: 'door',
    photos: 2,
    video: false,
    critical: true,
  },
  {
    title: { mr: 'वायरिंग व कंट्रोलर', hi: 'वायरिंग और कंट्रोलर', en: 'Wiring and controller' },
    instructions: {
      mr: 'कंट्रोलर बसवा, ट्रॅव्हलिंग केबल व सर्व वायरिंग ड्रॉइंगप्रमाणे जोडा.',
      hi: 'कंट्रोलर लगाएं, ट्रैवलिंग केबल और सारी वायरिंग ड्रॉइंग के अनुसार जोड़ें।',
      en: 'Fix the controller, connect the travelling cable and all wiring as per the drawing.',
    },
    safety: { mr: 'काम करताना मुख्य वीज बंद होती', hi: 'काम के समय मेन बिजली बंद थी', en: 'Main power was off while wiring' },
    illustration: 'wiring',
    photos: 1,
    video: false,
    critical: true,
  },
  {
    title: { mr: 'सुरक्षा उपकरणे', hi: 'सुरक्षा उपकरण', en: 'Safety devices' },
    instructions: {
      mr: 'गव्हर्नर, सेफ्टी गियर, बफर, लिमिट स्विच बसवा व प्रत्येक तपासा. व्हिडिओ घ्या.',
      hi: 'गवर्नर, सेफ्टी गियर, बफर, लिमिट स्विच लगाएं और हर एक जांचें। वीडियो लें।',
      en: 'Fit governor, safety gear, buffers and limit switches and test each. Record a video.',
    },
    safety: { mr: 'प्रत्येक सुरक्षा उपकरण तपासले', hi: 'हर सुरक्षा उपकरण जांचा', en: 'Every safety device tested' },
    illustration: 'safety',
    photos: 1,
    video: true,
    critical: true,
  },
  {
    title: { mr: 'ट्रायल रन व लोड टेस्ट', hi: 'ट्रायल रन और लोड टेस्ट', en: 'Trial run and load test' },
    instructions: {
      mr: 'रिकामी लिफ्ट चालवा, नंतर ठरलेल्या वजनाने चालवा. प्रत्येक मजल्यावर समपातळी तपासा.',
      hi: 'खाली लिफ्ट चलाएं, फिर तय वज़न के साथ चलाएं। हर मंज़िल पर बराबर रुकना जांचें।',
      en: 'Run the empty lift, then with the rated load. Check levelling at every floor.',
    },
    safety: { mr: 'टेस्टवेळी केबिनमध्ये कोणीही प्रवासी नव्हता', hi: 'टेस्ट के समय केबिन में कोई सवारी नहीं थी', en: 'No passengers in the cabin during test' },
    illustration: 'trial',
    photos: 0,
    video: true,
    critical: true,
  },
  {
    title: { mr: 'स्वच्छता व फिनिशिंग', hi: 'सफाई और फिनिशिंग', en: 'Cleaning and finishing' },
    instructions: {
      mr: 'पिट, केबिन व दरवाजे स्वच्छ करा. उरलेले सामान व कचरा काढा.',
      hi: 'पिट, केबिन और दरवाज़े साफ करें। बचा सामान और कचरा हटाएं।',
      en: 'Clean the pit, cabin and doors. Remove leftover material and waste.',
    },
    safety: { mr: 'सर्व साधने काढून घेतली', hi: 'सारे औज़ार हटा लिए', en: 'All tools removed' },
    illustration: 'clean',
    photos: 2,
    video: false,
    critical: false,
  },
];

// ---------------------------------------------------------------------------
// Material list template (spec §11)

export interface MaterialTemplate {
  key: string;
  label: LText;
  unit: MaterialItem['unit'];
  serialRequired: boolean;
  qty: (r: Requirements) => number;
}

export const MATERIAL_TEMPLATE: MaterialTemplate[] = [
  { key: 'machine', label: { mr: 'मशीन / मोटर', hi: 'मशीन / मोटर', en: 'Machine / motor' }, unit: 'set', serialRequired: true, qty: () => 1 },
  { key: 'controller', label: { mr: 'कंट्रोलर पॅनेल', hi: 'कंट्रोलर पैनल', en: 'Controller panel' }, unit: 'set', serialRequired: true, qty: () => 1 },
  { key: 'rails', label: { mr: 'गाईड रेल', hi: 'गाइड रेल', en: 'Guide rails' }, unit: 'pcs', serialRequired: false, qty: (r) => r.stops * 4 },
  { key: 'brackets', label: { mr: 'रेल ब्रॅकेट', hi: 'रेल ब्रैकेट', en: 'Rail brackets' }, unit: 'pcs', serialRequired: false, qty: (r) => r.stops * 6 },
  { key: 'car_frame', label: { mr: 'कार फ्रेम व केबिन', hi: 'कार फ्रेम और केबिन', en: 'Car frame and cabin' }, unit: 'set', serialRequired: false, qty: () => 1 },
  { key: 'landing_doors', label: { mr: 'मजल्यांचे दरवाजे', hi: 'मंज़िलों के दरवाज़े', en: 'Landing doors' }, unit: 'set', serialRequired: false, qty: (r) => r.stops },
  { key: 'car_door', label: { mr: 'केबिन दरवाजा', hi: 'केबिन दरवाज़ा', en: 'Car door' }, unit: 'set', serialRequired: false, qty: () => 1 },
  { key: 'counterweight', label: { mr: 'काउंटरवेट', hi: 'काउंटरवेट', en: 'Counterweight' }, unit: 'set', serialRequired: false, qty: () => 1 },
  { key: 'governor', label: { mr: 'ओव्हरस्पीड गव्हर्नर', hi: 'ओवरस्पीड गवर्नर', en: 'Overspeed governor' }, unit: 'set', serialRequired: true, qty: () => 1 },
  { key: 'ard', label: { mr: 'ARD युनिट', hi: 'ARD यूनिट', en: 'ARD unit' }, unit: 'set', serialRequired: true, qty: () => 1 },
  { key: 'ropes', label: { mr: 'वायर रोप', hi: 'वायर रोप', en: 'Wire ropes' }, unit: 'm', serialRequired: false, qty: (r) => Math.round(r.stops * 3.2 * 4 + 20) },
  { key: 'buffers', label: { mr: 'बफर', hi: 'बफर', en: 'Buffers' }, unit: 'pcs', serialRequired: false, qty: () => 2 },
  { key: 'wiring', label: { mr: 'केबल व वायरिंग सेट', hi: 'केबल और वायरिंग सेट', en: 'Cables and wiring set' }, unit: 'set', serialRequired: false, qty: () => 1 },
];

export function materialLabel(key: string): LText {
  return MATERIAL_TEMPLATE.find((m) => m.key === key)?.label ?? { mr: key, hi: key, en: key };
}

// ---------------------------------------------------------------------------
// Blockers (spec §12) — each reason is routed to the responsible role

export const BLOCKER_ROUTING: Record<BlockerReason, Role> = {
  material_missing: 'admin',
  site_not_ready: 'sales',
  safety_issue: 'qc',
  need_help: 'admin',
  other: 'admin',
};

// ---------------------------------------------------------------------------
// Message templates for Sales (spec §7). Delivery is never claimed without confirmation.

export interface MessageTemplate {
  id: string;
  label: LText;
  body: LText;
}

export const MESSAGE_TEMPLATES: MessageTemplate[] = [
  {
    id: 'intro',
    label: { mr: 'ओळख', hi: 'परिचय', en: 'Introduction' },
    body: {
      mr: 'नमस्कार {name}, मी {sender}, ऑल इंडिया एलिव्हेटर्स कंपनी (AIEC) कडून. आपल्या {address} येथील इमारतीसाठी लिफ्टबद्दल बोलू शकतो का? संदर्भ: {id}',
      hi: 'नमस्ते {name}, मैं {sender}, ऑल इंडिया एलिवेटर्स कंपनी (AIEC) से। क्या आपकी {address} वाली इमारत के लिए लिफ्ट के बारे में बात कर सकते हैं? संदर्भ: {id}',
      en: 'Hello {name}, this is {sender} from All India Elevators Company (AIEC). Can we talk about a lift for your building at {address}? Ref: {id}',
    },
  },
  {
    id: 'quote',
    label: { mr: 'कोटेशन पाठवले', hi: 'कोटेशन भेजा', en: 'Quotation sent' },
    body: {
      mr: 'नमस्कार {name}, आपले कोटेशन ({id}) AIEC ॲपमध्ये तयार आहे. लॉगिन: फोन {phone}, पिन {pin}. प्रश्न असल्यास ॲपमध्ये संदेश पाठवा.',
      hi: 'नमस्ते {name}, आपका कोटेशन ({id}) AIEC ऐप में तैयार है। लॉगिन: फोन {phone}, पिन {pin}। सवाल हो तो ऐप में संदेश भेजें।',
      en: 'Hello {name}, your quotation ({id}) is ready in the AIEC app. Login: phone {phone}, PIN {pin}. Send us a message in the app for any questions.',
    },
  },
  {
    id: 'follow_up',
    label: { mr: 'पाठपुरावा', hi: 'फॉलो-अप', en: 'Follow-up' },
    body: {
      mr: 'नमस्कार {name}, AIEC कडून {sender}. लिफ्टबद्दल आपला निर्णय झाला का? मदतीसाठी आम्ही तयार आहोत. संदर्भ: {id}',
      hi: 'नमस्ते {name}, AIEC से {sender}। क्या आपने लिफ्ट के बारे में फैसला किया? मदद के लिए हम तैयार हैं। संदर्भ: {id}',
      en: 'Hello {name}, {sender} from AIEC. Have you decided about the lift? We are ready to help. Ref: {id}',
    },
  },
  {
    id: 'payment',
    label: { mr: 'पेमेंट आठवण', hi: 'भुगतान याद', en: 'Payment reminder' },
    body: {
      mr: 'नमस्कार {name}, प्रकल्प {id} साठी पुढील पेमेंट ॲपमध्ये बाकी आहे. कृपया ॲप उघडून पाहा.',
      hi: 'नमस्ते {name}, प्रोजेक्ट {id} का अगला भुगतान ऐप में बाकी है। कृपया ऐप खोलकर देखें।',
      en: 'Hello {name}, the next payment for project {id} is due in the app. Please open the app to see it.',
    },
  },
];

// ---------------------------------------------------------------------------
// Training modules (spec §15) — picture + audio cards and a simple knowledge check

export interface TrainingCard {
  illustration: Illustration;
  title: LText;
  text: LText;
}

export interface TrainingQuestion {
  question: LText;
  options: LText[];
  correct: number;
}

export interface TrainingModule {
  id: string;
  roles: Role[];
  title: LText;
  cards: TrainingCard[];
  quiz: TrainingQuestion[];
  authorises?: string;
}

const YES: LText = { mr: 'होय', hi: 'हाँ', en: 'Yes' };
const NO: LText = { mr: 'नाही', hi: 'नहीं', en: 'No' };

export const TRAINING_MODULES: TrainingModule[] = [
  {
    id: 'app_basics',
    roles: ['rider', 'sales', 'qc', 'supplier', 'technician', 'finance', 'admin', 'owner'],
    title: { mr: 'ॲप कसे वापरावे', hi: 'ऐप कैसे इस्तेमाल करें', en: 'How to use the app' },
    cards: [
      {
        illustration: 'phone',
        title: { mr: 'मोठे बटण दाबा', hi: 'बड़ा बटन दबाएं', en: 'Press the big button' },
        text: {
          mr: 'होम पेजवर "माझे पुढील काम सुरू करा" दाबा. ॲप तुम्हाला पुढे काय करायचे ते दाखवेल.',
          hi: 'होम पेज पर "मेरा अगला काम शुरू करें" दबाएं। ऐप आपको आगे क्या करना है, दिखाएगा।',
          en: 'On Home, press "Start my next task". The app shows you what to do next.',
        },
      },
      {
        illustration: 'chat',
        title: { mr: 'ऐका व मदत घ्या', hi: 'सुनें और मदद लें', en: 'Listen and get help' },
        text: {
          mr: '🔊 बटण दाबून सूचना ऐका. अडचण आल्यास "मदत" दाबा आणि संदेश पाठवा.',
          hi: '🔊 बटन दबाकर निर्देश सुनें। परेशानी हो तो "मदद" दबाएं और संदेश भेजें।',
          en: 'Press 🔊 to hear instructions. If stuck, press "Help" and send a message.',
        },
      },
      {
        illustration: 'camera',
        title: { mr: 'फोटो ॲपमधूनच', hi: 'फोटो ऐप से ही', en: 'Photos only from the app' },
        text: {
          mr: 'पुराव्याचे फोटो ॲपच्या कॅमेऱ्यानेच काढा. गॅलरीतून फोटो टाकता येत नाहीत.',
          hi: 'सबूत की फोटो ऐप के कैमरे से ही लें। गैलरी से फोटो नहीं डाल सकते।',
          en: 'Take evidence photos with the app camera only. Gallery photos are not allowed.',
        },
      },
    ],
    quiz: [
      {
        question: { mr: 'पुढे काय करायचे हे कसे कळेल?', hi: 'आगे क्या करना है, कैसे पता चलेगा?', en: 'How do you know what to do next?' },
        options: [
          { mr: '"माझे पुढील काम सुरू करा" दाबून', hi: '"मेरा अगला काम शुरू करें" दबाकर', en: 'Press "Start my next task"' },
          { mr: 'अंदाजाने', hi: 'अंदाज़ से', en: 'By guessing' },
        ],
        correct: 0,
      },
      {
        question: { mr: 'गॅलरीतील जुना फोटो पुरावा म्हणून चालेल का?', hi: 'क्या गैलरी की पुरानी फोटो सबूत चलेगी?', en: 'Can an old gallery photo be used as evidence?' },
        options: [YES, NO],
        correct: 1,
      },
    ],
  },
  {
    id: 'rider_safety',
    roles: ['rider'],
    title: { mr: 'रायडर सुरक्षा व साइट नोंद', hi: 'राइडर सुरक्षा और साइट दर्ज', en: 'Rider safety and site capture' },
    cards: [
      {
        illustration: 'helmet',
        title: { mr: 'आधी थांबा', hi: 'पहले रुकें', en: 'Stop first' },
        text: {
          mr: 'गाडी चालवताना फोन वापरू नका. सुरक्षित जागी थांबा, मगच ॲप उघडा.',
          hi: 'गाड़ी चलाते समय फोन न चलाएं। सुरक्षित जगह रुकें, फिर ऐप खोलें।',
          en: 'Never use the phone while riding. Stop in a safe place, then open the app.',
        },
      },
      {
        illustration: 'building',
        title: { mr: 'चांगले फोटो', hi: 'अच्छी फोटो', en: 'Good photos' },
        text: {
          mr: 'पूर्ण इमारत दिसेल असा फोटो, सुरक्षित जागेवरून शाफ्टचा फोटो आणि मजले दिसतील असा फोटो काढा.',
          hi: 'पूरी इमारत दिखे ऐसी फोटो, सुरक्षित जगह से शाफ्ट की फोटो और मंज़िलें दिखें ऐसी फोटो लें।',
          en: 'Take a photo of the whole building, the shaft from a safe spot, and one showing the floors.',
        },
      },
      {
        illustration: 'phone',
        title: { mr: 'बरोबर फोन नंबर', hi: 'सही फोन नंबर', en: 'Correct phone number' },
        text: {
          mr: 'नंबर टाकल्यावर तो ऐकून खात्री करा. चुकीचा नंबर असल्यास लीड परत येते.',
          hi: 'नंबर डालने के बाद सुनकर पक्का करें। गलत नंबर हो तो लीड वापस आती है।',
          en: 'After entering the number, listen to it to confirm. Wrong numbers get the lead returned.',
        },
      },
    ],
    quiz: [
      {
        question: { mr: 'गाडी चालवताना साइट नोंदवावी का?', hi: 'क्या गाड़ी चलाते हुए साइट दर्ज करें?', en: 'Should you record a site while riding?' },
        options: [YES, NO],
        correct: 1,
      },
    ],
  },
  {
    id: 'technician_sop',
    roles: ['technician'],
    authorises: 'installation',
    title: { mr: 'इन्स्टॉलेशन SOP व पुरावा', hi: 'इंस्टॉलेशन SOP और सबूत', en: 'Installation SOP and evidence' },
    cards: [
      {
        illustration: 'helmet',
        title: { mr: 'सुरक्षा प्रथम', hi: 'सुरक्षा पहले', en: 'Safety first' },
        text: {
          mr: 'प्रत्येक पायरीआधी सुरक्षा तपासणी करा. असुरक्षित वाटल्यास काम थांबवा व "अडचण" नोंदवा.',
          hi: 'हर चरण से पहले सुरक्षा जांच करें। असुरक्षित लगे तो काम रोकें और "रुकावट" दर्ज करें।',
          en: 'Check safety before every step. If unsafe, stop work and report a blocker.',
        },
      },
      {
        illustration: 'camera',
        title: { mr: 'प्रत्येक पायरीचा पुरावा', hi: 'हर चरण का सबूत', en: 'Evidence for every step' },
        text: {
          mr: 'पायरी पूर्ण करण्यासाठी ठरलेले फोटो/व्हिडिओ लागतात. स्पष्ट व उजेडात फोटो काढा.',
          hi: 'चरण पूरा करने के लिए तय फोटो/वीडियो चाहिए। साफ़ और रोशनी में फोटो लें।',
          en: 'Each step needs the listed photos/videos. Take clear photos in good light.',
        },
      },
    ],
    quiz: [
      {
        question: { mr: 'पुरावा नसताना पायरी पूर्ण करता येते का?', hi: 'क्या बिना सबूत चरण पूरा कर सकते हैं?', en: 'Can you complete a step without evidence?' },
        options: [YES, NO],
        correct: 1,
      },
      {
        question: { mr: 'असुरक्षित वाटल्यास काय करावे?', hi: 'असुरक्षित लगे तो क्या करें?', en: 'What do you do if it feels unsafe?' },
        options: [
          { mr: 'काम थांबवून अडचण नोंदवा', hi: 'काम रोककर रुकावट दर्ज करें', en: 'Stop and report a blocker' },
          { mr: 'तसेच काम चालू ठेवा', hi: 'काम चालू रखें', en: 'Keep working anyway' },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: 'service_basics',
    roles: ['technician'],
    authorises: 'service',
    title: { mr: 'AMC सर्व्हिस भेट', hi: 'AMC सर्विस विज़िट', en: 'AMC service visit' },
    cards: [
      {
        illustration: 'service',
        title: { mr: 'तपासणी यादी', hi: 'जांच सूची', en: 'Checklist' },
        text: {
          mr: 'ब्रेक, रोप, दरवाजे, अलार्म व ARD बॅटरी तपासा. काम झाल्यावर ग्राहकाची सही घ्या.',
          hi: 'ब्रेक, रोप, दरवाज़े, अलार्म और ARD बैटरी जांचें। काम के बाद ग्राहक के हस्ताक्षर लें।',
          en: 'Check brakes, ropes, doors, alarm and ARD battery. Take the customer signature at the end.',
        },
      },
    ],
    quiz: [
      {
        question: { mr: 'भेटीनंतर कोणाची सही घ्यावी?', hi: 'विज़िट के बाद किसके हस्ताक्षर लें?', en: 'Whose signature do you take after a visit?' },
        options: [
          { mr: 'ग्राहकाची', hi: 'ग्राहक के', en: 'The customer' },
          { mr: 'कोणाचीही नाही', hi: 'किसी के नहीं', en: 'Nobody' },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: 'qc_basics',
    roles: ['qc'],
    authorises: 'qc',
    title: { mr: 'QC तपासणी पद्धत', hi: 'QC जांच तरीका', en: 'QC inspection method' },
    cards: [
      {
        illustration: 'measure',
        title: { mr: 'मोजा व नोंदवा', hi: 'नापें और दर्ज करें', en: 'Measure and record' },
        text: {
          mr: 'प्रत्येक माप मिमीमध्ये टाका. प्रत्येक चुकीच्या गोष्टीसाठी सोप्या भाषेत दुरुस्ती लिहा.',
          hi: 'हर नाप मिमी में डालें। हर गलती के लिए आसान भाषा में सुधार लिखें।',
          en: 'Enter every measurement in mm. Write each correction in plain words.',
        },
      },
    ],
    quiz: [
      {
        question: { mr: 'तपासणी नापास झाल्यास प्रकल्प पुढे जातो का?', hi: 'जांच फेल होने पर क्या प्रोजेक्ट आगे बढ़ता है?', en: 'Does a failed inspection move the project forward?' },
        options: [YES, NO],
        correct: 1,
      },
    ],
  },
  {
    id: 'sales_basics',
    roles: ['sales'],
    title: { mr: 'विक्री पाठपुरावा', hi: 'बिक्री फॉलो-अप', en: 'Sales follow-up' },
    cards: [
      {
        illustration: 'chat',
        title: { mr: 'प्रत्येक बोलणे नोंदवा', hi: 'हर बातचीत दर्ज करें', en: 'Record every conversation' },
        text: {
          mr: 'प्रत्येक कॉलनंतर परिणाम व पुढील तारीख नोंदवा. तोंडी निर्णय ॲपमध्ये लिहा.',
          hi: 'हर कॉल के बाद नतीजा और अगली तारीख दर्ज करें। मौखिक फैसले ऐप में लिखें।',
          en: 'After every call record the outcome and next date. Write verbal decisions in the app.',
        },
      },
    ],
    quiz: [
      {
        question: { mr: 'मंजूर मर्यादेखाली सवलत देता येते का?', hi: 'क्या मंज़ूर सीमा से कम छूट दे सकते हैं?', en: 'Can you discount below the approved limit on your own?' },
        options: [YES, NO],
        correct: 1,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Help assistant knowledge base (spec §15). Answers only from approved material.

export interface FaqEntry {
  keywords: string[];
  answer: LText;
}

export const FAQ: FaqEntry[] = [
  {
    keywords: ['photo', 'फोटो', 'camera', 'कॅमेरा', 'कैमरा', 'gallery', 'गॅलरी', 'गैलरी'],
    answer: {
      mr: 'पुराव्याचे फोटो ॲपच्या कॅमेऱ्यानेच काढा. कॅमेरा बंद असल्यास ब्राउझर सेटिंगमध्ये "कॅमेरा परवानगी" द्या.',
      hi: 'सबूत की फोटो ऐप के कैमरे से ही लें। कैमरा बंद हो तो ब्राउज़र सेटिंग में "कैमरा अनुमति" दें।',
      en: 'Evidence photos must be taken with the app camera. If the camera is blocked, allow camera permission in browser settings.',
    },
  },
  {
    keywords: ['offline', 'network', 'नेटवर्क', 'internet', 'इंटरनेट', 'sync'],
    answer: {
      mr: 'नेटवर्क नसल्यास काम फोनवर जतन होते. नेटवर्क आल्यावर ते आपोआप पाठवले जाते.',
      hi: 'नेटवर्क न हो तो काम फोन में सेव रहता है। नेटवर्क आने पर अपने आप भेजा जाता है।',
      en: 'Without network your work is saved on the phone and sent automatically when the network returns.',
    },
  },
  {
    keywords: ['payment', 'पेमेंट', 'भुगतान', 'pay', 'पैसे', 'upi', 'utr'],
    answer: {
      mr: 'पेमेंट फक्त ॲपमधील पेमेंट किंवा बँक UTR नंबरने होते. वित्त विभाग तपासल्यावरच पेमेंट "पक्के" होते.',
      hi: 'भुगतान केवल ऐप के भुगतान या बैंक UTR नंबर से होता है। वित्त विभाग जांचने के बाद ही भुगतान "पक्का" होता है।',
      en: 'Payments are made in the app or by bank transfer with a UTR number. A payment counts only after it is verified.',
    },
  },
  {
    keywords: ['blocker', 'अडचण', 'रुकावट', 'stuck', 'problem', 'समस्या'],
    answer: {
      mr: 'पायरी करता येत नसल्यास "मी हे करू शकत नाही" दाबा, कारण निवडा, फोटो किंवा आवाज संदेश जोडा.',
      hi: 'चरण न हो पाए तो "मैं यह नहीं कर सकता" दबाएं, कारण चुनें, फोटो या आवाज़ संदेश जोड़ें।',
      en: 'If you cannot do a step, press "I can\'t do this step", choose a reason and add a photo or voice note.',
    },
  },
  {
    keywords: ['commission', 'कमिशन', 'points', 'गुण', 'अंक', 'pay', 'earning', 'कमाई'],
    answer: {
      mr: 'गुण व कमिशनचे नियम "लीडरबोर्ड" पानावर आहेत. मालकाने मंजूर न केलेले नियम अजून लागू नाहीत.',
      hi: 'अंक और कमीशन के नियम "लीडरबोर्ड" पेज पर हैं। मालिक की मंज़ूरी के बिना नियम अभी लागू नहीं हैं।',
      en: 'Points and commission rules are on the Leaderboard page. Rules not yet approved by the owner are not in force.',
    },
  },
  {
    keywords: ['language', 'भाषा', 'marathi', 'hindi', 'मराठी', 'हिंदी'],
    answer: {
      mr: 'वरच्या पट्टीतील भाषा बटण दाबून मराठी, हिंदी किंवा इंग्रजी निवडा.',
      hi: 'ऊपर की पट्टी में भाषा बटन दबाकर मराठी, हिंदी या अंग्रेज़ी चुनें।',
      en: 'Press the language button in the top bar to choose Marathi, Hindi or English.',
    },
  },
];
