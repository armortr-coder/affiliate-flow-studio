# Scoring Engine Spec

## Total Score
100 points

## Sales Score - 20
- sold >= 10000: 20
- sold >= 5000: 16
- sold >= 1000: 12
- sold >= 300: 8
- sold >= 100: 5
- otherwise: 2

## Review Score - 15
- reviews >= 3000: 15
- reviews >= 1000: 12
- reviews >= 300: 9
- reviews >= 100: 6
- reviews >= 30: 3
- otherwise: 1

## Rating Score - 15
- rating >= 4.8: 15
- rating >= 4.6: 12
- rating >= 4.4: 9
- rating >= 4.2: 6
- rating >= 4.0: 3
- otherwise: 0

## Price Score - 15
For Thai affiliate impulse-buy products:
- 99-499 THB: 15
- 500-999 THB: 12
- 1000-1999 THB: 8
- 2000-4999 THB: 5
- otherwise: 3

## Commission Score - 20
Use estimated commission amount or rate.
- commission >= 200 THB or rate >= 10%: 20
- commission >= 100 THB or rate >= 7%: 16
- commission >= 50 THB or rate >= 5%: 12
- commission >= 20 THB or rate >= 3%: 8
- otherwise: 3

## Content Potential Score - 15
Manual selector:
- Very high: 15
- High: 12
- Medium: 8
- Low: 4
- Very low: 1

## Grade
- 90-100: Excellent
- 80-89: Strong
- 70-79: Test
- 60-69: Risky
- Below 60: Avoid

## Recommendation Rules
- 90-100: 🔥 รีบทำ
- 80-89: ✅ น่าสนใจมาก
- 70-79: 👍 ทดลองได้
- 60-69: ⚠️ ระวัง
- Below 60: ❌ ผ่าน

## Risk Warning Logic

Show risk warning based on weak or conflicting signals.

Examples:
- High sales but low commission
- High commission but low sales
- Good rating but low reviews

Suggested rules:
- If sales score is high but commission score is low, warn that the product may sell well but profit may be too low.
- If commission score is high but sales score is low, warn that the product may pay well but demand is not proven.
- If rating score is high but review score is low, warn that product quality looks good but proof is still limited.
- If rating score is low, warn that buyer satisfaction may be a conversion risk.
- If price score is low, warn that the product may be harder to sell as an impulse-buy affiliate product.
