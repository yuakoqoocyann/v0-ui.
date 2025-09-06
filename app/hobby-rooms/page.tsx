"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

const mockTalkRooms = {
  プラモデル・レゴ: [
    { id: 1, name: "初心者向けプラモ相談室", members: 45, lastMessage: "HGガンダムの塗装について", isActive: true },
    { id: 2, name: "レゴ MOC 作品共有", members: 32, lastMessage: "新作の城を作りました！", isActive: true },
    { id: 3, name: "塗装テクニック研究会", members: 28, lastMessage: "ウェザリングのコツ教えて", isActive: false },
  ],
  プログラミング: [
    { id: 4, name: "初心者プログラミング質問", members: 156, lastMessage: "Pythonの基礎について", isActive: true },
    { id: 5, name: "Web開発情報交換", members: 89, lastMessage: "React最新情報", isActive: true },
    { id: 6, name: "アルゴリズム勉強会", members: 67, lastMessage: "今日の問題解けました", isActive: false },
  ],
  書道: [
    { id: 7, name: "書道初心者の集い", members: 34, lastMessage: "筆の持ち方について", isActive: true },
    { id: 8, name: "作品鑑賞会", members: 28, lastMessage: "今日の練習作品です", isActive: true },
    { id: 9, name: "書道具情報交換", members: 19, lastMessage: "おすすめの筆教えて", isActive: false },
  ],
  写真編集: [
    { id: 10, name: "Photoshop初心者", members: 78, lastMessage: "レイヤーの使い方", isActive: true },
    { id: 11, name: "風景写真加工", members: 56, lastMessage: "夕焼けの色調整", isActive: true },
    { id: 12, name: "ポートレート編集", members: 43, lastMessage: "肌の質感について", isActive: false },
  ],
  イラスト: [
    { id: 13, name: "デジタルイラスト", members: 92, lastMessage: "ブラシ設定のコツ", isActive: true },
    { id: 14, name: "キャラクターデザイン", members: 67, lastMessage: "新キャラ描きました", isActive: true },
    { id: 15, name: "背景描画研究", members: 45, lastMessage: "パース練習中", isActive: false },
  ],
  作曲: [
    { id: 16, name: "DTM初心者の会", members: 54, lastMessage: "DAWの選び方", isActive: true },
    { id: 17, name: "楽曲制作交流", members: 38, lastMessage: "新曲できました", isActive: true },
    { id: 18, name: "ミックス・マスタリング", members: 29, lastMessage: "EQの使い方", isActive: false },
  ],
  ブログ執筆: [
    { id: 19, name: "ブログ初心者サポート", members: 67, lastMessage: "記事の書き方", isActive: true },
    { id: 20, name: "SEO対策研究", members: 45, lastMessage: "キーワード選定", isActive: true },
    { id: 21, name: "収益化相談", members: 32, lastMessage: "アフィリエイトについて", isActive: false },
  ],
  アクセサリー作り: [
    { id: 22, name: "ハンドメイドアクセサリー", members: 58, lastMessage: "ビーズの組み合わせ", isActive: true },
    { id: 23, name: "レジン作品交流", members: 41, lastMessage: "新作ピアス完成", isActive: true },
    { id: 24, name: "材料情報交換", members: 35, lastMessage: "おすすめパーツ店", isActive: false },
  ],
  即興演奏: [
    { id: 25, name: "ジャズセッション", members: 43, lastMessage: "コード進行練習", isActive: true },
    { id: 26, name: "ピアノ即興", members: 36, lastMessage: "スケール練習", isActive: true },
    { id: 27, name: "アドリブ研究", members: 28, lastMessage: "フレーズ作り", isActive: false },
  ],
  編み物: [
    { id: 28, name: "編み物初心者の会", members: 78, lastMessage: "マフラーの編み方教えて", isActive: true },
    { id: 29, name: "手編み作品自慢", members: 54, lastMessage: "今日完成したセーター", isActive: true },
    { id: 30, name: "毛糸情報交換", members: 43, lastMessage: "おすすめの毛糸屋さん", isActive: false },
  ],
  キャンプ: [
    { id: 31, name: "キャンプ初心者相談", members: 89, lastMessage: "テントの選び方", isActive: true },
    { id: 32, name: "キャンプ飯レシピ", members: 67, lastMessage: "簡単スキレット料理", isActive: true },
    { id: 33, name: "キャンプ場情報", members: 52, lastMessage: "おすすめスポット", isActive: false },
  ],
  盆栽: [
    { id: 34, name: "盆栽入門", members: 34, lastMessage: "水やりの頻度について", isActive: true },
    { id: 35, name: "盆栽手入れ相談", members: 28, lastMessage: "剪定のタイミング", isActive: true },
    { id: 36, name: "盆栽展示会情報", members: 22, lastMessage: "来月の展示会", isActive: false },
  ],
  料理: [
    { id: 37, name: "料理初心者の会", members: 67, lastMessage: "基本的な調味料の使い方", isActive: true },
    { id: 38, name: "レシピ交換", members: 54, lastMessage: "簡単パスタレシピ", isActive: true },
    { id: 39, name: "お菓子作り", members: 43, lastMessage: "クッキーの焼き方", isActive: false },
  ],
  読書: [
    { id: 40, name: "読書感想交流", members: 78, lastMessage: "今月読んだ本について", isActive: true },
    { id: 41, name: "おすすめ本紹介", members: 65, lastMessage: "ミステリー小説のおすすめ", isActive: true },
    { id: 42, name: "読書会", members: 32, lastMessage: "来月の課題図書", isActive: false },
  ],
  ガーデニング: [
    { id: 43, name: "ガーデニング初心者", members: 56, lastMessage: "春の植え替え時期", isActive: true },
    { id: 44, name: "野菜栽培", members: 48, lastMessage: "トマトの育て方", isActive: true },
    { id: 45, name: "花の育て方", members: 39, lastMessage: "バラの手入れ", isActive: false },
  ],
  ヨガ: [
    { id: 46, name: "ヨガ初心者の会", members: 89, lastMessage: "基本ポーズの練習", isActive: true },
    { id: 47, name: "朝ヨガ習慣", members: 67, lastMessage: "朝の5分ヨガ", isActive: true },
    { id: 48, name: "瞑想とヨガ", members: 45, lastMessage: "呼吸法について", isActive: false },
  ],
  散歩: [
    { id: 49, name: "散歩コース情報", members: 72, lastMessage: "おすすめの公園", isActive: true },
    { id: 50, name: "ウォーキング仲間", members: 58, lastMessage: "一緒に歩きませんか", isActive: true },
    { id: 51, name: "写真散歩", members: 41, lastMessage: "街角の風景", isActive: false },
  ],
  映画鑑賞: [
    { id: 52, name: "映画感想交流", members: 94, lastMessage: "最新作の感想", isActive: true },
    { id: 53, name: "おすすめ映画紹介", members: 76, lastMessage: "隠れた名作", isActive: true },
    { id: 54, name: "映画館情報", members: 52, lastMessage: "新しいシネコン", isActive: false },
  ],
  音楽鑑賞: [
    { id: 55, name: "音楽好き交流", members: 83, lastMessage: "最近聴いた曲", isActive: true },
    { id: 56, name: "ジャンル別音楽", members: 69, lastMessage: "ジャズの名盤", isActive: true },
    { id: 57, name: "ライブ情報", members: 47, lastMessage: "来月のコンサート", isActive: false },
  ],
  茶道: [
    { id: 58, name: "茶道入門", members: 38, lastMessage: "お茶の点て方", isActive: true },
    { id: 59, name: "茶道具について", members: 29, lastMessage: "茶碗の選び方", isActive: true },
    { id: 60, name: "茶会情報", members: 24, lastMessage: "来月の茶会", isActive: false },
  ],
  将棋・囲碁: [
    { id: 61, name: "将棋初心者の会", members: 65, lastMessage: "基本的な戦法", isActive: true },
    { id: 62, name: "囲碁入門", members: 52, lastMessage: "石の置き方", isActive: true },
    { id: 63, name: "対局相手募集", members: 43, lastMessage: "一局お願いします", isActive: false },
  ],
  漫画・アニメ鑑賞: [
    { id: 64, name: "アニメ感想交流", members: 127, lastMessage: "今期のおすすめアニメ", isActive: true },
    { id: 65, name: "漫画レビュー", members: 98, lastMessage: "最新刊読みました", isActive: true },
    { id: 66, name: "声優情報", members: 76, lastMessage: "新人声優の話", isActive: false },
  ],
  カフェ巡り: [
    { id: 67, name: "おすすめカフェ情報", members: 89, lastMessage: "新宿の隠れ家カフェ", isActive: true },
    { id: 68, name: "コーヒー豆の話", members: 67, lastMessage: "エチオピア豆の特徴", isActive: true },
    { id: 69, name: "カフェ写真共有", members: 54, lastMessage: "ラテアート撮りました", isActive: false },
  ],
  ゲーム: [
    { id: 70, name: "RPGゲーム好き集合", members: 134, lastMessage: "最新のJRPGについて", isActive: true },
    { id: 71, name: "レトロゲーム愛好会", members: 89, lastMessage: "ファミコン時代の名作", isActive: true },
    { id: 72, name: "オンラインゲーム情報", members: 76, lastMessage: "新作MMOの情報", isActive: false },
  ],
  動画視聴: [
    { id: 73, name: "YouTube おすすめチャンネル", members: 156, lastMessage: "面白い動画見つけました", isActive: true },
    { id: 74, name: "Netflix ドラマ感想", members: 123, lastMessage: "韓国ドラマにハマってます", isActive: true },
    { id: 75, name: "映画レビュー交流", members: 98, lastMessage: "今月の新作映画", isActive: false },
  ],
  ぬり絵: [
    { id: 76, name: "大人のぬり絵", members: 67, lastMessage: "花の塗り方のコツ", isActive: true },
    { id: 77, name: "色鉛筆テクニック", members: 54, lastMessage: "グラデーションの作り方", isActive: true },
    { id: 78, name: "ぬり絵本おすすめ", members: 43, lastMessage: "新刊情報", isActive: false },
  ],
  映画鑑賞・レビュー: [
    { id: 79, name: "映画批評サークル", members: 112, lastMessage: "カンヌ映画祭の話", isActive: true },
    { id: 80, name: "ホラー映画好き", members: 87, lastMessage: "最新ホラー作品", isActive: true },
    { id: 81, name: "アニメ映画研究", members: 65, lastMessage: "スタジオジブリ特集", isActive: false },
  ],
  歴史や地図の研究: [
    { id: 82, name: "日本史研究会", members: 78, lastMessage: "戦国時代について", isActive: true },
    { id: 83, name: "世界地理クイズ", members: 56, lastMessage: "今日の問題", isActive: true },
    { id: 84, name: "古地図コレクター", members: 34, lastMessage: "江戸時代の地図", isActive: false },
  ],
  図鑑や切手の収集: [
    { id: 85, name: "切手コレクター", members: 45, lastMessage: "記念切手の情報", isActive: true },
    { id: 86, name: "昆虫図鑑愛好会", members: 38, lastMessage: "珍しい蝶の写真", isActive: true },
    { id: 87, name: "植物図鑑研究", members: 29, lastMessage: "山野草の分類", isActive: false },
  ],
  Vlog制作: [
    { id: 88, name: "Vlog初心者の会", members: 89, lastMessage: "撮影機材の相談", isActive: true },
    { id: 89, name: "編集テクニック", members: 67, lastMessage: "カット編集のコツ", isActive: true },
    { id: 90, name: "Vlogネタ相談", members: 54, lastMessage: "面白い企画募集", isActive: false },
  ],
  旅行写真・動画編集: [
    { id: 91, name: "旅行写真共有", members: 134, lastMessage: "京都の紅葉写真", isActive: true },
    { id: 92, name: "動画編集技術", members: 98, lastMessage: "タイムラプスの作り方", isActive: true },
    { id: 93, name: "旅行記制作", members: 76, lastMessage: "旅のストーリー作り", isActive: false },
  ],
  アウトドアイベント企画: [
    { id: 94, name: "ハイキング企画", members: 87, lastMessage: "来月の山登り計画", isActive: true },
    { id: 95, name: "BBQ企画サークル", members: 65, lastMessage: "場所の下見完了", isActive: true },
    { id: 96, name: "アウトドア用品情報", members: 54, lastMessage: "おすすめテント", isActive: false },
  ],
  料理研究: [
    { id: 97, name: "創作料理研究", members: 123, lastMessage: "新しいレシピ開発", isActive: true },
    { id: 98, name: "世界の料理", members: 89, lastMessage: "タイ料理に挑戦", isActive: true },
    { id: 99, name: "健康料理レシピ", members: 67, lastMessage: "低糖質メニュー", isActive: false },
  ],
  DIY家具: [
    { id: 100, name: "DIY初心者サポート", members: 78, lastMessage: "工具の選び方", isActive: true },
    { id: 101, name: "木工作品自慢", members: 56, lastMessage: "手作りテーブル完成", isActive: true },
    { id: 102, name: "DIY材料情報", members: 43, lastMessage: "ホームセンター情報", isActive: false },
  ],
  ダンス・演劇: [
    { id: 103, name: "ダンス練習会", members: 98, lastMessage: "新しい振り付け", isActive: true },
    { id: 104, name: "演劇サークル", members: 76, lastMessage: "次回公演の準備", isActive: true },
    { id: 105, name: "舞台鑑賞会", members: 54, lastMessage: "おすすめ舞台", isActive: false },
  ],
  コスプレ: [
    { id: 106, name: "コスプレ制作", members: 112, lastMessage: "衣装の作り方", isActive: true },
    { id: 107, name: "撮影会情報", members: 89, lastMessage: "来月のイベント", isActive: true },
    { id: 108, name: "ウィッグ・メイク", members: 67, lastMessage: "キャラメイクのコツ", isActive: false },
  ],
  バンド活動: [
    { id: 109, name: "バンドメンバー募集", members: 87, lastMessage: "ドラマー探してます", isActive: true },
    { id: 110, name: "楽器練習交流", members: 65, lastMessage: "ギター練習法", isActive: true },
    { id: 111, name: "ライブハウス情報", members: 54, lastMessage: "新しい会場発見", isActive: false },
  ],
  路上パフォーマンス: [
    { id: 112, name: "ストリートパフォーマー", members: 56, lastMessage: "許可申請について", isActive: true },
    { id: 113, name: "パフォーマンス技術", members: 43, lastMessage: "ジャグリング練習", isActive: true },
    { id: 114, name: "活動場所情報", members: 32, lastMessage: "おすすめスポット", isActive: false },
  ],
  フラッシュモブ: [
    { id: 115, name: "フラッシュモブ企画", members: 67, lastMessage: "次回の企画会議", isActive: true },
    { id: 116, name: "ダンス練習", members: 54, lastMessage: "振り付け覚えました", isActive: true },
    { id: 117, name: "実行メンバー", members: 43, lastMessage: "役割分担", isActive: false },
  ],
  スポーツ: [
    { id: 118, name: "サッカー仲間", members: 134, lastMessage: "今度一緒にやりませんか", isActive: true },
    { id: 119, name: "バスケ好き集合", members: 98, lastMessage: "コート予約しました", isActive: true },
    { id: 120, name: "テニス練習会", members: 76, lastMessage: "初心者歓迎", isActive: false },
  ],
  キャンプ企画: [
    { id: 121, name: "キャンプ企画サークル", members: 123, lastMessage: "夏キャンプの計画", isActive: true },
    { id: 122, name: "ファミリーキャンプ", members: 89, lastMessage: "子連れキャンプ情報", isActive: true },
    { id: 123, name: "ソロキャンプ", members: 67, lastMessage: "一人キャンプの魅力", isActive: false },
  ],
  ボードゲーム会: [
    { id: 124, name: "ボードゲーム愛好会", members: 98, lastMessage: "新作ゲーム紹介", isActive: true },
    { id: 125, name: "戦略ゲーム研究", members: 76, lastMessage: "カタンの戦略", isActive: true },
    { id: 126, name: "パーティーゲーム", members: 54, lastMessage: "みんなで楽しめるゲーム", isActive: false },
  ],
  マラソンや大会出場: [
    { id: 127, name: "マラソン練習会", members: 87, lastMessage: "フルマラソン挑戦", isActive: true },
    { id: 128, name: "大会情報交換", members: 65, lastMessage: "来月の大会エントリー", isActive: true },
    { id: 129, name: "ランニング初心者", members: 54, lastMessage: "走り方のコツ", isActive: false },
  ],
  イベント主催: [
    { id: 130, name: "イベント企画相談", members: 112, lastMessage: "集客方法について", isActive: true },
    { id: 131, name: "会場手配情報", members: 89, lastMessage: "おすすめ会場", isActive: true },
    { id: 132, name: "運営ノウハウ", members: 67, lastMessage: "スタッフ管理のコツ", isActive: false },
  ],
  フェス参加: [
    { id: 133, name: "音楽フェス情報", members: 156, lastMessage: "夏フェスの予定", isActive: true },
    { id: 134, name: "フェス仲間募集", members: 123, lastMessage: "一緒に行きませんか", isActive: true },
    { id: 135, name: "フェス攻略法", members: 98, lastMessage: "持ち物リスト", isActive: false },
  ],
  クラブ・DJ: [
    { id: 136, name: "DJ初心者の会", members: 78, lastMessage: "機材の選び方", isActive: true },
    { id: 137, name: "クラブイベント情報", members: 65, lastMessage: "今週末のパーティー", isActive: true },
    { id: 138, name: "音楽制作交流", members: 54, lastMessage: "トラック制作", isActive: false },
  ],
  旅行: [
    { id: 139, name: "国内旅行情報", members: 134, lastMessage: "北海道のおすすめスポット", isActive: true },
    { id: 140, name: "海外旅行相談", members: 112, lastMessage: "ヨーロッパ旅行計画", isActive: true },
    { id: 141, name: "格安旅行術", members: 89, lastMessage: "節約旅行のコツ", isActive: false },
  ],
  サーフィン: [
    { id: 142, name: "サーフィン初心者", members: 67, lastMessage: "波の読み方", isActive: true },
    { id: 143, name: "サーフポイント情報", members: 54, lastMessage: "湘南の波情報", isActive: true },
    { id: 144, name: "サーフボード相談", members: 43, lastMessage: "初心者向けボード", isActive: false },
  ],
  最新アクティビティ体験: [
    { id: 145, name: "VR体験情報", members: 89, lastMessage: "新しいVR施設", isActive: true },
    { id: 146, name: "最新技術体験", members: 67, lastMessage: "AR技術の体験", isActive: true },
    { id: 147, name: "アクティビティ情報", members: 54, lastMessage: "話題のアクティビティ", isActive: false },
  ],
  同人活動: [
    { id: 148, name: "同人誌制作", members: 98, lastMessage: "印刷所の選び方", isActive: true },
    { id: 149, name: "コミケ参加", members: 76, lastMessage: "次回の申し込み", isActive: true },
    { id: 150, name: "創作交流", members: 65, lastMessage: "作品の感想交換", isActive: false },
  ],
  SNSで作品公開: [
    { id: 151, name: "SNS活用術", members: 123, lastMessage: "フォロワー増加のコツ", isActive: true },
    { id: 152, name: "作品投稿相談", members: 89, lastMessage: "ハッシュタグの使い方", isActive: true },
    { id: 153, name: "SNS運用交流", members: 67, lastMessage: "投稿時間の最適化", isActive: false },
  ],
  YouTube制作: [
    { id: 154, name: "YouTuber交流", members: 134, lastMessage: "チャンネル登録者増加", isActive: true },
    { id: 155, name: "動画編集技術", members: 98, lastMessage: "サムネイル作成", isActive: true },
    { id: 156, name: "企画相談", members: 76, lastMessage: "面白い動画アイデア", isActive: false },
  ],
  写真展や作品展示: [
    { id: 157, name: "写真展企画", members: 67, lastMessage: "会場の手配", isActive: true },
    { id: 158, name: "作品展示相談", members: 54, lastMessage: "展示方法のアドバイス", isActive: true },
    { id: 159, name: "ギャラリー情報", members: 43, lastMessage: "新しいギャラリー", isActive: false },
  ],
  ポッドキャスト: [
    { id: 160, name: "ポッドキャスト制作", members: 78, lastMessage: "録音機材の相談", isActive: true },
    { id: 161, name: "配信プラットフォーム", members: 56, lastMessage: "Spotifyでの配信", isActive: true },
    { id: 162, name: "トーク技術", members: 43, lastMessage: "話し方のコツ", isActive: false },
  ],
  ソロ旅行: [
    { id: 163, name: "一人旅情報", members: 112, lastMessage: "女性の一人旅", isActive: true },
    { id: 164, name: "ソロ旅プラン", members: 89, lastMessage: "週末一人旅", isActive: true },
    { id: 165, name: "一人旅の魅力", members: 67, lastMessage: "自由な旅の楽しみ", isActive: false },
  ],
  サイクリング: [
    { id: 166, name: "サイクリングコース", members: 98, lastMessage: "多摩川サイクリング", isActive: true },
    { id: 167, name: "自転車メンテナンス", members: 76, lastMessage: "チェーンの手入れ", isActive: true },
    { id: 168, name: "ロードバイク情報", members: 54, lastMessage: "おすすめバイク", isActive: false },
  ],
  グルメ食べ歩き: [
    { id: 169, name: "グルメ情報交換", members: 145, lastMessage: "新宿の隠れ名店", isActive: true },
    { id: 170, name: "ラーメン巡り", members: 123, lastMessage: "今日食べたラーメン", isActive: true },
    { id: 171, name: "スイーツ巡り", members: 98, lastMessage: "話題のパンケーキ", isActive: false },
  ],
  カラオケ: [
    { id: 172, name: "カラオケ好き集合", members: 134, lastMessage: "新曲情報", isActive: true },
    { id: 173, name: "歌唱技術向上", members: 89, lastMessage: "高音の出し方", isActive: true },
    { id: 174, name: "カラオケ大会", members: 67, lastMessage: "次回大会の予定", isActive: false },
  ],
  スポーツ観戦: [
    { id: 175, name: "野球観戦仲間", members: 123, lastMessage: "今日の試合結果", isActive: true },
    { id: 176, name: "サッカー応援", members: 98, lastMessage: "Jリーグ情報", isActive: true },
    { id: 177, name: "観戦チケット情報", members: 76, lastMessage: "良席チケット入手法", isActive: false },
  ],
}

