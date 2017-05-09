import { assert } from 'chai';

import batchInsertQuerier from './batchInsert';

describe('QUERY batchInsert', () => {
    it('shoul generate sql and parameter for batchInserting given entities', () => {
        const batchInsertQuery = batchInsertQuerier({ table: 'table', fields: ['fielda', 'fieldb'] });
        assert.deepEqual(batchInsertQuery([{ fielda: 1, fieldb: 2 }, { fielda: 3, fieldb: 4 }]), {
            sql: 'INSERT INTO table(fielda, fieldb) VALUES ($fielda1, $fieldb1), ($fielda2, $fieldb2) RETURNING *;',
            parameters: {
                fielda1: 1,
                fieldb1: 2,
                fielda2: 3,
                fieldb2: 4,
            },
        });
    });

    it('shoul set to null if field is missing', () => {
        const batchInsertQuery = batchInsertQuerier({ table: 'table', fields: ['fielda', 'fieldb'] });
        assert.deepEqual(batchInsertQuery([{ fielda: 1 }, { fielda: 3, fieldb: 4 }]), {
            sql: 'INSERT INTO table(fielda, fieldb) VALUES ($fielda1, $fieldb1), ($fielda2, $fieldb2) RETURNING *;',
            parameters: {
                fielda1: 1,
                fieldb1: null,
                fielda2: 3,
                fieldb2: 4,
            },
        });
    });
});