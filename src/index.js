import './scss/index.scss';
import { Excel } from '@/components/excel/Excel';
import { Header } from './components/header/Header';
import { Toolbar } from './components/Toolbar/Toolbar';
import { Formula } from './components/Formula/Formula';
import { Table } from './components/Table/Table';
import { createStore } from './core/createStore';
import { rootReducer } from './redux/rootReducer';
import { initialState } from './redux/initialState';
import { storage, debounce } from '@core/utils';

const store = createStore(rootReducer, initialState);


const stateListener = debounce(state => {
    storage('excel-state', state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel('#app', {
    components: [
        Header,
        Toolbar,
        Formula,
        Table,
    ],
    store,
});

excel.render();
