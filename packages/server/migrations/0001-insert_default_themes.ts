import type { QueryInterface } from 'sequelize'
import { SiteTheme } from '../models/themes'

export async function checkData(): Promise<boolean> {
  return await SiteTheme.count() === 0
}

export async function up(queryInterface: QueryInterface): Promise<void> {
  if (await checkData()) {
    await queryInterface.bulkInsert('site_theme', [
      {
        id: 1,
        theme: 'day',
        description: 'Дневная',
      },
      {
        id: 2,
        theme: 'night',
        description: 'Ночная',
      },
    ], {})
  }
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkDelete('site_theme', {
    theme: ['day', 'night'],
  }, {})
}
