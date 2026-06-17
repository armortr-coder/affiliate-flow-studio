# Implementation Plan

## Step 1
Create Next.js app with TypeScript and Tailwind.

## Step 2
Create product types in lib/types.ts, including:
- Pain Point
- Benefit
- Target Audience

## Step 3
Create score engine in lib/scoring.ts.

Include:
- Score calculation
- Grade
- Recommendation rules
- Risk warning logic

## Step 4
Create content template generator in lib/contentTemplates.ts.

Include:
- Hooks
- Video structures
- Captions
- Hashtags

## Step 5
Create UI components:
- ProductForm
- ScoreCard
- ScoreBreakdown
- ContentOutput
- ProductHistory

## Step 6
Wire everything in app/page.tsx.

## Step 7
Add localStorage save/load.

## Step 8
Test manually on mobile width.

## Step 9
Deploy to Vercel.
