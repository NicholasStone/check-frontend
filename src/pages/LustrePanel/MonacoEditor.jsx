import { Button, Row, Select, Space, Input, Switch, InputNumber, Modal } from "antd";
import { useRef, useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import {
  PlusOutlined,
  MinusOutlined,
  CopyOutlined,
  UndoOutlined,
  RedoOutlined,
  SnippetsOutlined,
  SearchOutlined,
  SwapOutlined,
  CodeOutlined,
  DownOutlined,
  UpOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  LineOutlined,
  FileTextOutlined,
  BulbOutlined,
  HighlightOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
} from "@ant-design/icons";

function MonacoEditor({ value, onChange, onExport }) {
  const editorRef = useRef(null);
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState("Consolas");
  const [theme, setTheme] = useState("vs-light");
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [replaceValue, setReplaceValue] = useState("");
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [wordWrap, setWordWrap] = useState(false);
  const [showMinimap, setShowMinimap] = useState(true);
  const [showWhitespace, setShowWhitespace] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLineHighlight, setShowLineHighlight] = useState(true);
  const [showBracketMatch, setShowBracketMatch] = useState(true);
  const [showIndentGuides, setShowIndentGuides] = useState(true);
  const [showLineEndings, setShowLineEndings] = useState(false);
  const [showCurrentLine, setShowCurrentLine] = useState(true);
  const [isGoToLineModalVisible, setIsGoToLineModalVisible] = useState(false);
  const [lineNumber, setLineNumber] = useState(1);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({
        fontSize,
        fontFamily,
        lineNumbers: showLineNumbers ? "on" : "off",
        wordWrap: wordWrap ? "on" : "off",
        minimap: { enabled: showMinimap },
        renderWhitespace: showWhitespace ? "all" : "none",
        renderLineHighlight: showLineHighlight ? "all" : "none",
        matchBrackets: showBracketMatch ? "always" : "never",
        guides: {
          indentation: showIndentGuides,
          highlightActiveIndentation: showIndentGuides,
        },
        renderLineHighlight: showCurrentLine ? "all" : "none",
        renderControlCharacters: showLineEndings,
      });
    }
  }, [
    fontSize,
    fontFamily,
    showLineNumbers,
    wordWrap,
    showMinimap,
    showWhitespace,
    showLineHighlight,
    showBracketMatch,
    showIndentGuides,
    showLineEndings,
    showCurrentLine,
  ]);

  const increaseFontSize = () => setFontSize((prev) => prev + 1);
  const decreaseFontSize = () => setFontSize((prev) => Math.max(8, prev - 1));
  const handleFontFamilyChange = (value) => setFontFamily(value);
  const handleThemeChange = (value) => setTheme(value);

  const handleUndo = () => {
    if (editorRef.current) editorRef.current.trigger("keyboard", "undo", {});
  };
  const handleRedo = () => {
    if (editorRef.current) editorRef.current.trigger("keyboard", "redo", {});
  };
  const handleCopy = () => {
    if (editorRef.current)
      editorRef.current.trigger("keyboard", "editor.action.clipboardCopyAction", {});
  };
  const handlePaste = () => {
    if (editorRef.current)
      editorRef.current.trigger("keyboard", "editor.action.clipboardPasteAction", {});
  };

  const handleSearch = () => {
    if (editorRef.current) {
      editorRef.current.trigger("keyboard", "actions.find", {});
    }
  };

  const handleReplace = () => {
    if (editorRef.current) {
      editorRef.current.trigger("keyboard", "editor.action.startFindReplaceAction", {});
    }
  };

  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.trigger("keyboard", "editor.action.formatDocument", {});
    }
  };

  const handleFoldAll = () => {
    if (editorRef.current) {
      editorRef.current.trigger("keyboard", "editor.foldAll", {});
    }
  };

  const handleUnfoldAll = () => {
    if (editorRef.current) {
      editorRef.current.trigger("keyboard", "editor.unfoldAll", {});
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (editorRef.current) {
      editorRef.current.layout();
    }
  };

  const handleGoToLine = () => {
    setIsGoToLineModalVisible(true);
  };

  const handleGoToLineConfirm = () => {
    if (editorRef.current) {
      editorRef.current.revealLineInCenter(lineNumber);
      editorRef.current.setPosition({ lineNumber, column: 1 });
    }
    setIsGoToLineModalVisible(false);
  };

  const handleMultiCursor = () => {
    if (editorRef.current) {
      editorRef.current.trigger("keyboard", "editor.action.insertCursorBelow", {});
    }
  };

  const handleAddSnippet = () => {
    if (editorRef.current) {
      const snippet = `-- 自动生成的代码片段
function example() returns (bool) {
  var x: bool;
  let x = true;
  return x;
}`;
      editorRef.current.executeEdits("", [
        {
          range: editorRef.current.getSelection(),
          text: snippet,
        },
      ]);
    }
  };

  return (
    <>
      <Row style={{ margin: "0" }}>
        <Space>
          <Button icon={<UndoOutlined />} onClick={handleUndo} title="撤销 (Ctrl+Z)" />
          <Button icon={<RedoOutlined />} onClick={handleRedo} title="重做 (Ctrl+Y)" />
          <Button icon={<CopyOutlined />} onClick={handleCopy} title="复制 (Ctrl+C)" />
          <Button icon={<SnippetsOutlined />} onClick={handlePaste} title="粘贴 (Ctrl+V)" />
          <Button icon={<SearchOutlined />} onClick={handleSearch} title="查找 (Ctrl+F)" />
          <Button icon={<SwapOutlined />} onClick={handleReplace} title="替换 (Ctrl+H)" />
          <Button icon={<LineOutlined />} onClick={handleGoToLine} title="跳转到行 (Ctrl+G)" />
          <Button icon={<CodeOutlined />} onClick={handleFormat} title="格式化代码 (Alt+Shift+F)" />
          <Button icon={<DownOutlined />} onClick={handleFoldAll} title="折叠所有代码块" />
          <Button icon={<UpOutlined />} onClick={handleUnfoldAll} title="展开所有代码块" />
          <Button icon={<FileTextOutlined />} onClick={handleMultiCursor} title="多光标编辑 (Alt+Click)" />
          <Button icon={<BulbOutlined />} onClick={handleAddSnippet} title="插入代码片段" />
          {isFullscreen ? (
            <Button icon={<FullscreenExitOutlined />} onClick={toggleFullscreen} title="退出全屏 (F11)" />
          ) : (
            <Button icon={<FullscreenOutlined />} onClick={toggleFullscreen} title="全屏显示 (F11)" />
          )}
        </Space>
      </Row>
      <Row style={{ margin: "0" }}>
        <Space>
          <span>字体：</span>
          <Select
            value={fontFamily}
            onChange={handleFontFamilyChange}
            options={[
              { value: "Consolas", label: "Consolas" },
              { value: "Courier New", label: "Courier New" },
              { value: "Fira Code", label: "Fira Code" },
              { value: "Source Code Pro", label: "Source Code Pro" },
            ]}
            style={{ width: 150 }}
          />
          <Button icon={<MinusOutlined />} onClick={decreaseFontSize} title="减小字号" />
          <span>{fontSize}px</span>
          <Button icon={<PlusOutlined />} onClick={increaseFontSize} title="增大字号" />
        </Space>
      </Row>
      <Row style={{ margin: "0" }}>
        <Space>
          <span>主题：</span>
          <Select
            value={theme}
            onChange={handleThemeChange}
            options={[
              { value: "vs-light", label: "明亮" },
              { value: "vs-dark", label: "暗黑" },
              { value: "hc-black", label: "高对比" },
              { value: "monokai", label: "Monokai" },
              { value: "solarized-light", label: "Solarized Light" },
              { value: "solarized-dark", label: "Solarized Dark" },
            ]}
            style={{ width: 200 }}
          />
          <span>行号：</span>
          <Switch checked={showLineNumbers} onChange={setShowLineNumbers} />
          <span>自动换行：</span>
          <Switch checked={wordWrap} onChange={setWordWrap} />
          <span>小地图：</span>
          <Switch checked={showMinimap} onChange={setShowMinimap} />
          <span>空白字符：</span>
          <Switch checked={showWhitespace} onChange={setShowWhitespace} />
        </Space>
      </Row>
      <Row style={{ margin: "0" }}>
        <Space>
          <span>行高亮：</span>
          <Switch checked={showLineHighlight} onChange={setShowLineHighlight} />
          <span>括号匹配：</span>
          <Switch checked={showBracketMatch} onChange={setShowBracketMatch} />
          <span>缩进参考线：</span>
          <Switch checked={showIndentGuides} onChange={setShowIndentGuides} />
          <span>行尾字符：</span>
          <Switch checked={showLineEndings} onChange={setShowLineEndings} />
          <span>当前行高亮：</span>
          <Switch checked={showCurrentLine} onChange={setShowCurrentLine} />
        </Space>
      </Row>
      <Modal
        title="跳转到行"
        open={isGoToLineModalVisible}
        onOk={handleGoToLineConfirm}
        onCancel={() => setIsGoToLineModalVisible(false)}
      >
        <InputNumber
          min={1}
          value={lineNumber}
          onChange={setLineNumber}
          style={{ width: "100%" }}
        />
      </Modal>
      <Editor
        height={isFullscreen ? "100vh" : "660px"}
        language="lua"
        theme={theme}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: showMinimap },
          fontSize,
          fontFamily,
          lineNumbers: showLineNumbers ? "on" : "off",
          wordWrap: wordWrap ? "on" : "off",
          renderWhitespace: showWhitespace ? "all" : "none",
          renderLineHighlight: showLineHighlight ? "all" : "none",
          matchBrackets: showBracketMatch ? "always" : "never",
          guides: {
            indentation: showIndentGuides,
            highlightActiveIndentation: showIndentGuides,
          },
          renderLineHighlight: showCurrentLine ? "all" : "none",
          renderControlCharacters: showLineEndings,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </>
  );
}

export default MonacoEditor; 