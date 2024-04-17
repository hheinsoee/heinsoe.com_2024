import { Button, Input } from "antd"

export function MasterForm({ defaultValues, url, fields, setLoading, setErr, setResult }) {
    const [formData, setFormData] = useState({})

    return (
        <form className=''>
            {/* <JSONTree data={formData}/>    */}
            <div className="mx-auto max-w-xs">
                {
                    fields.map((field, i) => {
                        return <div className='mb-4' key={i}>
                            <InputElement field={field} setValue={
                                (e) => setFormData((old) => {
                                    return { ...old, [field.name]: e }
                                })
                            } />
                        </div>
                    })
                }
                <div className="my-2">
                    <Button>
                        {formData ? 'UPDATE' : "SAVE"}
                    </Button>
                </div>
            </div>
        </form>
    )
}

export function InputElement({ setValue, value, field }) {
    const placeholder = field.label || field.name
    const required = field.required
    const { TextArea } = Input;
    switch (field.field_key) {
        case 'category_id':
            return ''

          default:
            switch (field.type) {
                case "textarea":
                    return <TextArea onChange={(e) => setValue(e.target.value)} placeholder={placeholder} autoSize required={required} />

                default:
                  return <Input onChange={(e) => setValue(e.target.value)} value={value} type={field.type} placeholder={placeholder} required={required} />
            }
    }
}