import { Layout } from "antd"
import { setAutosDeclaration, setDeclaration, setSystemDeclaration } from "../store/modules/editor/model"
import { useDispatch } from "react-redux"
import { Editor } from "@monaco-editor/react"
function Declaration(props) {
    const dispatch = useDispatch()
    // const [value,setValue] = useState(props.declaration)
    const { type, declaration } = props
    return (
        <Layout>
            <div style={{height:'600px'}}>
                <Editor 
                language="go" 
                value={declaration}
                onChange={(newValue) => {
                    console.log(newValue);
                    // setValue(newValue)
                    switch (type) {
                        case "global_declaration": {
                            dispatch(setDeclaration(newValue))
                            break
                        }
                        case "system_declaration": {
                            dispatch(setSystemDeclaration(newValue))
                            break
                        }
                        case "local_declaration": {
                            dispatch(setAutosDeclaration(newValue))
                            break
                        }
                        default: break
                    }
                    console.log(declaration);
                }}
                />
            </div>
            
        </Layout>


    )
}

export default Declaration