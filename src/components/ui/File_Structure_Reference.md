# Exact File Structure — Backend + Frontend
## Ye naam bilkul waise hi rakhna, taake sab code examples match karein

---

## BACKEND (Dost banayega)

```
backend/
├── config/
│   ├── settings.py
│   ├── urls.py                    # sab apps ke urls include honge
│   └── wsgi.py
│
├── core/
│   └── response.py                # success_response(), error_response() wrapper
│
├── users/
│   ├── models.py                  # User model
│   ├── serializers.py             # SignupSerializer, LoginSerializer
│   ├── views.py                   # SignupView, LoginView, MeView
│   └── urls.py                    # /auth/signup/, /auth/login/, /auth/me/
│
├── bp/
│   ├── models.py                  # BPLog model
│   ├── serializers.py
│   ├── views.py                   # BPLogView, BPHistoryView
│   ├── utils.py                   # calculate_bp_status()
│   └── urls.py
│
├── symptoms/
│   ├── models.py                  # Symptom model
│   ├── serializers.py
│   ├── views.py                   # SymptomListView, RiskCheckView
│   ├── fixtures/
│   │   └── symptoms_seed.json     # 20+ symptoms starting data
│   └── urls.py
│
├── reports/
│   ├── models.py                  # Report model (file, status, extracted_json)
│   ├── serializers.py
│   ├── views.py                   # ReportUploadView, ReportDetailView
│   └── urls.py
│
├── dashboard/
│   ├── views.py                   # SummaryView, BPTrendView
│   └── urls.py
│
└── ml-service/                    # FastAPI, alag project hai
    ├── main.py                    # /predict/symptoms, /ocr/extract
    ├── risk_engine.py             # disease-symptom weighted scoring
    └── ocr_engine.py              # pytesseract wrapper
```

---

## FRONTEND (Aap banayenge)

```
frontend/
├── src/
│   ├── api/
│   │   ├── axiosClient.js         # base config + JWT interceptor
│   │   ├── auth.js                # signup(), login(), getMe()
│   │   ├── bp.js                  # logBP(), getBPHistory()
│   │   ├── symptoms.js            # getSymptoms(), checkRisk()
│   │   ├── reports.js             # uploadReport(), getReportById()
│   │   ├── dashboard.js           # getSummary(), getBPTrend()
│   │   └── mocks/
│   │       ├── auth.mock.js
│   │       ├── bp.mock.js
│   │       ├── symptoms.mock.js
│   │       ├── reports.mock.js
│   │       └── dashboard.mock.js
│   │
│   ├── components/
│   │   ├── VoiceAssistant/
│   │   │   ├── VoiceGreeting.jsx  # TTS greeting on login
│   │   │   └── VoiceInput.jsx     # STT (optional)
│   │   ├── charts/
│   │   │   ├── BPTrendChart.jsx
│   │   │   └── RiskScoreChart.jsx
│   │   └── ui/
│   │       ├── GlassCard.jsx      # theme ka reusable card
│   │       ├── Button.jsx
│   │       ├── Sidebar.jsx
│   │       ├── Navbar.jsx
│   │       └── DisclaimerBanner.jsx
│   │
│   ├── theme/
│   │   ├── tokens.css             # colors, gradients (theme images se)
│   │   └── globals.css
│   │
│   ├── pages/
│   │   ├── Login/
│   │   │   └── LoginPage.jsx
│   │   ├── Signup/
│   │   │   └── SignupPage.jsx
│   │   ├── Dashboard/
│   │   │   └── DashboardPage.jsx
│   │   ├── SymptomChecker/
│   │   │   ├── SymptomFormPage.jsx
│   │   │   └── ResultPage.jsx
│   │   ├── BPTracker/
│   │   │   └── BPTrackerPage.jsx
│   │   └── ReportUpload/
│   │       └── ReportUploadPage.jsx
│   │
│   ├── App.jsx                    # routes yahan define
│   └── main.jsx
```

---

## Zaroori Rule

Ye naam exactly isi tarah rakhna — `axiosClient.js`, `bp.js`, `SignupView`, waghera. `Kickoff_Guide` aur `API_CONTRACT.md` mein code examples inhi filenames se likhe hain. Agar naam alag rakhoge to copy-paste examples match nahi karenge aur confusion hogi.
