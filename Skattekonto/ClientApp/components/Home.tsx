import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Taxes } from './Taxes';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
		return <div>
			<Taxes/>
        </div>;
    }
}
