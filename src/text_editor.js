import React, { Component } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "./text-editor.css";

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
  }

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

  render() {
    return (
      <div>
        <button onClick={this._onBoldClick.bind(this)}>BOLD</button>
        <button onClick={this._onItalicClick.bind(this)}>ITALIC</button>
        <button onClick={this._onUnderlineClick.bind(this)}>UNDERLINE</button>
        <div className="editor-container">
          <Editor
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