export default function HobbyRoomsPage() {
  const searchParams = useSearchParams()
  const hobby = searchParams.get("hobby") || "プラモデル・レゴ"
  const personalityType = searchParams.get("type") || ""
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newRoomName, setNewRoomName] = useState("")
  const [joinedRooms, setJoinedRooms] = useState<number[]>([])
  const [createdRooms, setCreatedRooms] = useState<any[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedJoinedRooms = localStorage.getItem("joinedRooms")
      if (savedJoinedRooms) {
        setJoinedRooms(JSON.parse(savedJoinedRooms))
      }

      const savedCreatedRooms = localStorage.getItem("createdRooms")
      if (savedCreatedRooms) {
        setCreatedRooms(JSON.parse(savedCreatedRooms))
      }
    }
  }, [])

  const rooms = mockTalkRooms[hobby as keyof typeof mockTalkRooms] || []

  const allRooms = [...rooms, ...createdRooms.filter((room) => room.hobby === hobby)]

  const handleJoinRoom = (roomId: number) => {
    const room = allRooms.find((r) => r.id === roomId)
    if (room) {
      window.location.href = `/chat?roomId=${roomId}&roomName=${encodeURIComponent(room.name)}&hobby=${encodeURIComponent(hobby)}${personalityType ? `&type=${personalityType}` : ""}`
    }
  }

  const handleCreateRoom = () => {
    if (newRoomName.trim()) {
      const newRoom = {
        id: Date.now(),
        name: newRoomName.trim(),
        members: 1,
        lastMessage: "ルームが作成されました",
        isActive: true,
        hobby: hobby,
        createdBy: "current_user",
      }

      const updatedCreatedRooms = [...createdRooms, newRoom]
      setCreatedRooms(updatedCreatedRooms)

      if (typeof window !== "undefined") {
        localStorage.setItem("createdRooms", JSON.stringify(updatedCreatedRooms))
      }

      console.log("[v0] Creating new room:", newRoomName)
      setNewRoomName("")
      setShowCreateForm(false)
    }
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
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 pb-48 sm:pb-56 md:pb-64 lg:pb-72 xl:pb-80 flex-1">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-blue-600 mb-2">
                {hobby} のトークルーム
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg">同じ趣味を持つ仲間と交流しましょう</p>
            </div>

            {/* Create Room Button */}
            <div className="mb-6 sm:mb-8 text-center">
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-medium text-sm sm:text-base md:text-lg transition-all duration-200 transform hover:scale-105"
              >
                新しいトークルームを作成
              </button>
            </div>

            {/* Create Room Form */}
            {showCreateForm && (
              <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg border-2 border-orange-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">新しいトークルーム</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                    placeholder="ルーム名を入力してください"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleCreateRoom}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-colors"
                    >
                      作成
                    </button>
                    <button
                      onClick={() => setShowCreateForm(false)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-xl font-medium transition-colors"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Talk Rooms List */}
            <div className="space-y-4 sm:space-y-6">
              {allRooms.length > 0 ? (
                allRooms.map((room) => (
                  <div key={room.id} className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-800">{room.name}</h3>
                          {room.isActive && (
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">アクティブ</span>
                          )}
                          {room.createdBy && (
                            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">作成済み</span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base mb-2">{room.lastMessage}</p>
                        <p className="text-gray-500 text-xs sm:text-sm">{room.members}人が参加中</p>
                      </div>
                      <div className="ml-4">
                        <button
                          onClick={() => handleJoinRoom(room.id)}
                          className={`px-4 py-2 rounded-xl font-medium text-sm sm:text-base transition-all duration-200 transform hover:scale-105 ${
                            joinedRooms.includes(room.id)
                              ? "bg-red-500 hover:bg-red-600 text-white"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                        >
                          {joinedRooms.includes(room.id) ? "退出" : "参加"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg mb-4">まだ「{hobby}」のトークルームがありません</p>
                  <p className="text-gray-500">新しいトークルームを作成して、最初のメンバーになりましょう！</p>
                </div>
              )}
            </div>

            {/* Back Buttons */}
            <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 max-w-2xl mx-auto mb-8 relative z-20">
              <Link href={personalityType ? `/diagnosis/results?type=${personalityType}` : "/diagnosis/results"}>
                <button className="w-full py-3 sm:py-4 md:py-5 lg:py-6 xl:py-8 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 bg-blue-600 text-white rounded-2xl sm:rounded-3xl font-medium text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl shadow-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer border-none outline-none focus:ring-4 focus:ring-blue-300">
                  診断結果に戻る
                </button>
              </Link>
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
