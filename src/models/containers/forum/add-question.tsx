import useErrorHandler from '@/hooks/error-handler';
import { modelActions } from '@/redux/reducers/model.reducer';
import { notifyActions } from '@/redux/reducers/notify.reducer';
import forumServices from '@/redux/services/forum.services';
import { FormikValues } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';


const initialValues = {
    topic: '',
    subTopic: '',
    question: '',
    answers: ['','','',''],
    correctAnswer: ''
}

const validationSchema = Yup.object().shape({
    topic: Yup.string().required('Topic is required'),
    subTopic: Yup.string().required('Sub-topic is required'),
    question: Yup.string().required('Question is required'),
    answers: Yup.array()
        .of(Yup.string().required('Answer is required'))
        .min(4, 'There must be exactly 4 answers')
        .max(4, 'There must be exactly 4 answers'),
    correctAnswer: Yup.string().required('Please select the correct answer')
});

export default function Addquestion() {

    const dispatch = useDispatch();

    const [
        createQuestion,
        { isLoading: isCreating, isError: isQuestionCreateError, error: questionCreateError }

    ] = forumServices.useCreateMutation();
    useErrorHandler(isQuestionCreateError, questionCreateError);

    const onSubmit = async (values: FormikValues) => {
        const result = await createQuestion(values);

        if (result?.data?.status === 200) {
            dispatch(
                notifyActions.open({
                    type: 'success',
                    message: result.data.message
                })
            );

            dispatch(modelActions.hide());
        }
    }
  
}
