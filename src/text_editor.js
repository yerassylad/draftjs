import React, { Component } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
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
  { label: "OL", style: "ordered-list-item" }
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

  render() {
    return (
      <div>
        <LineDecoratonBtns onToggle={this.toggleInlineStyle} />
        <BlockDecorationBtns onToggle={this.toggleBlockType} />
        <div className="editor-container">
          <Editor
            customStyleMap={StyleMap}
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Введите текст"
            ref="Текстовый редактор"
          />
        </div>
      </div>
    );
  }
}

export default TextEditor;
