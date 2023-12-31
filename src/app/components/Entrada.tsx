'use client'

import Image from 'next/image'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'


export function Entrada() {
    const router = useRouter()
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validationSchema = Yup.object().shape({
        nome: Yup.string()
            .required('Nome é obrigatório.'),
        email: Yup.string()
            .required('Email é obrigatório.')
            .email('Email é inválido'),
        telefone: Yup.string()
            .required('Telefone é obrigatório')
            .matches(phoneRegExp, 'Telefone é inválido')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data: any) {
        // display form data on success
        //alert('SUCESSO!! :-)\n\n' + JSON.stringify(data, null, 4));
        sendEmail(data)
        
        router.push("calculadora")
        return false

    }

    const sendEmail = (e: any) => {
        //e.preventDefault()

        console.log('Sending')
        const data = {
            'nome': e.nome,
            'email': e.email,
            'mensagem': e.mensagem
        }
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            console.log('Response received')
            if (res.status === 200) {
                reset()
            }
        })
    }
    
    return (
        <div className='d-flex justify-content-center'>
            <div className="card m-3 col-sm-6">
                <h5 className="card-header">Cadastro Obrigatório</h5>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='form-row'>
                        </div>

                        <div className="d-flex justify-content-center">
                            <div className='row mt-4'>
                                <div className="input-group input-group-sm ">
                                    <span className="input-group-text" id="inputGroup-sizing-sm">Nome</span>
                                    <input type="text" {...register('nome')} className={`form-control ${errors.nome ? 'is-invalid' : ''}`} name="nome" />
                                    <div className="invalid-feedback">{errors.nome?.message}</div>
                                </div>

                                <div className='col-md-6'>
                                    <div className="input-group input-group-sm mt-4">
                                        <span className="input-group-text" id="inputGroup-sizing-sm">e-mail</span>
                                        <input type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" />
                                        <div className="invalid-feedback">{errors.email?.message}</div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="input-group input-group-sm mt-4">
                                        <span className="input-group-text" id="inputGroup-sizing-sm">DDD/Telefone</span>
                                        <input type="text" {...register('telefone')} className={`form-control ${errors.telefone ? 'is-invalid' : ''}`} name="telefone" />
                                        <div className="invalid-feedback">{errors.telefone?.message}</div>
                                    </div>
                                </div>


                                <div>
                                    <button style={{marginTop: '15px'}} className='button buttonGray'>Acessar Calculadora</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}