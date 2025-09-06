"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const questions = [
  // Indoor (I) vs Outdoor (O) questions
  { id: 1, text: "家でゆっくり過ごすのが一番落ち着く。", axis: "I", category: "インドア vs アウトドア" },
  { id: 2, text: "休日は外に出ないと物足りない。", axis: "O", category: "インドア vs アウトドア" },
  {
    id: 3,
    text: "カフェや自室など決まった場所で趣味を楽しむことが多い。",
    axis: "I",
    category: "インドア vs アウトドア",
  },
  { id: 4, text: "新しい場所やイベントに行くとワクワクする。", axis: "O", category: "インドア vs アウトドア" },
  { id: 5, text: "人混みは苦手だ。", axis: "I", category: "インドア vs アウトドア" },
  { id: 6, text: "自然やアウトドアに出かけるのが好きだ。", axis: "O", category: "インドア vs アウトドア" },
  { id: 7, text: "趣味はだいたい家の中でできるものだ。", axis: "I", category: "インドア vs アウトドア" },
  { id: 8, text: "「旅行に行こう」と急に誘われてもワクワクする。", axis: "O", category: "インドア vs アウトドア" },
  { id: 9, text: "体を動かすより静かに過ごすのが好きだ。", axis: "I", category: "インドア vs アウトドア" },

  // Creative (C) vs Consumer (X) questions
  { id: 10, text: "自分で作品を作るのが好きだ。", axis: "C", category: "創作 vs 消費" },
  { id: 11, text: "音楽や映画を観るほうが、作るより楽しい。", axis: "X", category: "創作 vs 消費" },
  { id: 12, text: "アイデアを形にするのに喜びを感じる。", axis: "C", category: "創作 vs 消費" },
  { id: 13, text: "お金を使って好きなものを楽しむことに満足する。", axis: "X", category: "創作 vs 消費" },
  { id: 14, text: "日記や絵など、自分の表現を残すことが多い。", axis: "C", category: "創作 vs 消費" },
  { id: 15, text: "話題の映画や本をチェックするのが習慣だ。", axis: "X", category: "創作 vs 消費" },
  { id: 16, text: "ゼロから作り上げる作業が得意だ。", axis: "C", category: "創作 vs 消費" },
  { id: 17, text: "「最新の流行に触れること」が楽しみだ。", axis: "X", category: "創作 vs 消費" },
  { id: 18, text: "作るより観たり聴いたりする方が性に合っている。", axis: "X", category: "創作 vs 消費" },

  // Personal (P) vs Social (R) questions
  { id: 19, text: "1人で趣味に没頭するのが好きだ。", axis: "P", category: "個人 vs 交流" },
  { id: 20, text: "仲間と一緒に楽しむとより楽しい。", axis: "R", category: "個人 vs 交流" },
  { id: 21, text: "他人に干渉されずに自由に楽しみたい。", axis: "P", category: "個人 vs 交流" },
  { id: 22, text: "イベントやオフ会などに積極的に参加したい。", axis: "R", category: "個人 vs 交流" },
  { id: 23, text: "趣味の話をあまり人に話さない。", axis: "P", category: "個人 vs 交流" },
  { id: 24, text: "趣味の話を共有することでつながりを感じる。", axis: "R", category: "個人 vs 交流" },
  { id: 25, text: "趣味の時間は「自分だけの世界」でありたい。", axis: "P", category: "個人 vs 交流" },
  { id: 26, text: "SNSで趣味に関する投稿をよくする。", axis: "R", category: "個人 vs 交流" },
  { id: 27, text: "グループで遊ぶより一人遊びが得意だ。", axis: "P", category: "個人 vs 交流" },

  // Planned (J) vs Spontaneous (F) questions
  { id: 28, text: "趣味に関しても計画を立てる方が好きだ。", axis: "J", category: "計画 vs 気分" },
  { id: 29, text: "予定を立てず、その時の気分で決めたい。", axis: "F", category: "計画 vs 気分" },
  { id: 30, text: "貯金してから大きな趣味に投資する。", axis: "J", category: "計画 vs 気分" },
  { id: 31, text: "欲しいと思ったらすぐ行動する。", axis: "F", category: "計画 vs 気分" },
  { id: 32, text: "趣味の道具は整理してきちんと管理している。", axis: "J", category: "計画 vs 気分" },
  { id: 33, text: "気分次第で趣味がコロコロ変わる。", axis: "F", category: "計画 vs 気分" },
  { id: 34, text: "スケジュール帳を使って趣味の時間を確保する。", axis: "J", category: "計画 vs 気分" },
  { id: 35, text: "衝動的に「今やりたい！」と始めてしまう。", axis: "F", category: "計画 vs 気分" },
  { id: 36, text: "計画通りに物事が進むと満足する。", axis: "J", category: "計画 vs 気分" },
]

