# MVP Requirements

## Feature 1: Product Input

Fields:
- Product name
- Category
- Price
- Sold count
- Rating
- Review count
- Commission rate or estimated commission
- Product URL
- Pain Point
- Benefit
- Target Audience
- Notes

## Feature 2: Score Engine

Calculate score 0-100.

Weights:
- Sales score: 20
- Review score: 15
- Rating score: 15
- Price score: 15
- Commission score: 20
- Content potential score: 15

## Feature 3: Recommendation

Show:
- Score
- Grade
- Recommendation
- Main reason
- Risk warning

Recommendation rules:
- 90-100 = 🔥 รีบทำ
- 80-89 = ✅ น่าสนใจมาก
- 70-79 = 👍 ทดลองได้
- 60-69 = ⚠️ ระวัง
- Below 60 = ❌ ผ่าน

Risk warning logic examples:
- High sales but low commission
- High commission but low sales
- Good rating but low reviews

## Feature 4: Content Generator

Generate from templates:
- 10 hooks
- 3 video structures
- 5 captions
- 10 hashtags

## Feature 5: Product History

Store analyzed products in localStorage.
Allow user to view previous products.
