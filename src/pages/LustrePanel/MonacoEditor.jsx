import {
  Button,
  Row,
  Select,
  Space,
  Input,
  Switch,
  InputNumber,
  Modal,
  Flex,
} from "antd";
import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
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
  UnorderedListOutlined,
  OrderedListOutlined,
  MenuOutlined,
  EnterOutlined,
  EllipsisOutlined,
  BarChartOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import IconFont from "../../utils/IconFont";

const MonacoEditor = forwardRef(({ value, onChange, onExport }, ref) => {
  const editorRef = useRef(null);
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState("Consolas");
  const [theme, setTheme] = useState("vs-light");
  // const [searchVisible, setSearchVisible] = useState(false);
  // const [searchValue, setSearchValue] = useState("");
  // const [replaceValue, setReplaceValue] = useState("");
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [wordWrap, setWordWrap] = useState(false);
  const [showMinimap, setShowMinimap] = useState(true);
  const [showWhitespace, setShowWhitespace] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
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
      editorRef.current.trigger(
        "keyboard",
        "editor.action.clipboardCopyAction",
        {}
      );
  };
  const handlePaste = () => {
    if (editorRef.current)
      editorRef.current.trigger(
        "keyboard",
        "editor.action.clipboardPasteAction",
        {}
      );
  };

  const handleSearch = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      editorRef.current.getAction("actions.find").run();
    }
  };

  const handleReplace = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      editorRef.current.getAction("editor.action.startFindReplaceAction").run();
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
      editorRef.current.trigger(
        "keyboard",
        "editor.action.insertCursorBelow",
        {}
      );
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

  const handleComment = () => {
    if (editorRef.current) {
      editorRef.current.trigger("keyboard", "editor.action.commentLine", {});
    }
  };

  const handleFold = () => {
    if (editorRef.current) {
      editorRef.current.trigger("keyboard", "editor.fold", {});
    }
  };

  const handleUnfold = () => {
    if (editorRef.current) {
      editorRef.current.trigger("keyboard", "editor.unfold", {});
    }
  };

  const handleHighlight = () => {
    if (editorRef.current) {
      const selection = editorRef.current.getSelection();
      if (selection) {
        editorRef.current.deltaDecorations(
          [],
          [
            {
              range: selection,
              options: { className: "highlighted-text" },
            },
          ]
        );
      }
    }
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    setValue: (newValue) => {
      if (editorRef.current) {
        editorRef.current.setValue(newValue);
      }
    },
    getValue: () => {
      if (editorRef.current) {
        return editorRef.current.getValue();
      }
      return "";
    },
  }));

  return (
    <Flex
      vertical
      style={{ flex: 1, height: "calc(100vh - 220px)" }}
      gap="middle"
    >
      <Row style={{ margin: "0" }}>
        <Space>
          <Button
            icon={<UndoOutlined />}
            onClick={handleUndo}
            title="撤销 (Ctrl+Z)"
          />
          <Button
            icon={<RedoOutlined />}
            onClick={handleRedo}
            title="重做 (Ctrl+Y)"
          />
          <Button
            icon={<CopyOutlined />}
            onClick={handleCopy}
            title="复制 (Ctrl+C)"
          />
          <Button
            icon={<SnippetsOutlined />}
            onClick={handlePaste}
            title="粘贴 (Ctrl+V)"
          />
          <Button
            icon={<SearchOutlined />}
            onClick={handleSearch}
            title="查找 (Ctrl+F)"
          />
          <Button
            icon={<SwapOutlined />}
            onClick={handleReplace}
            title="替换 (Ctrl+H)"
          />
          <Button
            icon={<LineOutlined />}
            onClick={handleGoToLine}
            title="跳转到行 (Ctrl+G)"
          />
          <Button
            icon={<CodeOutlined />}
            onClick={handleFormat}
            title="格式化代码 (Alt+Shift+F)"
          />
          <Button
            icon={<DownOutlined />}
            onClick={handleFoldAll}
            title="折叠所有代码块"
          />
          <Button
            icon={<UpOutlined />}
            onClick={handleUnfoldAll}
            title="展开所有代码块"
          />
          <Button
            icon={<FileTextOutlined />}
            onClick={handleMultiCursor}
            title="多光标编辑 (Alt+Click)"
          />
          <Button
            icon={<BulbOutlined />}
            onClick={handleAddSnippet}
            title="插入代码片段"
          />
          <Button
            onClick={handleComment}
            title="注释/取消注释 (Ctrl+/)"
            style={{
              padding: "0 8.5px",
              width: "32px",
            }}
          >
            --
          </Button>
          {/* {isFullscreen ? (
            <Button icon={<FullscreenExitOutlined />} onClick={toggleFullscreen} title="退出全屏 (F11)" />
          ) : (
            <Button icon={<FullscreenOutlined />} onClick={toggleFullscreen} title="全屏显示 (F11)" />
          )} */}
          <Button
            type={showLineNumbers ? "primary" : "default"}
            onClick={() => setShowLineNumbers(!showLineNumbers)}
            icon={<OrderedListOutlined />}
            title={showLineNumbers ? "隐藏行号" : "显示行号"}
          />
          <Button
            type={wordWrap ? "primary" : "default"}
            onClick={() => setWordWrap(!wordWrap)}
            icon={<EnterOutlined />}
            title={wordWrap ? "关闭自动换行" : "开启自动换行"}
          />
          <Button
            icon={<ProjectOutlined />}
            style={{
              // 顺时针旋转 90 度，并镜像
              transform: "rotate(90deg)",
            }}
            type={showMinimap ? "primary" : "default"}
            onClick={() => setShowMinimap(!showMinimap)}
            title={showMinimap ? "隐藏小地图" : "显示小地图"}
          />
          <Button
            icon={<EllipsisOutlined />}
            type={showWhitespace ? "primary" : "default"}
            onClick={() => setShowWhitespace(!showWhitespace)}
            title={showWhitespace ? "隐藏空白字符" : "显示空白字符"}
          />
          <Button
            icon={<IconFont type="icon-braces" />}
            type={showBracketMatch ? "primary" : "default"}
            onClick={() => setShowBracketMatch(!showBracketMatch)}
            title={showBracketMatch ? "关闭括号匹配" : "开启括号匹配"}
          />
          <Button
            icon={<IconFont type="icon-indent-left" />}
            type={showIndentGuides ? "primary" : "default"}
            onClick={() => setShowIndentGuides(!showIndentGuides)}
            title={showIndentGuides ? "隐藏缩进参考线" : "显示缩进参考线"}
          />
          <Button
            icon={<HighlightOutlined />}
            type={showCurrentLine ? "primary" : "default"}
            onClick={() => setShowCurrentLine(!showCurrentLine)}
            title={showCurrentLine ? "关闭当前行高亮" : "开启当前行高亮"}
          />
        </Space>
      </Row>
      <Row style={{ margin: "0" }}>
        <Space>
          {/* <span>主题：</span> */}
          <Select
            value={theme}
            onChange={handleThemeChange}
            options={[
              { value: "vs-light", label: "明亮" },
              { value: "vs-dark", label: "暗黑" },
              { value: "hc-black", label: "高对比" },
            ]}
            style={{ width: 100 }}
          />

          <Select
            value={fontFamily}
            onChange={handleFontFamilyChange}
            options={[
              { value: "Consolas", label: "Consolas" },
              { value: "Courier New", label: "Courier New" },
              { value: "Fira Code", label: "Fira Code" },
              { value: "Source Code Pro", label: "Source Code Pro" },
            ]}
            style={{ width: 100 }}
          />
          <Button
            icon={<MinusOutlined />}
            onClick={decreaseFontSize}
            title="减小字号"
          />
          <span>{fontSize}px</span>
          <Button
            icon={<PlusOutlined />}
            onClick={increaseFontSize}
            title="增大字号"
          />
        </Space>
      </Row>
      <Editor
        style={{ flex: 1 }}
        height="calc(100vh - 280px)"
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
    </Flex>
  );
});

export default MonacoEditor;
