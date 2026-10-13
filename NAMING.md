# 命名方針

- JavaScript のファイル・変数・関数・プロパティは `camelCase`、クラスは `PascalCase`。
- 固定の定数・対応表は `UPPER_SNAKE_CASE`。DOM 要素の集合は通常のオブジェクトとして `domElements` とする。
- CSS クラス・HTML の ID は `kebab-case`。状態を表すクラスは `is-open`、`is-hidden`、`is-pressed` のように `is-` を付ける。
- 真偽値を返す判定は `is` で始める。取得は `get`、設定は `set`、生成は `create`、イベント登録は `bind` で始める。
- 音の高さを表す `semitoneOffset` は A4 を 0 とする半音差。時間などは `durationMs`、`durationSeconds` のように単位を明示する。

## 役割と名前

| 名前 | 役割 |
| --- | --- |
| `Note` | 1つの音の高さ・音名・周波数 |
| `NoteCatalog` | `Note` の生成・共有と、指定範囲の音の取得 |
| `ScaleDefinition` | スケールの構成とルート・所属の判定 |
| `NoteNotation` | 音名表記の切り替えと音名の取得 |
| `NoteLabel` | 音名とオクターブを示す DOM 要素の生成 |
| `NoteDisplay` | 押されている音の一覧表示 |
| `InstrumentKey` | 画面上の演奏キー |
| `KeyboardView` / `FretboardView` | 各レイアウトのキーの生成・保持 |
| `KeyInput` | 入力元ごとのキーの押下管理 |
| `NoteInput` | 同じ音に対応するキーの押下をまとめて管理 |
| `PhysicalKeyboardInput` | 物理キーボードから演奏キーへの入力 |
| `Synth` / `Voice` | 発音全体の管理 / 1音の発音 |

入力の通知は `pressed` / `released`、発音の通知は `noteStarted` / `noteEnded` とする。
キーを離しても消音処理の間は発音が続くため、押下中の音と発音中の音は区別する。
`Synth.getAllActiveNotes()` は発音中の `Note` を返す。
