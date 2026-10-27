# Google Forms setup

EngPro and the Opportunities board collect sign-ups with three Google Forms. Answers stay in Google Forms/Sheets and are never copied into this repo.

## How to set up each form
1. Go to forms.google.com → **Blank form**. Use the title and questions below. Put each question in both languages, English first, then Arabic on a new line.
2. **Settings → Responses**: turn on **Collect email addresses** (choose *Responder input*), and turn off "Limit to 1 response" so people don't need a Google account.
3. **Responses → Link to Sheets** to keep the answers in a spreadsheet.
4. Click **Send → link icon → Shorten URL**, copy the link, and paste it into `src/config/forms.ts`:
   - Form 1 → `engproLearner`
   - Form 2 → `engproTeacher`
   - Form 3 → `submitOpportunity`
5. Open a pull request with that change. The "Coming soon" label on the site turns into a button.

`*` = required question.

---

## Form 1: EngPro learner sign-up / التسجيل كمتعلم في EngPro

**Description:** EngPro is free. Volunteer teachers help students improve their English. Please read the code of conduct on our website before signing up. / مبادرة EngPro مجانية. يساعد معلمون متطوعون الطلاب على تحسين لغتهم الإنجليزية. يرجى قراءة قواعد السلوك على موقعنا قبل التسجيل.

| # | Question (EN / AR) | Type | Options |
|---|---|---|---|
| 1 | Full name * / الاسم الكامل * | Short answer | |
| 2 | Country you live in * / بلد الإقامة * | Short answer | |
| 3 | Time zone * / المنطقة الزمنية * | Dropdown | GMT+0 … GMT+4 (add the ones you need) |
| 4 | I am 18 or older * / عمري 18 عامًا أو أكثر * | Checkbox | Yes / نعم |
| 5 | How would you rate your English? * / كيف تقيّم مستواك في الإنجليزية؟ * | Multiple choice | Beginner (A1–A2) / مبتدئ · Intermediate (B1–B2) / متوسط · Advanced (C1–C2) / متقدم · I don't know / لا أعرف |
| 6 | What do you want to improve? * / ما الذي تريد تحسينه؟ * | Checkboxes | Speaking / المحادثة · Listening / الاستماع · Reading / القراءة · Writing / الكتابة · Exam preparation (IELTS, TOEFL) / التحضير للاختبارات |
| 7 | Why are you learning English? / لماذا تتعلم الإنجليزية؟ | Multiple choice | To study in Italy / للدراسة في إيطاليا · For work / للعمل · Other / أخرى |
| 8 | When are you usually free? * / متى تكون متاحًا عادةً؟ * | Checkboxes | Weekday mornings / صباح أيام الأسبوع · Weekday evenings / مساء أيام الأسبوع · Weekends / عطلة نهاية الأسبوع |
| 9 | I agree to the EngPro code of conduct * / أوافق على قواعد السلوك في EngPro * | Checkbox | Yes / نعم |
| 10 | I agree that the Corso Italy team may contact me about EngPro sessions * / أوافق على أن يتواصل معي فريق Corso Italy بخصوص جلسات EngPro * | Checkbox | Yes / نعم |

## Form 2: EngPro volunteer teacher sign-up / التسجيل كمعلم متطوع في EngPro

**Description:** Thank you for volunteering. EngPro is unpaid and free for learners. We review every volunteer before their first session. / شكرًا لتطوعك. التدريس في EngPro دون أجر ومجاني للمتعلمين. نراجع كل متطوع قبل جلسته الأولى.

| # | Question (EN / AR) | Type | Options |
|---|---|---|---|
| 1 | Full name * / الاسم الكامل * | Short answer | |
| 2 | Country you live in * / بلد الإقامة * | Short answer | |
| 3 | Time zone * / المنطقة الزمنية * | Dropdown | |
| 4 | Your English level * / مستواك في الإنجليزية * | Multiple choice | Native / لغة أم · C2 · C1 |
| 5 | Teaching experience * / الخبرة في التدريس * | Multiple choice | None / لا توجد · Informal (tutoring friends) / غير رسمية · Formal (school, course, certificate) / رسمية |
| 6 | Teaching certificate, if any / شهادة تدريس إن وجدت | Short answer | e.g. CELTA, TEFL |
| 7 | Which levels would you like to teach? * / ما المستويات التي تود تدريسها؟ * | Checkboxes | Beginner / مبتدئ · Intermediate / متوسط · Advanced / متقدم |
| 8 | What can you help with? * / بماذا يمكنك المساعدة؟ * | Checkboxes | Conversation / المحادثة · Grammar / القواعد · Writing / الكتابة · Exam preparation / التحضير للاختبارات |
| 9 | Hours per month you can give * / عدد الساعات التي يمكنك تقديمها شهريًا * | Multiple choice | 1–2 · 3–5 · More than 5 / أكثر من 5 |
| 10 | When are you usually free? * / متى تكون متاحًا عادةً؟ * | Checkboxes | Weekday mornings · Weekday evenings · Weekends |
| 11 | Do you speak Arabic? / هل تتحدث العربية؟ | Multiple choice | Yes / نعم · A little / قليلًا · No / لا |
| 12 | A link to your LinkedIn or a short introduction about yourself * / رابط LinkedIn أو تعريف قصير بنفسك * | Paragraph | |
| 13 | I agree to the EngPro code of conduct and safeguarding rules * / أوافق على قواعد السلوك والحماية في EngPro * | Checkbox | Yes / نعم |

## Form 3: Submit an opportunity / أضف فرصة

**Description:** Tell us about a workshop, teaching session or other opportunity for students. We publish it after a short review. / أخبرنا عن ورشة عمل أو جلسة تعليمية أو فرصة أخرى للطلاب. سننشرها بعد مراجعة قصيرة.

| # | Question (EN / AR) | Type | Options |
|---|---|---|---|
| 1 | Your name and organisation * / اسمك والجهة التي تمثلها * | Short answer | |
| 2 | Title of the opportunity * / عنوان الفرصة * | Short answer | |
| 3 | Type * / النوع * | Multiple choice | Workshop / ورشة عمل · Teaching session / جلسة تعليمية · Scholarship call / إعلان منحة · Other / أخرى |
| 4 | Online or in person? * / عبر الإنترنت أم حضوري؟ * | Multiple choice | Online / عبر الإنترنت · In person / حضوري |
| 5 | City (if in person) / المدينة (إذا كانت حضورية) | Short answer | |
| 6 | Date and start time * / التاريخ ووقت البدء * | Date (include time) | |
| 7 | Time zone of that time * / المنطقة الزمنية لهذا الوقت * | Short answer | e.g. Italy (CET) |
| 8 | Registration deadline / آخر موعد للتسجيل | Date | |
| 9 | Short description * / وصف قصير * | Paragraph | |
| 10 | Link for details or registration * / رابط التفاصيل أو التسجيل * | Short answer (validation: URL) | |
| 11 | Is it free for students? * / هل هي مجانية للطلاب؟ * | Multiple choice | Yes / نعم · No / لا |

### Publishing a submitted opportunity
After you approve a submission, copy `docs/examples/opportunity.yaml` to `src/content/opportunities/<short-name>.yaml`, fill it in (including the Arabic text), and open a pull request. Or ask Claude: "publish row N from the opportunities sheet" and paste the row.
