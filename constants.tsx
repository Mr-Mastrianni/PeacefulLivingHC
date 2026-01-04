
import React from 'react';
import { Service } from './types';

export const BUSINESS_NAME = "Peaceful Living Home Care LLC";
export const PHONE_DISPLAY = "317-600-7994";
export const PHONE_TEL = "tel:3176007994";
export const EMAIL = "Peacefullivinghc@outlook.com";
export const CAREERS_LINK = "https://14002.axiscare.com";

export const SERVICES: Service[] = [
  { id: '1', title: 'Non-Medical', description: 'Safe and reliable travel for appointments and errands.' },
  { id: '2', title: 'Companion Care', description: 'Support and engagement for activities.' },
  { id: '3', title: 'Meal Preparation', description: 'Nutritious meal planning and assistance.' },
  { id: '4', title: 'Assistance with Activities of Daily Living (ADLs)', description: 'Help with personal care tasks to promote independence.' },
  { id: '5', title: 'Social Interaction', description: 'Encouragement and companionship to enhance well-being.' },
  { id: '6', title: 'Errand Running', description: 'Support with grocery shopping and other errands.' },
];

export const LogoIcon = ({ className = "w-12 h-12", id = "logo-grad" }: { className?: string; id?: string }) => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="50%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#fb923c" />
      </linearGradient>
    </defs>
    
    {/* The Heart - Centered above the valley of the two houses */}
    <path 
      d="M200,225 C200,225 185,185 150,185 C115,185 95,210 95,240 C95,275 135,310 200,350 C265,310 305,275 305,240 C305,210 285,185 250,185 C215,185 200,225 200,225 Z" 
      stroke={`url(#${id})`} 
      strokeWidth="12" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      transform="translate(0, -100)"
    />

    {/* The Two Houses - Connected at the center */}
    <path 
      d="M70,260 V200 L145,135 L200,190 L255,135 L330,200 V260" 
      stroke={`url(#${id})`} 
      strokeWidth="14" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    {/* Shared Center Wall */}
    <path d="M200,190 V260" stroke={`url(#${id})`} strokeWidth="14" strokeLinecap="round" />

    {/* Arched Windows - Simplified to match logo aesthetic */}
    <path d="M110,215 A8,8 0 0 1 126,215 V235 H110 Z" stroke={`url(#${id})`} strokeWidth="4" />
    <path d="M110,225 H126 M118,215 V235" stroke={`url(#${id})`} strokeWidth="2" />

    <path d="M274,215 A8,8 0 0 1 290,215 V235 H274 Z" stroke={`url(#${id})`} strokeWidth="4" />
    <path d="M274,225 H290 M282,215 V235" stroke={`url(#${id})`} strokeWidth="2" />

    {/* Bottom Base Bar */}
    <path d="M40,275 H360" stroke={`url(#${id})`} strokeWidth="14" strokeLinecap="round" />
  </svg>
);

export const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export const MailIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