const personalityTypes = {
  "I-C-P-J": { name: "職人クリエイター", description: "静かに自分の世界で作品を作るのが至福。研究肌・完璧主義。" },
  "I-C-P-F": { name: "気まぐれアーティスト", description: "ひらめきで自由に作る。ムラがあるが独創性抜群。" },
  "I-X-P-J": { name: "知識コレクター", description: "本・映画・ゲームなどを体系的に集めて分析するのが好き。" },
  "I-X-P-F": { name: "癒しインドア派", description: "気分で漫画や動画を楽しむ。マイペースで穏やか。" },
  "O-C-R-J": { name: "冒険クリエイター", description: "旅行・イベントで体験し、それを形に残す。行動力と企画力あり。" },
  "O-C-R-F": { name: "自由奔放な表現者", description: "イベントや人と絡みながら表現活動。パフォーマー気質。" },
  "O-X-R-J": {
    name: "アクティブプランナー",
    description: "旅行・スポーツ・イベントを計画して人と楽しむ。リーダータイプ。",
  },
  "O-X-R-F": { name: "パリピ冒険家", description: "ノリで動くエネルギッシュな社交派。流行や刺激を常に追う。" },
  "I-C-R": { name: "創作シェア派", description: "一人で作ったものを人と共有する。クリエイター×交流型。" },
  "O-X-P": {
    name: "気分屋アクティブ派",
    description: "外に出て好きなことを気まぐれに楽しむ。幅広く趣味を持ちやすい。",
  },
}

