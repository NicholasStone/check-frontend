import { Segmented } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedMode } from "../store/modules/editor/bar"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
function Modebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { selectedMode } = useSelector(state => state.bar)
    const m = new Map()
    m.set('Lustre转化', 'lustre')
    m.set('编辑器', 'editor')
    m.set('验证器', 'verifier')
    m.set('模拟器', 'simulator')
    console.log(selectedMode)
    useEffect(() => {
        navigate('/' + selectedMode)
    }, [])
    return (
        <div style={{ padding: '5px', margin: 'auto', textAlign: 'center'  }}>
            <Segmented
                options={['Lustre转化', '编辑器', '验证器', '模拟器']}
                onChange={
                    (value) => {
                        const mode = m.get(value)
                        dispatch(setSelectedMode(mode))
                        navigate('/' + mode)
                    }} />
            {selectedMode==='Lustre转化'
            // &&<Button style={{float:'right'}} onClick={()=>{navigate('/lustre')}}>到Lustre建模</Button>
            }
        </div>
    )
}

export default Modebar