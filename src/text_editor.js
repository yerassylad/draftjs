import React, { Component } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "./text-editor.css";

// в darftjs имплементированы BOLD ITALIC UNDERLINE CODE стили. Создаем кастомный стиль для зачеркнутых слов
const styleMap = {
  STRIKETHROUGH: {
    textDecoration: "line-through"
  },
  FONT_SIZE: {
    fontSize: "30px"
  }
};

class TextEditor extends Component {
  // ----------------------------------------------- TODO требуется переписать состояние компонента с использованием redux
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.textAlignment = "right";
  }

  // обработка комбинации клавиш для стилей
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return "handled";
    }

    return "not-handled";
  }

  //   переключения стилей оформленения текста
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  }

  _onItalicClick() {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  }

  _onUnderlineClick() {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  }

  _onStrikethroughClick() {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "STRIKETHROUGH")
    );
  }

  _onBulletpointsClick() {
    this.onChange(
      RichUtils.toggleBlockType(this.state.editorState, "unordered-list-item")
    );
  }

  _onOrderedpointsClick() {
    this.onChange(
      RichUtils.toggleBlockType(this.state.editorState, "ordered-list-item")
    );
  }

  _hugeFontSizeClick() {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "FONT_SIZE")
    );
  }

  render() {
    return (
      <div>
        <button onClick={this._onBoldClick.bind(this)}>BOLD</button>
        <button onClick={this._onItalicClick.bind(this)}>ITALIC</button>
        <button onClick={this._onUnderlineClick.bind(this)}>UNDERLINE</button>
        <button onClick={this._onStrikethroughClick.bind(this)}>
          STRIKETHROUGH
        </button>
        <button onClick={this._onBulletpointsClick.bind(this)}>
          BULLET POINTS
        </button>
        <button onClick={this._onOrderedpointsClick.bind(this)}>
          ORDERED POINTS
        </button>
        <button onClick={this._hugeFontSizeClick.bind(this)}>Huge</button>
        <div className="editor-container">
          <Editor
            customStyleMap={styleMap}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default TextEditor;
