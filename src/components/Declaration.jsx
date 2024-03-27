import { Input, Layout } from "antd"
import { useState } from "react"
import { setAutosDeclaration, setDeclaration, setSystemDeclaration } from "../store/modules/editor/model"
import { useDispatch } from "react-redux"

function Declaration(props){
    const dispatch = useDispatch()
    const {TextArea} = Input
    // const [value,setValue] = useState(props.declaration)
    const {type,declaration} = props

    return(
        <Layout>
            <TextArea style={{
                resize:'none',
                height: 600,
                }}
                value={declaration}
                onChange={(e)=>{
                    const newValue = e.target.value
                    // setValue(newValue)
                    switch(type){
                        case "global_declaration":{
                            dispatch(setDeclaration(newValue))
                            break
                        }
                        case "system_declaration":{
                            dispatch(setSystemDeclaration(newValue))
                            break
                        }
                        case "local_declaration":{
                            dispatch(setAutosDeclaration(newValue))
                            break
                        }
                        default:break
                    }
                     console.log(declaration);
                    }}>
            </TextArea>
        </Layout>
        
        
    )
}

export default Declaration