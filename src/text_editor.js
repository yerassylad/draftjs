import React, { Component } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import "./text-editor.css";

// в darftjs имплементированы BOLD ITALIC UNDERLINE стили. Создаем кастомный стиль для зачеркнутых слов
const StyleMap = {
  STRIKE: {
    textDecoration: "line-through"
  }
};

// Виды линейных стилей
const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Strikethrough", style: "STRIKE" }
];

// Виды блочных стилей
const BLOCK_STYLES = [
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Indent", style: "indent" },
  { label: "aLeft", style: "a-left" },
  { label: "aCenter", style: "a-center" },
  { label: "aRight", style: "a-right" },
  { label: "aJust", style: "a-just" },
  { label: "Huge", style: "huge" },
  { label: "Normal", style: "normal" },
  { label: "Small", style: "small" }
];

// Кнопка с функцией
const ButtonWithFn = props => {
  const onPress = () => {
    props.onToggle(props.style);
  };
  return <button onMouseDown={onPress}>{props.label}</button>;
};

// Рендеринг кнопок для линейных декораций
const LineDecoratonBtns = props => {
  return (
    <div>
      {INLINE_STYLES.map(iStyle => (
        <ButtonWithFn
          key={iStyle.label}
          label={iStyle.label}
          style={iStyle.style}
          onToggle={props.onToggle}
        />
      ))}
    </div>
  );
};

// Рендеринг кнопок для блочных декораций
const BlockDecorationBtns = props => {
  return (
    <div>
      {BLOCK_STYLES.map(bStyle => (
        <ButtonWithFn
          key={bStyle.label}
          label={bStyle.label}
          style={bStyle.style}
          onToggle={props.onToggle}
        />
      ))}
    </div>
  );
};

function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  switch (type) {
    case "indent":
      return "textIndentation";
    case "a-left":
      return "textAlignLeft";
    case "a-center":
      return "textAlignCenter";
    case "a-right":
      return "textAlignRight";
    case "a-just":
      return "textAlignJustify";
    case "huge":
      return "hugeFont";
    case "normal":
      return "normalFont";
    case "small":
      return "smallFont";
    default:
      return;
  }
}

// Сам текстовый редактор
class TextEditor extends Component {
  // ----------------------------------------------- TODO требуется переписать состояние компонента с использованием redux
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.focus = () => this.refs.focus();
    this.onChange = editorState => this.setState({ editorState });
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  onUndoClick() {
    this.onChange(EditorState.undo(this.state.editorState));
  }

  onRedoClick() {
    this.onChange(EditorState.redo(this.state.editorState));
  }

  render() {
    return (
      <div>
        <LineDecoratonBtns onToggle={this.toggleInlineStyle} />
        <BlockDecorationBtns onToggle={this.toggleBlockType} />
        <button onClick={this.onUndoClick.bind(this)}>Undo</button>
        <button onClick={this.onRedoClick.bind(this)}>Redo</button>
        <div className="editor-container">
          <Editor
            customStyleMap={StyleMap}
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Введите текст"
            ref="Текстовый редактор"
            blockStyleFn={myBlockStyleFn}
          />
        </div>
        {JSON.stringify(
          convertToRaw(this.state.editorState.getCurrentContent())
        )}
      </div>
    );
  }
}

export default TextEditor;
