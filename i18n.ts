import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      boards: {
        all_boards: "All boards ({{count}})",
        create_new: "+ Create New Board",
        add_new: "Add New Board",
        edit_board: "Edit Board",
        delete_board: "Delete Board",
        new_column: "+ Add New Column",
        board_name: "Board Name",
        board_columns: "Board Columns",
        placeholder_name: "e.g. Web Design",
        placeholder_column: "e.g. Todo",
      },
      tasks: {
        create_new: "+ Create New Task",
        add_new: "Add New Task",
        task_name: "Task Name",
        description: "Description",
        subtasks: "Subtasks",
        column: "Column",
        select_column: "Select column",
        placeholder_task: "e.g. Take coffee break",
        placeholder_desc: "e.g. It's always good to take a break...",
        placeholder_subtask: "e.g. Make coffee",
      },
      ui: {
        hide_sidebar: "Hide Sidebar",
        welcome_title: "Your space for productivity and organized workflow.",
        welcome_subtitle:
          "Select a board from the sidebar or create a new one to start tracking your tasks.",
        delete_title: "Delete this {{name}}?",
        delete_description:
          "Are you sure you want to delete the '{{name}}'? This action cannot be undone.",
        slogan: {
          focus: "Focus.",
          plan: "Plan.",
          achieve: "Achieve.",
        },
        buttons: {
          save_changes: "Save Changes",
          cancel: "Cancel",
          delete: "Delete",
        },
      },
    },
  },
  uk: {
    translation: {
      boards: {
        all_boards: "Усі дошки ({{count}})",
        create_new: "+ Створити нову дошку",
        add_new: "Додати нову дошку",
        edit_board: "Редагувати дошку",
        delete_board: "Видалити дошку",
        new_column: "+ Додати нову колонку",
        board_name: "Назва дошки",
        board_columns: "Колонки дошки",
        placeholder_name: "напр., Веб-дизайн",
        placeholder_column: "напр., Треба зробити",
      },
      tasks: {
        create_new: "+ Створити нове завдання",
        add_new: "Додати нове завдання",
        task_name: "Назва завдання",
        description: "Опис",
        subtasks: "Підзавдання",
        column: "Колонка",
        select_column: "Оберіть колонку",
        placeholder_task: "напр., Зробити перерву на каву",
        placeholder_desc: "напр., Завжди корисно зробити перерву...",
        placeholder_subtask: "напр., Приготувати каву",
      },
      ui: {
        hide_sidebar: "Приховати бічну панель",
        welcome_title:
          "Ваш простір для продуктивності та організованого робочого процесу.",
        welcome_subtitle:
          "Виберіть дошку на бічній панелі або створіть нову, щоб почати відстежувати свої завдання.",
        delete_title: "Видалити {{name}}?",
        delete_description:
          "Ви впевнені, що хочете видалити '{{name}}'? Цю дію неможливо буде скасувати.",
        slogan: {
          focus: "Фокусуйся.",
          plan: "Плануй.",
          achieve: "Досягай.",
        },
        buttons: {
          save_changes: "Зберегти зміни",
          cancel: "Скасувати",
          delete: "Видалити",
        },
      },
    },
  },
  de: {
    translation: {
      boards: {
        all_boards: "Alle Boards ({{count}})",
        create_new: "+ Neues Board erstellen",
        add_new: "Neues Board hinzufügen",
        edit_board: "Board bearbeiten",
        delete_board: "Board löschen",
        new_column: "+ Neue Spalte hinzufügen",
        board_name: "Board-Name",
        board_columns: "Board-Spalten",
        placeholder_name: "z.B. Webdesign",
        placeholder_column: "z.B. Erledigen",
      },
      tasks: {
        create_new: "+ Neue Aufgabe erstellen",
        add_new: "Neue Aufgabe hinzufügen",
        task_name: "Aufgabenname",
        description: "Beschreibung",
        subtasks: "Unteraufgaben",
        column: "Spalte",
        select_column: "Spalte auswählen",
        placeholder_task: "z.B. Kaffeepause machen",
        placeholder_desc: "z.B. Es ist immer gut, eine Pause zu machen...",
        placeholder_subtask: "z.B. Kaffee kochen",
      },
      ui: {
        hide_sidebar: "Seitenleiste ausblenden",
        welcome_title:
          "Ihr Raum für Produktivität und organisierte Arbeitsabläufe.",
        welcome_subtitle:
          "Wählen Sie ein Board aus der Seitenleiste aus oder erstellen Sie ein neues, um mit der Verfolgung Ihrer Aufgaben zu beginnen.",
        delete_title: "{{name}} löschen?",
        delete_description:
          "Sind Sie sicher, dass Sie die '{{name}}' löschen möchten? Dieser Vorgang kann nicht rückgängig gemacht werden.",
        slogan: {
          focus: "Fokus.",
          plan: "Plan.",
          achieve: "Achieve.",
        },
        buttons: {
          save_changes: "Änderungen speichern",
          cancel: "Abbrechen",
          delete: "Löschen",
        },
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
