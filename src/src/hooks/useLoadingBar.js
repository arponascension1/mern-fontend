// src/hooks/useLoadingBar.js
import { useEffect } from 'react';
import { useNavigation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const useLoadingBar = () => {
    const navigation = useNavigation();

    useEffect(() => {
        if (navigation.state === 'loading') {
            NProgress.start();
        } else {
            NProgress.done();
        }
    }, [navigation.state]);
};

export default useLoadingBar;
