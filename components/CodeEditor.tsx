"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
    ssr: false,
});

interface CodeEditorProps {
    language: string;
    code: string;
    onChange: (code: string) => void;
    readOnly?: boolean;
    height?: string;
}

export function CodeEditor({
    language,
    code,
    onChange,
    readOnly,
    height = "400px"
}: CodeEditorProps) {
    const [isReady, setIsReady] = useState(false);

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
            <MonacoEditor
                height={height}
                language={language === "cpp" ? "cpp" : "python"}
                value={code}
                onChange={(value) => onChange(value || "")}
                theme="vs-light"
                onMount={() => setIsReady(true)}
                options={{
                    readOnly,
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "'Fira Code', 'Courier New', monospace",
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    insertSpaces: true,
                }}
            />
        </div>
    );
}