export default function DiagnosisPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResult, setShowResult] = useState(false)
  const router = useRouter()

  const handleSliderChange = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const calculateResult = () => {
    console.log("[v0] Calculate result button clicked")
    const scores = { I: 0, O: 0, C: 0, X: 0, P: 0, R: 0, J: 0, F: 0 }

    questions.forEach((question) => {
      const answer = answers[question.id] || 3
      scores[question.axis as keyof typeof scores] += answer
    })

    const result = [
      scores.I > scores.O ? "I" : "O",
      scores.C > scores.X ? "C" : "X",
      scores.P > scores.R ? "P" : "R",
      scores.J > scores.F ? "J" : "F",
    ].join("-")

    let finalResult = result
    if (result === "I-C-R-J" || result === "I-C-R-F") {
      finalResult = "I-C-R"
    } else if (result === "O-X-P-J" || result === "O-X-P-F") {
      finalResult = "O-X-P"
    }

    console.log("[v0] Navigating to results with type:", finalResult)
    router.push(`/diagnosis/results?type=${finalResult}`)
  }

  const getResultType = () => {
    const scores = { I: 0, O: 0, C: 0, X: 0, P: 0, R: 0, J: 0, F: 0 }

    questions.forEach((question) => {
      const answer = answers[question.id] || 3
      scores[question.axis as keyof typeof scores] += answer
    })

    const result = [
      scores.I > scores.O ? "I" : "O",
      scores.C > scores.X ? "C" : "X",
      scores.P > scores.R ? "P" : "R",
      scores.J > scores.F ? "J" : "F",
    ].join("-")

    let finalResult = result
    if (result === "I-C-R-J" || result === "I-C-R-F") {
      finalResult = "I-C-R"
    } else if (result === "O-X-P-J" || result === "O-X-P-F") {
      finalResult = "O-X-P"
    }

    return personalityTypes[finalResult as keyof typeof personalityTypes] || personalityTypes["I-X-P-F"]
  }

  const getQuestionOptions = (axis: string) => {
    return { left: "当てはまらない", right: "当てはまる" }
  }

  if (showResult) {
    const resultType = getResultType()
    return (
      <div className="min-h-screen bg-[#fdfbf4]">
        <div className="w-full bg-[#fdfbf4] flex flex-col">
          {/* Header */}
          <header className="relative w-full h-[120px] lg:h-[150px] xl:h-[180px] overflow-hidden">
            <h1
              className="absolute top-5 left-10 lg:left-16 xl:left-24 font-bold text-4xl lg:text-5xl xl:text-6xl text-[#236483] z-10"
              style={{
                fontFamily: "Fredoka One, cursive",
                textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              ChoMee
            </h1>
            <svg
              className="absolute bottom-0 left-0 w-full h-[120px] lg:h-[150px] xl:h-[180px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 200"
              preserveAspectRatio="none"
            >
              <path
                fill="#F49342"
                fillOpacity="0.53"
                d="M0,100 C240,200 480,0 720,100 C960,200 1200,0 1440,100 L1440,0 L0,0 Z"
              ></path>
            </svg>
          </header>

          {/* Result Content */}
          <div className="px-6 lg:px-12 xl:px-20 py-8 lg:py-12 xl:py-16 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-blue-600 mb-4 lg:mb-8 xl:mb-12">診断結果</h2>
            <div className="bg-white rounded-2xl p-6 lg:p-10 xl:p-16 shadow-lg mb-6 lg:mb-10 xl:mb-16">
              <h3 className="text-xl lg:text-3xl xl:text-4xl font-bold text-gray-800 mb-3 lg:mb-6 xl:mb-8">
                {resultType.name}
              </h3>
              <p className="text-gray-600 lg:text-lg xl:text-xl leading-relaxed">{resultType.description}</p>
            </div>

            <Link href="/">
              <button className="w-full max-w-md py-4 lg:py-6 xl:py-8 px-6 lg:px-10 xl:px-16 bg-blue-600 text-white rounded-2xl font-medium text-lg lg:text-xl xl:text-2xl shadow-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer border-none outline-none focus:ring-4 focus:ring-blue-300 relative z-20 mb-8">
                ホームに戻る
              </button>
            </Link>
          </div>

          {/* Bottom Navigation */}
          <footer className="fixed bottom-0 left-0 w-full h-[160px] lg:h-[200px] xl:h-[250px] overflow-hidden">
            <svg
              className="absolute top-0 left-0 w-full h-[160px] lg:h-[200px] xl:h-[250px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 200"
              preserveAspectRatio="none"
            >
              <path
                fill="#1C668B"
                fillOpacity="0.53"
                d="M0,100 C240,0 480,200 720,100 C960,0 1200,200 1440,100 L1440,200 L0,200 Z"
              ></path>
            </svg>

            <div className="absolute bottom-5 lg:bottom-8 w-full flex justify-around items-center px-8 lg:px-16">
              {/* Search Icon */}
              <Link href="/search">
                <button className="transition-transform duration-200 hover:scale-125 focus:scale-125 outline-none">
                  <svg
                    className="w-9 h-9 lg:w-12 lg:h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </Link>

              {/* Profile + Arrow Icon */}
              <Link href="/community">
                <button className="transition-transform duration-200 hover:scale-125 focus:scale-125 outline-none">
                  <div className="w-10 h-10 lg:w-14 lg:h-14">
                    <svg
                      viewBox="0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full transform scale-140 mt-2"
                    >
                      <circle cx="32" cy="16" r="11" fill="none" stroke="white" strokeWidth="6" />
                      <path
                        d="M25 25 Q20 40 21 48 M41 25 Q46 40 45 48"
                        fill="none"
                        stroke="white"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                      <line x1="4" y1="28" x2="15" y2="28" stroke="white" strokeWidth="4" strokeLinecap="round" />
                      <polyline
                        points="9,23 4,28 9,33"
                        fill="none"
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
              </Link>

              {/* Profile Icon */}
              <Link href="/profile">
                <button className="transition-transform duration-200 hover:scale-125 focus:scale-125 outline-none">
                  <svg className="w-8 h-8 lg:w-11 lg:h-11 text-white mt-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </footer>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fdfbf4]">
      <div className="w-full bg-[#fdfbf4] flex flex-col">
        {/* Header */}
        <header className="relative w-full h-[120px] lg:h-[150px] xl:h-[180px] overflow-hidden">
          <h1
            className="absolute top-5 left-10 lg:left-16 xl:left-24 font-bold text-4xl lg:text-5xl xl:text-6xl text-[#236483] z-10"
            style={{
              fontFamily: "Fredoka One, cursive",
              textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            ChoMee
          </h1>
          <svg
            className="absolute bottom-0 left-0 w-full h-[120px] lg:h-[150px] xl:h-[180px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 200"
            preserveAspectRatio="none"
          >
            <path
              fill="#F49342"
              fillOpacity="0.53"
              d="M0,100 C240,200 480,0 720,100 C960,200 1200,0 1440,100 L1440,0 L0,0 Z"
            ></path>
          </svg>
        </header>

        {/* Content */}
        <div className="px-6 lg:px-12 xl:px-20 py-8 lg:py-12 xl:py-16 flex-1 pb-56 lg:pb-64 xl:pb-80">
          <div className="text-center mb-8 lg:mb-12 xl:mb-16 max-w-4xl mx-auto">
            <h2 className="text-xl lg:text-3xl xl:text-4xl font-bold text-blue-600 mb-2 lg:mb-4 xl:mb-6">趣味診断</h2>
            <p className="text-gray-600 text-sm lg:text-base xl:text-lg">あなたの特徴に近い方を教えてください</p>
          </div>

          <div className="space-y-6 lg:space-y-10 xl:space-y-12 mb-8 lg:mb-12 xl:mb-16 max-w-6xl mx-auto">
            {questions.map((question, index) => {
              const currentAnswer = answers[question.id] || 3
              const options = getQuestionOptions(question.axis)

              return (
                <div key={question.id} className="p-6 lg:p-10 xl:p-12">
                  <div className="text-center mb-6 lg:mb-10 xl:mb-12">
                    <h3 className="text-lg lg:text-2xl xl:text-3xl font-medium mb-2 lg:mb-4 xl:mb-6 text-blue-600">
                      質問 {index + 1}
                    </h3>
                    <p className="text-gray-800 lg:text-lg xl:text-xl leading-relaxed max-w-3xl mx-auto">
                      {question.text}
                    </p>
                  </div>

                  {/* Question Slider */}
                  <div className="relative max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-4 lg:mb-6 xl:mb-8">
                      <div className="w-24 lg:w-32 xl:w-40 h-16 lg:h-20 xl:h-24 bg-orange-300 rounded-xl flex items-center justify-center px-2 lg:px-4 xl:px-6">
                        <span className="text-xs lg:text-sm xl:text-base text-center text-gray-800 font-medium">
                          {options.left}
                        </span>
                      </div>

                      <div className="flex-1 mx-4 lg:mx-8 xl:mx-12 relative">
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0.5 h-6 xl:h-8 bg-blue-600"></div>
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0.5 h-6 xl:h-8 bg-blue-600"></div>

                        <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-1">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-0.5 h-3 xl:h-4 bg-blue-500"></div>
                          ))}
                        </div>

                        <div className="h-2 xl:h-3 bg-blue-400 rounded-full"></div>

                        <div
                          className="absolute top-1/2 transform -translate-y-1/2 w-8 lg:w-10 xl:w-12 h-8 lg:h-10 xl:h-12 cursor-pointer transition-all duration-200 hover:scale-110"
                          style={{
                            left: `${((currentAnswer - 1) / 4) * 100}%`,
                            transform: "translateX(-50%) translateY(-50%)",
                          }}
                        >
                          <svg
                            className="w-8 lg:w-10 xl:w-12 h-8 lg:h-10 xl:h-12 text-orange-500 drop-shadow-lg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </div>

                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={currentAnswer}
                          onChange={(e) => handleSliderChange(question.id, Number.parseInt(e.target.value))}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>

                      <div className="w-24 lg:w-32 xl:w-40 h-16 lg:h-20 xl:h-24 bg-orange-300 rounded-xl flex items-center justify-center px-2 lg:px-4 xl:px-6">
                        <span className="text-xs lg:text-sm xl:text-base text-center text-gray-800 font-medium">
                          {options.right}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="pt-8 lg:pt-12 xl:pt-16 max-w-md mx-auto mb-8 lg:mb-12 xl:mb-16 relative z-20">
              <button
                onClick={calculateResult}
                className="w-full py-4 lg:py-6 xl:py-8 px-6 lg:px-10 xl:px-16 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-2xl font-medium text-lg lg:text-xl xl:text-2xl shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer border-none outline-none focus:ring-4 focus:ring-blue-300 relative z-10"
                type="button"
              >
                診断結果を見る
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <footer className="fixed bottom-0 left-0 w-full h-[160px] lg:h-[200px] xl:h-[250px] overflow-hidden">
          <svg
            className="absolute top-0 left-0 w-full h-[160px] lg:h-[200px] xl:h-[250px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 200"
            preserveAspectRatio="none"
          >
            <path
              fill="#1C668B"
              fillOpacity="0.53"
              d="M0,100 C240,0 480,200 720,100 C960,0 1200,200 1440,100 L1440,200 L0,200 Z"
            ></path>
          </svg>

          <div className="absolute bottom-5 lg:bottom-8 w-full flex justify-around items-center px-8 lg:px-16">
            {/* Search Icon */}
            <Link href="/search">
              <button className="transition-transform duration-200 hover:scale-125 focus:scale-125 outline-none">
                <svg
                  className="w-9 h-9 lg:w-12 lg:h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </Link>

            {/* Profile + Arrow Icon */}
            <Link href="/community">
              <button className="transition-transform duration-200 hover:scale-125 focus:scale-125 outline-none">
                <div className="w-10 h-10 lg:w-14 lg:h-14">
                  <svg
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full transform scale-140 mt-2"
                  >
                    <circle cx="32" cy="16" r="11" fill="none" stroke="white" strokeWidth="6" />
                    <path
                      d="M25 25 Q20 40 21 48 M41 25 Q46 40 45 48"
                      fill="none"
                      stroke="white"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <line x1="4" y1="28" x2="15" y2="28" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    <polyline
                      points="9,23 4,28 9,33"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </Link>

            {/* Profile Icon */}
            <Link href="/profile">
              <button className="transition-transform duration-200 hover:scale-125 focus:scale-125 outline-none">
                <svg className="w-8 h-8 lg:w-11 lg:h-11 text-white mt-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
