"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

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

const hobbyRecommendationsByType = {
  "I-C-P-J": [
    {
      title: "プラモデル・レゴ",
      description: "細かい作業に集中して完璧な作品を作り上げる喜びを味わえます。",
      image: "/plastic-model-kit.jpg",
    },
    {
      title: "プログラミング",
      description: "論理的思考で問題を解決し、自分だけのシステムを構築できます。",
      image: "/programming-code-abstract.png",
    },
    {
      title: "編み物・手芸",
      description: "手作業で美しい作品を丁寧に仕上げる達成感が得られます。",
      image: "/knitting-yarn-and-needles.jpg",
    },
    {
      title: "写経・カリグラフィー",
      description: "集中力を高めながら美しい文字を書く瞑想的な時間を過ごせます。",
      image: "/calligraphy-brush.jpg",
    },
    {
      title: "写真編集",
      description: "撮影した写真を理想の形に仕上げる創作活動が楽しめます。",
      image: "/photo-editing-software.jpg",
    },
  ],
  "I-C-P-F": [
    {
      title: "イラスト・漫画",
      description: "自由な発想で独創的な作品を生み出すことができます。",
      image: "/drawing-illustration.jpg",
    },
    {
      title: "作詞作曲",
      description: "感情を音楽に込めて表現する創作活動が楽しめます。",
      image: "/music-composition.png",
    },
    {
      title: "ブログ・エッセイ",
      description: "思いや体験を文章で自由に表現できます。",
      image: "/writing-blog.jpg",
    },
    {
      title: "ハンドメイドアクセサリー",
      description: "オリジナルのアクセサリーを自由にデザインして作れます。",
      image: "/handmade-jewelry-display.png",
    },
    {
      title: "即興演奏",
      description: "その場の感情に任せて自由に音楽を奏でることができます。",
      image: "/piano-improvisation.jpg",
    },
  ],
  "I-X-P-J": [
    {
      title: "読書",
      description: "専門書や全集を体系的に読み進めて知識を深められます。",
      image: "/books-library.jpg",
    },
    {
      title: "映画鑑賞・レビュー",
      description: "作品を分析的に鑑賞し、レビューで考察を深められます。",
      image: "/movie-cinema.jpg",
    },
    {
      title: "歴史や地図の研究",
      description: "過去の出来事や地理を詳しく調べて理解を深められます。",
      image: "/historical-map.jpg",
    },
    {
      title: "図鑑や切手の収集",
      description: "テーマに沿って体系的にコレクションを整理できます。",
      image: "/stamp-collection.png",
    },
    {
      title: "将棋・囲碁",
      description: "戦略的思考を鍛えながら奥深いゲームを楽しめます。",
      image: "/shogi-board.jpg",
    },
  ],
  "I-X-P-F": [
    {
      title: "漫画・アニメ鑑賞",
      description: "気分に合わせて様々な作品を楽しめます。",
      image: "/manga-anime.jpg",
    },
    {
      title: "カフェ巡り",
      description: "落ち着いた空間でゆったりとした時間を過ごせます。",
      image: "/cozy-cafe.png",
    },
    {
      title: "ゲーム",
      description: "RPGやシミュレーションで自分のペースで冒険できます。",
      image: "/video-game-controller.jpg",
    },
    {
      title: "動画視聴",
      description: "YouTube・Netflixで好きなコンテンツを自由に楽しめます。",
      image: "/streaming-video.jpg",
    },
    {
      title: "ぬり絵",
      description: "リラックスしながら色彩豊かな作品を完成させられます。",
      image: "/coloring-book.png",
    },
  ],
  "O-C-R-J": [
    {
      title: "Vlog制作",
      description: "旅行や体験を映像で記録し、編集して共有できます。",
      image: "/video-camera-vlog.jpg",
    },
    {
      title: "旅行写真・動画編集",
      description: "旅の思い出を美しい作品として残すことができます。",
      image: "/travel-photography.png",
    },
    {
      title: "アウトドアイベント企画",
      description: "自然の中でのイベントを企画し、実行する達成感が得られます。",
      image: "/forest-camping-tent.png",
    },
    {
      title: "料理研究",
      description: "新しいレシピを開発し、美味しい料理を創作できます。",
      image: "/cooking-recipe.png",
    },
    {
      title: "DIY家具",
      description: "自分好みの家具を設計し、手作りで完成させられます。",
      image: "/diy-furniture.jpg",
    },
  ],
  "O-C-R-F": [
    {
      title: "ダンス・演劇",
      description: "身体表現で感情を自由に表現し、観客と共感できます。",
      image: "/vibrant-dance-performance.png",
    },
    {
      title: "コスプレ",
      description: "好きなキャラクターになりきって表現活動を楽しめます。",
      image: "/cosplay-costume.jpg",
    },
    {
      title: "バンド活動",
      description: "仲間と音楽を作り上げ、ライブで観客と盛り上がれます。",
      image: "/band-music.jpg",
    },
    {
      title: "路上パフォーマンス",
      description: "街中で自由に表現し、通りがかりの人々を楽しませられます。",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      title: "フラッシュモブ",
      description: "サプライズ演出で多くの人を驚かせ、喜ばせることができます。",
      image: "/placeholder.svg?height=80&width=80",
    },
  ],
  "O-X-R-J": [
    {
      title: "スポーツ",
      description: "サッカー・バスケなどで仲間と汗を流し、チームワークを育めます。",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      title: "キャンプ企画",
      description: "自然の中でのキャンプを企画し、参加者全員で楽しめます。",
      image: "/forest-camping-tent.png",
    },
    {
      title: "ボードゲーム会",
      description: "友人とゲームを通じて戦略的思考と交流を楽しめます。",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      title: "マラソンや大会出場",
      description: "目標に向けて訓練し、大会で達成感を味わえます。",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      title: "イベント主催",
      description: "人々が楽しめるイベントを企画し、成功させる喜びが得られます。",
      image: "/placeholder.svg?height=80&width=80",
    },
  ],
  "O-X-R-F": [
    {
      title: "フェス参加",
      description: "音楽フェスで仲間と盛り上がり、最高の時間を過ごせます。",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      title: "クラブ・DJ",
      description: "音楽で会場を盛り上げ、みんなと一体感を味わえます。",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      title: "旅行",
      description: "弾丸ツアーで新しい場所を冒険できます。",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      title: "サーフィン",
      description: "波と一体になって自然のエネルギーを感じられます。",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      title: "最新アクティビティ体験",
      description: "VR施設など最新技術を使った刺激的な体験ができます。",
      image: "/placeholder.svg?height=80&width=80",
    },
  ],
  "I-C-R": [
    {
      title: "同人活動",
      description: "自分の作品を同じ趣味の人たちと共有し、交流できます。",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      title: "SNSで作品公開",
      description: "創作した作品をSNSで発信し、多くの人に見てもらえます。",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      title: "YouTube制作",
      description: "動画コンテンツを作成し、視聴者と交流できます。",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      title: "写真展や作品展示",
      description: "自分の作品を展示し、来場者と直接交流できます。",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      title: "ポッドキャスト",
      description: "音声コンテンツで自分の考えを発信し、リスナーと繋がれます。",
      image: "/placeholder.svg?height=80&width=80",
    },
  ],
  "O-X-P": [
    {
      title: "ソロ旅行",
      description: "自分のペースで新しい場所を探索し、自由な時間を過ごせます。",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      title: "サイクリング",
      description: "風を感じながら様々な場所を自転車で巡ることができます。",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      title: "グルメ食べ歩き",
      description: "美味しい料理を求めて様々なお店を巡る楽しみがあります。",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      title: "カラオケ",
      description: "好きな歌を自由に歌って気分転換できます。",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      title: "スポーツ観戦",
      description: "好きなチームを応援し、試合の興奮を味わえます。",
      image: "/placeholder.svg?height=80&width=80",
    },
  ],
}

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const personalityTypeKey = searchParams.get("type") || "I-X-P-F"

  const personalityType =
    personalityTypes[personalityTypeKey as keyof typeof personalityTypes] || personalityTypes["I-X-P-F"]

  const hobbies =
    hobbyRecommendationsByType[personalityTypeKey as keyof typeof hobbyRecommendationsByType] ||
    hobbyRecommendationsByType["I-X-P-F"]

  return (
    <div className="min-h-screen bg-[#fdfbf4]">
      <div className="w-full bg-[#fdfbf4] flex flex-col">
        {/* Header with curved orange wave */}
        <header className="relative w-full h-[200px] lg:h-[250px] xl:h-[300px] overflow-hidden">
          <h1
            className="absolute top-5 left-10 lg:top-8 lg:left-16 xl:top-12 xl:left-24 font-bold text-4xl lg:text-6xl xl:text-8xl text-[#236483] z-10"
            style={{
              fontFamily: "Fredoka One, cursive",
              textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            ChoMee
          </h1>
          <svg
            className="absolute bottom-0 left-0 w-full h-[200px] lg:h-[250px] xl:h-[300px]"
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
        <div className="px-6 lg:px-12 xl:px-20 py-8 lg:py-12 xl:py-16 pb-56 lg:pb-64 xl:pb-80 flex-1">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#236483] mb-3 sm:mb-4 md:mb-6">
              あなたの趣味タイプ
            </h2>
            <div className="bg-orange-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 border-2 border-orange-300 max-w-4xl mx-auto">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-orange-600 mb-2 sm:mb-3 md:mb-4">
                {personalityType.name}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                {personalityType.description}
              </p>
            </div>
          </div>

          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#236483] mb-2">
              あなたにおすすめの趣味
            </h2>
          </div>

          {/* Hobby Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
            {hobbies.map((hobby, index) => (
              <div key={index} className="bg-blue-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 bg-white rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={hobby.image || "/placeholder.svg"}
                      alt={hobby.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
                      {hobby.title}
                    </h3>
                    <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-3 sm:mb-4">
                      {hobby.description}
                    </p>
                    <Link href={`/hobby-rooms?hobby=${encodeURIComponent(hobby.title)}&type=${personalityTypeKey}`}>
                      <div className="flex items-center justify-center space-x-2 cursor-pointer hover:scale-105 transition-transform duration-200">
                        <span className="text-white text-xs sm:text-sm md:text-base">コミュニティに参加</span>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-orange-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Back Button */}
          <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 max-w-md mx-auto mb-8 relative z-20">
            <Link href="/">
              <button className="w-full py-3 sm:py-4 md:py-5 lg:py-6 xl:py-8 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 bg-blue-600 text-white rounded-2xl sm:rounded-3xl font-medium text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl shadow-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer border-none outline-none focus:ring-4 focus:ring-blue-300">
                ホームに戻る
              </button>
            </Link>
          </div>
        </div>

        {/* Footer with curved blue wave and navigation */}
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
