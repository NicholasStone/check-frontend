import { Segmented,Button } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedMode } from "../store/modules/editor/bar"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
function Modebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { selectedMode } = useSelector(state => state.bar)
    const m = new Map()
    m.set('编辑器', 'editor')
    m.set('模拟器', 'simulator')
    m.set('验证器', 'verifier')
    console.log(selectedMode)
    useEffect(() => {
        navigate('/' + selectedMode)
    }, [])
    return (
        <div style={{ padding: '12px' }}>
            <Segmented
                options={['编辑器', '模拟器', '验证器']}
                onChange={
                    (value) => {
                        const mode = m.get(value)
                        dispatch(setSelectedMode(mode))
                        navigate('/' + mode)
                    }} />
            {selectedMode==='editor'&&
            <Button style={{float:'right'}} onClick={()=>{navigate('/lustre')}}>到Lustre建模</Button>}
        </div>
    )
}

export default Modebar